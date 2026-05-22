const ACTIVE_WINDOW_DAYS = 30;

export type AdminProjectLike = {
  created_at?: string | null;
  updated_at?: string | null;
  completed_at?: string | null;
  status?: string | null;
  payment_status?: string | null;
  payment_verified_at?: string | null;
  price?: number | string | null;
  final_price?: number | string | null;
  calculated_price?: number | string | null;
  subtotal?: number | string | null;
  selected_services?: unknown;
  service_type?: string | null;
};

function normalizeToken(value?: string | null) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

export function normalizePaymentStatus(status?: string | null) {
  const value = normalizeToken(status);
  if (["paid", "succeeded", "successful", "success", "confirmed", "captured", "verified", "complete", "completed"].includes(value)) {
    return "paid";
  }
  if (["failed", "declined", "cancelled", "canceled", "abandoned", "error", "void"].includes(value)) {
    return "failed";
  }
  if (["processing", "pending", "pending_payment", "awaiting_payment", "incomplete", "unpaid", "requires_payment"].includes(value)) {
    return "pending";
  }
  return value || "pending";
}

export function normalizeProjectStatus(status?: string | null) {
  const value = normalizeToken(status);
  if (["completed", "complete", "ready", "delivered", "done"].includes(value)) return "completed";
  if (["in_progress", "progress", "ongoing", "in_review", "review", "assigned", "working"].includes(value)) return "in_progress";
  if (["pending", "new", "submitted", "queued", "draft"].includes(value)) return "pending";
  return value || "pending";
}

export function displayProjectStatus(status?: string | null) {
  const normalized = normalizeProjectStatus(status);
  if (normalized === "completed") return "Completed";
  if (normalized === "in_progress") return "In Progress";
  if (normalized === "pending") return "Pending";
  return status || "Pending";
}

export function displayPaymentStatus(status?: string | null) {
  const normalized = normalizePaymentStatus(status);
  if (normalized === "paid") return "Paid";
  if (normalized === "failed") return "Failed";
  if (normalized === "pending") return "Pending";
  return status || "Pending";
}

export function isPaidProject(project: AdminProjectLike) {
  return normalizePaymentStatus(project.payment_status) === "paid" || Boolean(project.payment_verified_at);
}

export function isPaymentIssue(project: AdminProjectLike) {
  const paymentStatus = normalizePaymentStatus(project.payment_status);
  return paymentStatus === "pending" || paymentStatus === "failed";
}

export function isCompletedProject(project: AdminProjectLike) {
  return normalizeProjectStatus(project.status) === "completed";
}

export function projectActivityDate(project: AdminProjectLike) {
  return project.updated_at || project.completed_at || project.created_at || null;
}

export function isWithinActiveWindow(project: AdminProjectLike) {
  const timestamp = projectActivityDate(project);
  if (!timestamp) return true;
  const value = new Date(timestamp).getTime();
  if (!Number.isFinite(value)) return true;
  return Date.now() - value <= ACTIVE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

export function isOlderActiveProject(project: AdminProjectLike) {
  return !isCompletedProject(project) && !isWithinActiveWindow(project);
}

export function isActiveProject(project: AdminProjectLike) {
  return !isCompletedProject(project) && isWithinActiveWindow(project);
}

export function projectAmount(project: AdminProjectLike) {
  const value = project.final_price ?? project.price ?? project.calculated_price ?? project.subtotal ?? 0;
  const number = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(number) ? Number(number) : 0;
}

export function projectServices(project: AdminProjectLike) {
  return Array.isArray(project.selected_services) && project.selected_services.length > 0
    ? project.selected_services.join(", ")
    : project.service_type || "Editorial Service";
}

export function sortByNewest<T extends { created_at?: string | null }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.created_at || 0).getTime();
    const bTime = new Date(b.created_at || 0).getTime();
    return bTime - aTime;
  });
}
