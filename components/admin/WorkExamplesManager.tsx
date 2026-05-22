"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Eye, FileText, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { WorkPreviewModal } from "@/components/home/WorkPreviewModal";
import { type WorkExample, type WorkExampleKey, workExamples } from "@/lib/work-example-data";

type WorkExampleRecord = {
  id: string;
  category_key: WorkExampleKey;
  category_label: string;
  source_file_name: string | null;
  parsed_content_json: WorkExample["pages"];
  parse_status: "parsed" | "failed" | "none" | string;
  status: "active" | "inactive" | "deleted" | string;
  is_active: boolean;
  parse_warning: string | null;
  parsed_block_count: number | null;
  updated_at: string | null;
};

type CategoryRow = {
  category_key: WorkExampleKey;
  category_label: string;
  document_title: string;
  accent: string;
  record: WorkExampleRecord | null;
};

type UploadMessage = {
  type: "success" | "warning" | "error" | "info";
  text: string;
};

const staticByKey = new Map(workExamples.map((example) => [example.key, example]));

export function WorkExamplesManager() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState<UploadMessage | null>(null);
  const [previewExample, setPreviewExample] = useState<WorkExample | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const hasSetupWarning = useMemo(() => message?.type === "warning" || message?.type === "error", [message]);

  const fetchExamples = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/examples?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load examples.");

      setRows(data.categories || []);
      if (data.setupRequired) {
        setMessage({ type: "warning", text: data.message || "Work examples table setup is required." });
      }
    } catch (error: any) {
      console.error("Admin examples load failed:", error);
      setMessage({ type: "error", text: error.message || "Failed to load examples." });
      setRows(workExamples.map((example) => ({
        category_key: example.key,
        category_label: example.title,
        document_title: example.documentTitle,
        accent: example.accent,
        record: null,
      })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamples();
  }, []);

  const handleUpload = async (row: CategoryRow) => {
    const file = fileInputs.current[row.category_key]?.files?.[0];
    if (!file) {
      setMessage({ type: "error", text: "Choose a DOCX file before uploading." });
      return;
    }

    setUploadingKey(row.category_key);
    setMessage({ type: "info", text: `Uploading and parsing ${row.category_label}...` });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category_key", row.category_key);

    try {
      const res = await fetch("/api/admin/examples", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed while saving the parsed document.");

      setMessage({
        type: data.warning ? "warning" : "success",
        text: data.warning ? `${data.message} ${data.warning}` : data.message,
      });
      if (fileInputs.current[row.category_key]) fileInputs.current[row.category_key]!.value = "";
      await fetchExamples();
    } catch (error: any) {
      console.error("Admin example upload failed:", error);
      setMessage({ type: "error", text: error.message || "Upload failed while saving the parsed document." });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleDelete = async (row: CategoryRow) => {
    if (!row.record) return;
    if (!confirm(`Remove the uploaded ${row.category_label} work example?`)) return;

    setUploadingKey(row.category_key);
    try {
      const res = await fetch(`/api/admin/examples?category_key=${encodeURIComponent(row.category_key)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete work example.");

      setMessage({ type: "success", text: `${row.category_label} document removed. The homepage will show the unavailable state.` });
      await fetchExamples();
    } catch (error: any) {
      console.error("Admin example delete failed:", error);
      setMessage({ type: "error", text: error.message || "Failed to delete work example." });
    } finally {
      setUploadingKey(null);
    }
  };

  const openPreview = (row: CategoryRow) => {
    const seed = staticByKey.get(row.category_key);
    if (!seed || !row.record?.parsed_content_json?.length) return;

    setPreviewExample({
      ...seed,
      documentTitle: row.record.source_file_name || seed.documentTitle,
      authorLine: `${row.category_label} uploaded sample`,
      pages: row.record.parsed_content_json,
    });
  };

  return (
    <section className="mt-8 border border-ink/10 bg-ivory/90">
      <div className="grid gap-4 border-b border-ink/10 p-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Examples manager</p>
          <h2 className="mt-2 font-display text-4xl text-ink">Homepage document samples</h2>
        </div>
        <button
          type="button"
          onClick={fetchExamples}
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink/10 px-4 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {message ? (
        <div className={`m-6 flex gap-3 border p-4 text-sm leading-6 ${
          message.type === "success"
            ? "border-status-success/30 bg-status-success-light text-status-success"
            : hasSetupWarning
              ? "border-status-danger/30 bg-status-danger-light text-status-danger"
              : "border-status-info/30 bg-status-info-light text-status-info"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      ) : null}

      {loading ? (
        <div className="p-8 text-sm text-charcoal/60">Loading work examples...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.18em] text-charcoal/48">
                <th className="p-5 font-medium">Category</th>
                <th className="p-5 font-medium">Current file</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium">Parse</th>
                <th className="p-5 font-medium">Updated</th>
                <th className="p-5 font-medium">Upload / replace</th>
                <th className="p-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {rows.map((row) => {
                const record = row.record;
                const isParsed = record?.parse_status === "parsed" && Boolean(record.parsed_content_json?.length);
                const isUploaded = Boolean(record?.source_file_name && record.is_active);
                const isBusy = uploadingKey === row.category_key;

                return (
                  <tr key={row.category_key} className="align-top text-sm text-charcoal/70">
                    <td className="p-5">
                      <p className="font-semibold text-ink">{row.category_label}</p>
                      <p className="mt-1 max-w-xs text-xs leading-5 text-charcoal/50">{row.document_title}</p>
                    </td>
                    <td className="p-5">
                      {isUploaded ? (
                        <span className="inline-flex max-w-52 items-center gap-2 truncate text-ink">
                          <FileText className="h-4 w-4 shrink-0 text-primary" />
                          <span className="truncate">{record?.source_file_name}</span>
                        </span>
                      ) : (
                        <span className="text-charcoal/45">No document uploaded.</span>
                      )}
                    </td>
                    <td className="p-5">
                      <StatusPill tone={isUploaded && isParsed ? "success" : isUploaded ? "warning" : "muted"}>
                        {isUploaded && isParsed ? "Uploaded" : isUploaded ? "Needs attention" : "No document"}
                      </StatusPill>
                    </td>
                    <td className="p-5">
                      <div className="grid gap-1">
                        <StatusPill tone={isParsed ? "success" : record?.parse_status === "failed" ? "danger" : "muted"}>
                          {isParsed ? "Parsed" : record?.parse_status === "failed" ? "Parse failed" : "None"}
                        </StatusPill>
                        {record?.parsed_block_count ? (
                          <span className="text-xs text-charcoal/45">{record.parsed_block_count} blocks saved</span>
                        ) : null}
                        {record?.parse_warning ? (
                          <span className="max-w-xs text-xs leading-5 text-status-warning">{record.parse_warning}</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="p-5">{record?.updated_at ? new Date(record.updated_at).toLocaleString() : "N/A"}</td>
                    <td className="p-5">
                      <div className="grid max-w-xs gap-3">
                        <input
                          ref={(node) => {
                            fileInputs.current[row.category_key] = node;
                          }}
                          type="file"
                          accept=".docx"
                          className="text-sm file:mr-3 file:border-0 file:bg-paper file:px-3 file:py-2 file:text-sm file:text-ink"
                        />
                        <button
                          type="button"
                          onClick={() => handleUpload(row)}
                          disabled={isBusy}
                          className="inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-4 text-sm font-medium text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-55"
                        >
                          <UploadCloud className="h-4 w-4" />
                          {isBusy ? "Working..." : isUploaded ? "Replace" : "Upload"}
                        </button>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openPreview(row)}
                          disabled={!isParsed}
                          className="inline-flex min-h-10 items-center justify-center gap-2 border border-ink/10 px-3 text-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row)}
                          disabled={!isUploaded || isBusy}
                          className="inline-flex min-h-10 items-center justify-center gap-2 border border-ink/10 px-3 text-sm text-status-danger transition hover:bg-status-danger-light disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <WorkPreviewModal example={previewExample} onClose={() => setPreviewExample(null)} />
    </section>
  );
}

function StatusPill({ tone, children }: { tone: "success" | "warning" | "danger" | "muted"; children: ReactNode }) {
  const classes = {
    success: "border-status-success/30 bg-status-success-light text-status-success",
    warning: "border-status-warning/30 bg-status-warning-light text-status-warning",
    danger: "border-status-danger/30 bg-status-danger-light text-status-danger",
    muted: "border-ink/10 bg-paper text-charcoal/52",
  };

  return (
    <span className={`inline-flex min-h-8 items-center gap-2 border px-3 text-xs uppercase tracking-[0.16em] ${classes[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "success" ? "bg-status-success" : tone === "danger" ? "bg-status-danger" : tone === "warning" ? "bg-status-warning" : "bg-charcoal/35"}`} />
      {children}
    </span>
  );
}
