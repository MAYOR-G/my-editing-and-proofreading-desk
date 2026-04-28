export const MINIMUM_ORDER = 30;
export const MAX_AUTOMATIC_WORD_COUNT = 50000;

export const DOCUMENT_TYPES = [
  "Journal Article",
  "Research Paper",
  "Thesis",
  "Dissertation Chapter",
  "Full Dissertation",
  "Research Proposal",
  "Grant Application",
  "Academic Paper",
  "Business Report",
  "Personal Statement / Admission Essay",
  "Book Manuscript",
  "Website Copy",
  "CV / Resume",
  "Cover Letter",
  "Legal / Policy Document",
  "Other",
] as const;

export const FORMATTING_STYLES = [
  "None / Standard Consistency",
  "APA",
  "MLA",
  "Chicago",
  "Harvard",
  "IEEE",
  "Vancouver",
  "OSCOLA",
  "Turabian",
  "Journal-specific formatting",
  "Other",
] as const;

export const ENGLISH_TYPES = [
  "British English",
  "American English",
  "Canadian English",
  "Australian English",
  "No preference",
] as const;

export const SERVICE_OPTIONS = [
  { label: "Proofreading", rate: 0.018, note: "Grammar, spelling, punctuation, and consistency." },
  { label: "Editing", rate: 0.03, note: "Clarity, flow, tone, and sentence-level polish." },
  { label: "Academic Editing", rate: 0.032, note: "Scholarly tone, structure, argument flow, and references." },
  { label: "Business Editing", rate: 0.03, note: "Clear, credible, client-ready business writing." },
  { label: "Formatting", rate: 0.014, note: "Style compliance, headings, spacing, references, and layout." },
  { label: "Translation", rate: 0.048, note: "Meaning-sensitive translation with editorial polish." },
  { label: "Transcribing", rate: 0.026, note: "Clean transcript preparation from supplied material." },
  { label: "Writing Support", rate: 0.055, note: "Developmental support, reframing, and draft shaping." },
] as const;

export const TURNAROUND_OPTIONS = [
  { days: 1, label: "24 hours", multiplier: 1.35, note: "Fastest automatic timeline." },
  { days: 2, label: "48 hours", multiplier: 1.22, note: "Express editorial handling." },
  { days: 3, label: "3 days", multiplier: 1.15, note: "Priority handling for short deadlines." },
  { days: 4, label: "4 days", multiplier: 1.1, note: "Expedited review." },
  { days: 5, label: "5 days", multiplier: 1.06, note: "Faster than standard." },
  { days: 6, label: "6 days", multiplier: 1.03, note: "Near-standard priority." },
  { days: 7, label: "7 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 8, label: "8 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 9, label: "9 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 10, label: "10 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 11, label: "11 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 12, label: "12 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 13, label: "13 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 14, label: "14 days", multiplier: 1, note: "Balanced pace for careful editorial work." },
  { days: 15, label: "15 days", multiplier: 0.96, note: "Flexible timeline." },
  { days: 16, label: "16 days", multiplier: 0.96, note: "Flexible timeline." },
  { days: 17, label: "17 days", multiplier: 0.96, note: "Flexible timeline." },
  { days: 18, label: "18 days", multiplier: 0.96, note: "Flexible timeline." },
  { days: 19, label: "19 days", multiplier: 0.96, note: "Flexible timeline." },
  { days: 20, label: "20 days", multiplier: 0.96, note: "Flexible timeline." },
  { days: 21, label: "21 days", multiplier: 0.94, note: "Flexible timeline." },
  { days: 22, label: "22 days", multiplier: 0.94, note: "Flexible timeline." },
  { days: 23, label: "23 days", multiplier: 0.94, note: "Flexible timeline." },
  { days: 24, label: "24 days", multiplier: 0.94, note: "Flexible timeline." },
  { days: 25, label: "25 days", multiplier: 0.94, note: "Flexible timeline." },
  { days: 26, label: "26 days", multiplier: 0.94, note: "Flexible timeline." },
  { days: 27, label: "27 days", multiplier: 0.94, note: "Flexible timeline." },
  { days: 28, label: "4 weeks / 28 days", multiplier: 0.92, note: "Best value for flexible timelines." },
] as const;

export type PriceBreakdown = {
  wordCount: number;
  serviceType: string;
  turnaroundDays: number;
  turnaroundLabel: string;
  baseRate: number;
  multiplier: number;
  calculatedPrice: number;
  finalPrice: number;
  minimumApplied: boolean;
};

export type PricingValidation = {
  allowed: boolean;
  message?: string;
  contactRequired?: boolean;
};

export function getServiceOption(serviceType: string) {
  return SERVICE_OPTIONS.find((service) => service.label === serviceType) ?? SERVICE_OPTIONS[1];
}

export function getTurnaroundOption(turnaround: string | number) {
  const days = typeof turnaround === "number" ? turnaround : parseTurnaroundDays(turnaround);
  return TURNAROUND_OPTIONS.find((option) => option.days === days) ?? TURNAROUND_OPTIONS.find((option) => option.days === 14)!;
}

export function parseTurnaroundDays(turnaround: string) {
  const lower = turnaround.toLowerCase();
  if (lower.includes("24")) return 1;
  if (lower.includes("48")) return 2;
  if (lower.includes("week")) return 28;
  const match = lower.match(/\d+/);
  return match ? Math.min(28, Math.max(1, Number(match[0]))) : 14;
}

export function validateAutomaticPricing(wordCount: number, turnaround: string | number): PricingValidation {
  const days = typeof turnaround === "number" ? turnaround : parseTurnaroundDays(turnaround);

  if (!Number.isFinite(wordCount) || wordCount <= 0) {
    return { allowed: false, message: "Please upload a readable document before checkout." };
  }

  if (wordCount > MAX_AUTOMATIC_WORD_COUNT) {
    return {
      allowed: false,
      contactRequired: true,
      message: "Documents above 50,000 words require a custom quote. Please contact our editors.",
    };
  }

  if (days < 1 || days > 28) {
    return {
      allowed: false,
      contactRequired: true,
      message: "Please contact our editors for a custom timeline.",
    };
  }

  if (days === 1 && wordCount > 6000) {
    return {
      allowed: false,
      contactRequired: true,
      message: "24-hour turnaround is available for documents up to 6,000 words. Please choose a longer turnaround or contact our editors.",
    };
  }

  if (days === 2 && wordCount > 10000) {
    return {
      allowed: false,
      contactRequired: true,
      message: "48-hour turnaround is available for documents up to 10,000 words. Please choose a longer turnaround or contact our editors.",
    };
  }

  const maxByDay: Record<number, number> = {
    3: 18000,
    4: 24000,
    5: 30000,
    6: 40000,
  };

  const limit = maxByDay[days];
  if (limit && wordCount > limit) {
    return {
      allowed: false,
      contactRequired: true,
      message: "This document requires a custom editorial timeline. Please contact our editors for a tailored quote.",
    };
  }

  return { allowed: true };
}

export function calculatePrice(wordCount: number, serviceType: string, turnaround: string | number): PriceBreakdown {
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  const service = getServiceOption(serviceType);
  const turnaroundOption = getTurnaroundOption(turnaround);
  const calculatedPrice = Number((safeWordCount * service.rate * turnaroundOption.multiplier).toFixed(2));
  const finalPrice = Math.max(MINIMUM_ORDER, calculatedPrice);

  return {
    wordCount: safeWordCount,
    serviceType: service.label,
    turnaroundDays: turnaroundOption.days,
    turnaroundLabel: turnaroundOption.label,
    baseRate: service.rate,
    multiplier: turnaroundOption.multiplier,
    calculatedPrice,
    finalPrice: Number(finalPrice.toFixed(2)),
    minimumApplied: calculatedPrice < MINIMUM_ORDER,
  };
}

export function calculateServerPrice(wordCount: number, serviceType: string, turnaround: string | number): number {
  return calculatePrice(wordCount, serviceType, turnaround).finalPrice;
}
