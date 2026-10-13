"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/DashboardShell";
import { PendingSubmitButton } from "@/components/PendingSubmitButton";

export type MessageItem = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  source?: string | null;
  status: string;
  user_id?: string | null;
  project_id?: string | null;
  admin_reply?: string | null;
  replied_at?: string | null;
  created_at: string;
  updated_at?: string | null;
  latest_message?: string | null;
  latest_message_at?: string | null;
  last_sender?: string | null;
  unread_count?: number | null;
  thread_count?: number;
  attachment_file_path?: string | null;
  attachment_file_name?: string | null;
  attachment_content_type?: string | null;
  attachment_file_size?: number | null;
};

export type ConversationEvent = {
  id: string;
  messageId: string;
  senderType: "user" | "admin";
  senderName: string;
  senderEmail: string;
  content: string;
  createdAt: string;
  attachmentFilePath?: string | null;
  attachmentFileName?: string | null;
  attachmentContentType?: string | null;
  attachmentFileSize?: number | null;
};

type AdminMessagesManagerProps = {
  messages: MessageItem[];
  selectedId?: string;
  conversationEvents: ConversationEvent[];
  replyStatus?: string;
  supportEmail: string;
  updateStatusAction: (formData: FormData) => Promise<void>;
  replyAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  toggleReadAction: (formData: FormData) => Promise<void>;
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 172800) return "Yesterday";
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatFileSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "Not recorded";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function RenderPlainTextWithLinks({ text }: { text: string }) {
  // Regex to detect URLs safely
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  const parts = text.split(urlRegex);

  return (
    <span className="whitespace-pre-wrap [overflow-wrap:anywhere]">
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary-active"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </span>
  );
}

export function AdminMessagesManager({
  messages,
  selectedId,
  conversationEvents,
  replyStatus,
  supportEmail,
  updateStatusAction,
  replyAction,
  deleteAction,
  toggleReadAction,
}: AdminMessagesManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread">("all");
  const [activeMessageId, setActiveMessageId] = useState<string>(selectedId || messages[0]?.id || "");
  const [mobileSheetOpen, setMobileSheetOpen] = useState(Boolean(selectedId));
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const deleteModalRef = useRef<HTMLDivElement>(null);
  const deleteTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileBackButtonRef = useRef<HTMLButtonElement>(null);

  // Filter messages based on search query and unread status
  const filteredMessages = useMemo(() => {
    let result = messages;
    if (filterType === "unread") {
      result = result.filter((m) => Number(m.unread_count || 0) > 0 || m.status === "New");
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.email?.toLowerCase().includes(q) ||
          m.subject?.toLowerCase().includes(q) ||
          m.message?.toLowerCase().includes(q) ||
          m.latest_message?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [messages, searchQuery, filterType]);

  const activeMessage = useMemo(() => {
    return messages.find((m) => m.id === activeMessageId) || filteredMessages[0] || null;
  }, [messages, filteredMessages, activeMessageId]);

  // Lock scroll when mobile sheet or delete modal is open
  useEffect(() => {
    if (mobileSheetOpen || deleteModalOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [mobileSheetOpen, deleteModalOpen]);

  // Escape key handler for delete modal and mobile sheet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (deleteModalOpen) {
          setDeleteModalOpen(false);
          deleteTriggerRef.current?.focus();
        } else if (mobileSheetOpen) {
          setMobileSheetOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteModalOpen, mobileSheetOpen]);

  const handleSelectMessage = (id: string) => {
    setActiveMessageId(id);
    setMobileSheetOpen(true);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const isUnread = (msg: MessageItem) => Number(msg.unread_count || 0) > 0 || msg.status === "New";

  return (
    <div className="mt-8">
      {/* Search and Filters Header (R15 & R16) */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <label htmlFor="admin-message-search" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
            Search messages
          </label>
          <div className="relative">
            <input
              id="admin-message-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sender, email, content..."
              className="h-11 w-full rounded-lg border border-hairline bg-paper px-3.5 pl-10 text-sm text-ink transition-colors duration-200 placeholder:text-charcoal/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-end">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70 mr-1">Filter:</label>
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`h-11 rounded-lg px-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
              filterType === "all" ? "bg-primary text-white" : "border border-hairline bg-paper text-charcoal/70 hover:bg-paper/80"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType("unread")}
            className={`h-11 rounded-lg px-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
              filterType === "unread" ? "bg-primary text-white" : "border border-hairline bg-paper text-charcoal/70 hover:bg-paper/80"
            }`}
          >
            Unread ({messages.filter(isUnread).length})
          </button>
        </div>
      </div>

      {/* Main Two-Pane Layout on Desktop, Full-Width List on Mobile (R15) */}
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        {/* Left Pane: Messages List */}
        <div className="overflow-hidden rounded-xl border border-hairline bg-ivory/95 shadow-sm">
          <div className="border-b border-hairline bg-surface-soft/60 px-5 py-3.5 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Inbox</span>
            <span className="text-xs text-charcoal/50">Showing {filteredMessages.length} message{filteredMessages.length === 1 ? "" : "s"}</span>
          </div>

          <div className="divide-y divide-hairline max-h-[calc(100vh-14rem)] overflow-y-auto overscroll-contain">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => {
                const isSelected = activeMessage?.id === msg.id;
                const unread = isUnread(msg);

                return (
                  <button
                    key={msg.id}
                    type="button"
                    onClick={() => handleSelectMessage(msg.id)}
                    className={`w-full text-left p-4 sm:p-5 transition-[background-color,border-color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary ${
                      isSelected
                        ? "bg-primary/[0.07] shadow-[inset_4px_0_0_#174a7c]"
                        : "hover:bg-paper/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {unread ? (
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" title="Unread" />
                        ) : null}
                        <span className={`truncate text-sm ${unread ? "font-bold text-ink" : "font-medium text-ink/80"}`}>
                          {msg.name}
                        </span>
                      </div>
                      <span className="shrink-0 text-xs text-charcoal/50">
                        {formatRelativeTime(msg.latest_message_at || msg.created_at)}
                      </span>
                    </div>

                    <p className={`mt-1.5 truncate text-xs sm:text-sm ${unread ? "font-semibold text-ink" : "text-charcoal/70"}`}>
                      {msg.subject || "(No subject)"}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-charcoal/60">
                      {msg.latest_message || msg.message}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-[11px] text-charcoal/45">
                      <span>{msg.source || "Contact Form"}</span>
                      {Number(msg.thread_count || 0) > 1 ? <span>· {msg.thread_count} msgs</span> : null}
                      {msg.attachment_file_path ? <span>· 📎 Attachment</span> : null}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-12 text-center text-sm text-charcoal/50">
                {searchQuery ? "No messages match your search." : "No messages in this folder."}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Desktop): Message Detail */}
        <aside className="hidden lg:block">
          {activeMessage ? (
            <MessageDetailCard
              message={activeMessage}
              conversationEvents={conversationEvents}
              replyStatus={replyStatus}
              supportEmail={supportEmail}
              updateStatusAction={updateStatusAction}
              replyAction={replyAction}
              toggleReadAction={toggleReadAction}
              onDeleteClick={() => setDeleteModalOpen(true)}
              deleteTriggerRef={deleteTriggerRef}
              onCopyEmail={handleCopyEmail}
              copiedEmail={copiedEmail}
            />
          ) : (
            <div className="rounded-xl border border-hairline bg-ivory/90 p-12 text-center text-sm text-charcoal/50">
              Select a message to view details.
            </div>
          )}
        </aside>
      </div>

      {/* Mobile: Full-Screen Message Detail Sheet (R15) */}
      {mobileSheetOpen && activeMessage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Message from ${activeMessage.name}`}
          className="fixed inset-0 z-50 flex flex-col bg-canvas lg:hidden"
        >
          {/* Mobile Sheet Top Bar with Back Button */}
          <div className="flex h-14 items-center justify-between border-b border-hairline bg-surface-soft px-4">
            <button
              ref={mobileBackButtonRef}
              type="button"
              onClick={() => setMobileSheetOpen(false)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to inbox
            </button>
            <StatusBadge>{activeMessage.status || "Open"}</StatusBadge>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <MessageDetailCard
              message={activeMessage}
              conversationEvents={conversationEvents}
              replyStatus={replyStatus}
              supportEmail={supportEmail}
              updateStatusAction={updateStatusAction}
              replyAction={replyAction}
              toggleReadAction={toggleReadAction}
              onDeleteClick={() => setDeleteModalOpen(true)}
              deleteTriggerRef={deleteTriggerRef}
              onCopyEmail={handleCopyEmail}
              copiedEmail={copiedEmail}
            />
          </div>
        </div>
      ) : null}

      {/* Delete Confirmation Dialog (R15) */}
      {deleteModalOpen && activeMessage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setDeleteModalOpen(false)}
          />

          {/* Modal Card */}
          <div
            ref={deleteModalRef}
            className="relative z-10 w-full max-w-md rounded-2xl border border-hairline bg-canvas p-6 shadow-2xl"
          >
            <h3 id="delete-dialog-title" className="font-display text-2xl font-bold text-ink">
              Delete message?
            </h3>
            <p className="mt-3 text-sm leading-6 text-charcoal/70">
              Are you sure you want to permanently delete this message and its reply history from{" "}
              <strong>{activeMessage.name}</strong> ({activeMessage.email})? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="h-11 rounded-lg border border-hairline px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Cancel
              </button>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={activeMessage.id} />
                <button
                  type="submit"
                  className="h-11 rounded-lg bg-status-danger px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
                >
                  Delete Message
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MessageDetailCard({
  message,
  conversationEvents,
  replyStatus,
  supportEmail,
  updateStatusAction,
  replyAction,
  toggleReadAction,
  onDeleteClick,
  deleteTriggerRef,
  onCopyEmail,
  copiedEmail,
}: {
  message: MessageItem;
  conversationEvents: ConversationEvent[];
  replyStatus?: string;
  supportEmail: string;
  updateStatusAction: (formData: FormData) => Promise<void>;
  replyAction: (formData: FormData) => Promise<void>;
  toggleReadAction: (formData: FormData) => Promise<void>;
  onDeleteClick: () => void;
  deleteTriggerRef: React.RefObject<HTMLButtonElement>;
  onCopyEmail: (email: string) => void;
  copiedEmail: boolean;
}) {
  const isUnread = Number(message.unread_count || 0) > 0 || message.status === "New";

  return (
    <div className="rounded-xl border border-hairline bg-ivory/95 p-6 shadow-sm">
      {/* Header Info (R15) */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Message Details</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl text-ink break-words">{message.subject}</h2>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge>{message.status || "Open"}</StatusBadge>
        </div>
      </div>

      {/* Reply status alerts */}
      {replyStatus === "sent" ? (
        <div className="mt-4 rounded-lg border border-cta/20 bg-cta-soft p-3.5 text-sm leading-6 text-ink">
          Reply sent and recorded in conversation thread.
        </div>
      ) : null}

      {replyStatus === "failed" || replyStatus === "missing" || replyStatus === "attachment" ? (
        <div className="mt-4 rounded-lg border border-status-danger/25 bg-status-danger-light p-3.5 text-sm leading-6 text-status-danger">
          {replyStatus === "missing"
            ? "Write a reply before sending."
            : replyStatus === "attachment"
              ? "Attachment file invalid. Use DOC, DOCX, PDF, TXT, RTF, or ZIP under 25MB."
              : "Failed to send reply. Please try again."}
        </div>
      ) : null}

      {/* Sender metadata & action buttons (R15) */}
      <div className="mt-5 rounded-lg border border-hairline/80 bg-paper/60 p-4">
        <dl className="grid gap-2.5 text-sm">
          <div className="flex flex-wrap justify-between gap-2 border-b border-hairline/60 pb-2">
            <dt className="text-charcoal/60">Sender Name:</dt>
            <dd className="font-semibold text-ink">{message.name}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-b border-hairline/60 pb-2 items-center">
            <dt className="text-charcoal/60">Email:</dt>
            <dd className="flex items-center gap-2">
              <span className="font-medium text-ink break-all">{message.email}</span>
              <button
                type="button"
                onClick={() => onCopyEmail(message.email)}
                className="rounded px-2 py-0.5 text-xs font-medium border border-hairline bg-surface-soft hover:bg-canvas transition"
                title="Copy email address"
              >
                {copiedEmail ? "Copied!" : "Copy"}
              </button>
            </dd>
          </div>
          {message.phone ? (
            <div className="flex flex-wrap justify-between gap-2 border-b border-hairline/60 pb-2">
              <dt className="text-charcoal/60">Phone:</dt>
              <dd className="font-medium text-ink">{message.phone}</dd>
            </div>
          ) : null}
          <div className="flex flex-wrap justify-between gap-2 border-b border-hairline/60 pb-2">
            <dt className="text-charcoal/60">Date & Time:</dt>
            <dd className="text-ink">{new Date(message.created_at).toLocaleString()}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-charcoal/60">Source page:</dt>
            <dd className="text-ink font-mono text-xs">{message.source || "Contact Form"}</dd>
          </div>
        </dl>

        {/* Quick action toolbar (R15) */}
        <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-hairline/60">
          <a
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || "Your inquiry")}`}
            className="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-xs font-semibold text-white transition hover:bg-primary-active"
          >
            Reply via Email
          </a>
          <form action={toggleReadAction} className="inline">
            <input type="hidden" name="id" value={message.id} />
            <input type="hidden" name="unread" value={isUnread ? "false" : "true"} />
            <button
              type="submit"
              className="h-9 rounded-lg border border-hairline bg-canvas px-3 text-xs font-semibold text-ink transition hover:bg-surface-soft"
            >
              {isUnread ? "Mark as Read" : "Mark as Unread"}
            </button>
          </form>
          <button
            ref={deleteTriggerRef}
            type="button"
            onClick={onDeleteClick}
            className="h-9 rounded-lg border border-status-danger/30 bg-canvas px-3 text-xs font-semibold text-status-danger transition hover:bg-status-danger-light"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Conversation Thread & Message Body (R15: max-w-[65ch], leading-[1.6], overflow-wrap: anywhere, plain text) */}
      <div className="mt-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Conversation History</h3>
        <div className="mt-4 grid gap-4">
          {conversationEvents.length > 0 ? (
            conversationEvents.map((event) => {
              const isAdmin = event.senderType === "admin";
              return (
                <div
                  key={event.id}
                  className={`rounded-xl border p-4 sm:p-5 ${
                    isAdmin ? "border-cta/25 bg-cta-soft/50" : "border-hairline bg-canvas"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline/60 pb-2.5">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isAdmin ? "text-cta" : "text-primary"}`}>
                      {isAdmin ? "Admin Reply" : "User Message"}
                    </span>
                    <span className="text-xs text-charcoal/50">{new Date(event.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="mt-3 max-w-[65ch] text-sm leading-[1.6] text-ink [overflow-wrap:anywhere]">
                    <RenderPlainTextWithLinks text={event.content} />
                  </div>
                  {event.attachmentFilePath ? (
                    <div className="mt-3 border-t border-hairline/60 pt-2 text-xs text-charcoal/60">
                      <span>Attachment: </span>
                      <span className="font-semibold text-ink">{event.attachmentFileName || "File"}</span>
                      {event.attachmentFileSize ? <span> ({formatFileSize(event.attachmentFileSize)})</span> : null}
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-hairline bg-canvas p-5">
              <div className="max-w-[65ch] text-sm leading-[1.6] text-ink [overflow-wrap:anywhere]">
                <RenderPlainTextWithLinks text={message.message} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Update Form with R16 Field Styles */}
      <form action={updateStatusAction} className="mt-6 rounded-lg border border-hairline bg-paper/50 p-4">
        <input type="hidden" name="id" value={message.id} />
        <label htmlFor="status-select" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
          Update Message Status
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <select
            id="status-select"
            name="status"
            defaultValue={message.status || "Open"}
            className="h-11 rounded-lg border border-hairline bg-canvas px-3.5 text-sm text-ink transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Replied">Replied</option>
            <option value="Closed">Closed</option>
          </select>
          <PendingSubmitButton
            idleLabel="Save status"
            pendingLabel="Saving..."
            className="h-11 rounded-lg border border-primary/30 bg-canvas px-4 text-xs font-semibold uppercase tracking-wider text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          />
        </div>
      </form>

      {/* In-app Reply Form with R16 Field Styles */}
      <form action={replyAction} className="mt-6 rounded-lg border border-hairline bg-paper/50 p-4 sm:p-5">
        <input type="hidden" name="id" value={message.id} />
        <label htmlFor="reply-textarea" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
          Send Reply from {supportEmail}
        </label>
        <p className="text-xs text-charcoal/50 mb-2">
          Your reply will be delivered via email and recorded in this thread.
        </p>
        <textarea
          id="reply-textarea"
          name="reply"
          required
          rows={5}
          placeholder="Write a clear, professional reply..."
          className="w-full rounded-lg border border-hairline bg-canvas p-3.5 text-sm leading-[1.6] text-ink transition-colors duration-200 placeholder:text-charcoal/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <div className="mt-3">
          <label htmlFor="reply-attachment" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1">
            Attach document (optional)
          </label>
          <input
            id="reply-attachment"
            name="attachment"
            type="file"
            accept=".doc,.docx,.pdf,.txt,.rtf,.zip"
            className="h-11 w-full rounded-lg border border-hairline bg-canvas px-3 py-1.5 text-xs text-ink file:mr-3 file:h-8 file:rounded-md file:border-0 file:bg-primary file:px-3 file:text-xs file:font-semibold file:text-white hover:file:bg-primary-active focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <span className="text-[11px] text-charcoal/40 mt-1 block">Supported formats: DOC, DOCX, PDF, TXT, RTF, ZIP (max 25MB)</span>
        </div>

        <div className="mt-4 flex justify-end">
          <PendingSubmitButton
            idleLabel="Send Reply Email"
            pendingLabel="Sending..."
            className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          />
        </div>
      </form>
    </div>
  );
}
