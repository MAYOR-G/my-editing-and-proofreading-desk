"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type AdminProjectDeliveryFormProps = {
  projectId: string;
  clientId?: string | null;
  deliveryStatus?: string;
  deliveryFilePath?: string | null;
  deliveryFileName?: string | null;
  deliverySentAt?: string | null;
  sendCompletedFileAction: (formData: FormData) => Promise<void>;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminProjectDeliveryForm({
  projectId,
  clientId,
  deliveryStatus,
  deliveryFilePath,
  deliveryFileName,
  deliverySentAt,
  sendCompletedFileAction,
}: AdminProjectDeliveryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState("");
  const [clientError, setClientError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const rawFormData = new FormData(form);
    const note = String(rawFormData.get("note") || "").trim();
    const fileEntry = rawFormData.get("completedFile");
    const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

    if (!file) {
      setClientError("Choose a completed file before sending.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setClientError("Completed files must be 50MB or smaller.");
      return;
    }

    setClientError("");
    setSubmitting(true);

    try {
      setProgress(`Uploading ${file.name} (${formatFileSize(file.size)})...`);
      const uploadUrlRes = await fetch("/api/admin/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: "delivery",
          targetId: projectId,
          clientId: clientId || "client",
          name: file.name,
          size: file.size,
        }),
      });

      const uploadUrlData = await uploadUrlRes.json();
      if (!uploadUrlRes.ok || !uploadUrlData.path || !uploadUrlData.token) {
        throw new Error(uploadUrlData.error || "Could not prepare secure file delivery upload.");
      }

      const supabase = createClient();
      const { error: storageError } = await supabase.storage
        .from(uploadUrlData.bucket || "deliveries")
        .uploadToSignedUrl(uploadUrlData.path, uploadUrlData.token, file, {
          contentType: file.type || "application/octet-stream",
        });

      if (storageError) {
        throw new Error("Completed file upload to storage failed. Please try again.");
      }

      const cleanFormData = new FormData();
      cleanFormData.set("id", projectId);
      cleanFormData.set("note", note);
      cleanFormData.set("uploadedDeliveryPath", uploadUrlData.path);
      cleanFormData.set("uploadedDeliveryName", uploadUrlData.name || file.name);
      cleanFormData.set("uploadedDeliveryType", file.type || "application/octet-stream");
      cleanFormData.set("uploadedDeliverySize", String(file.size));

      setProgress("Sending delivery email...");
      await sendCompletedFileAction(cleanFormData);
      form.reset();
      setProgress("");
      setSubmitting(false);
    } catch (err: any) {
      if (err && typeof err === "object" && "digest" in err && String(err.digest).startsWith("NEXT_REDIRECT")) {
        throw err;
      }
      setClientError(err instanceof Error ? err.message : "We could not send that file. Nothing was marked as delivered.");
      setProgress("");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} action={sendCompletedFileAction} className="border border-ink/10 bg-ivory/90 p-7 rounded-xl">
      <input type="hidden" name="id" value={projectId} />
      <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Final file delivery</p>
      <h3 className="mt-4 font-display text-3xl leading-tight text-ink">Send completed work</h3>

      {deliveryStatus === "sent" ? (
        <div className="mt-5 rounded-lg border border-cta/20 bg-cta-soft p-4 text-sm leading-6 text-ink">
          Completed file sent to the client and saved to this project.
        </div>
      ) : null}

      {deliveryStatus === "failed" || deliveryStatus === "missing" || deliveryStatus === "attachment" ? (
        <div className="mt-5 rounded-lg border border-status-danger/25 bg-status-danger-light p-4 text-sm leading-6 text-status-danger">
          {deliveryStatus === "missing"
            ? "Choose a completed file before sending."
            : deliveryStatus === "attachment"
              ? "Choose a supported file under 50MB."
              : "We could not send that file. Nothing was marked as delivered."}
        </div>
      ) : null}

      {clientError ? (
        <div className="mt-5 rounded-lg border border-status-danger/25 bg-status-danger-light p-4 text-sm leading-6 text-status-danger">
          {clientError}
        </div>
      ) : null}

      {progress ? (
        <div className="mt-5 rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm font-medium leading-6 text-primary">
          {progress}
        </div>
      ) : null}

      {deliveryFilePath ? (
        <div className="mt-5 rounded-lg border border-hairline bg-paper p-4 text-sm leading-6 text-charcoal/70">
          <p className="font-semibold text-ink">Last delivery</p>
          <p className="mt-1 break-all">{deliveryFileName || deliveryFilePath.split("/").pop()}</p>
          {deliverySentAt ? <p className="mt-1 text-xs text-charcoal/50">{new Date(deliverySentAt).toLocaleString()}</p> : null}
          <Link href={`/api/admin/projects/${projectId}/download?file=delivery&action=download`} className="mt-3 inline-flex text-primary hover:underline">
            Download delivered file
          </Link>
        </div>
      ) : null}

      <div className="mt-5 grid gap-1.5">
        <label htmlFor="completed-file" className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
          Completed file (up to 50MB)
        </label>
        <input
          id="completed-file"
          name="completedFile"
          type="file"
          required
          disabled={submitting}
          accept=".doc,.docx,.pdf,.txt,.rtf,.odt,.csv,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg,.webp"
          className="h-11 rounded-lg border border-hairline bg-paper px-3 py-1.5 text-xs text-ink file:mr-3 file:h-8 file:rounded-md file:border-0 file:bg-primary file:px-3 file:text-xs file:font-semibold file:text-white transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
      </div>
      <div className="mt-4 grid gap-1.5">
        <label htmlFor="delivery-note" className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
          Message note
        </label>
        <textarea
          id="delivery-note"
          name="note"
          rows={4}
          disabled={submitting}
          className="rounded-lg border border-hairline bg-paper p-3 text-sm leading-6 text-ink transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          placeholder="Optional note to include in the delivery email..."
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
        ) : null}
        {submitting ? (progress || "Sending...") : "Send completed file"}
      </button>
    </form>
  );
}

