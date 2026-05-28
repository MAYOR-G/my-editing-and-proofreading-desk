export const MINIMUM_ORDER = 10;
export const CUSTOM_REVIEW_WORD_COUNT = 50000;
export const MAX_AUTOMATIC_WORD_COUNT = CUSTOM_REVIEW_WORD_COUNT;
export const SERVICE_CHARGE_PERCENTAGE = 5;
export const WRITING_SUPPORT_FIXED_PRICE = 450;
const STANDARD_EDITORIAL_RATE = 0.03;

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
  "APA",
  "MLA",
  "Chicago",
  "Harvard",
  "IEEE",
  "Vancouver",
  "Turabian",
  "OSCOLA",
  "AMA",
  "Bluebook",
  "Business report format",
  "Thesis/dissertation format",
  "Journal submission format",
  "Non-standard consistency",
  "Custom formatting",
  "Other",
] as const;

export const TRANSLATION_OPTIONS = [
  "Keep original text",
  "Translate to English",
  "Translate to French",
  "Translate to German",
  "Translate to Spanish",
  "Translate to Chinese",
  "Translate to Arabic",
  "Translate to Portuguese",
  "Translate to Italian",
  "Translate to Japanese",
  "Translate to Korean",
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
  { label: "Proofreading", rate: 0.03, note: "Grammar, spelling, punctuation, and consistency." },
  { label: "Editing", rate: 0.03, note: "Clarity, flow, tone, and sentence-level polish." },
  { label: "Academic Editing", rate: 0.03, note: "Scholarly tone, structure, argument flow, and references." },
  { label: "Business Editing", rate: 0.03, note: "Clear, credible, client-ready business writing." },
  { label: "Formatting", rate: 0.04, note: "Style compliance, headings, spacing, references, and layout." },
  { label: "Translation", rate: 0.055, note: "Meaning-sensitive translation with editorial polish." },
  { label: "Transcribing", rate: 0.026, note: "Clean transcript preparation from supplied material." },
  { label: "Writing Support", rate: 0, fixedPrice: WRITING_SUPPORT_FIXED_PRICE, note: "Fixed service package for developmental support, reframing, and draft shaping." },
] as const;

export const TURNAROUND_OPTIONS = [
  { days: 0.5, label: "12 hours", shortLabel: "12h", maxWords: 2000, multiplier: 1, note: "Same-day handling for short documents." },
  { days: 1, label: "24 hours", shortLabel: "24h", maxWords: 7000, multiplier: 1, note: "Express handling for eligible documents." },
  { days: 2, label: "48 hours", shortLabel: "48h", maxWords: 10000, multiplier: 1, note: "Express editorial handling for eligible documents." },
  { days: 3, label: "3 days", shortLabel: "3 days", maxWords: 19999, multiplier: 1, note: "Priority handling for eligible documents." },
  { days: 5, label: "5 days", shortLabel: "5 days", maxWords: 30000, multiplier: 1, note: "Balanced priority for larger documents." },
  { days: 7, label: "7 days", shortLabel: "7 days", maxWords: 35000, multiplier: 1, note: "Standard editorial pace." },
  { days: 14, label: "14 days", shortLabel: "14 days", maxWords: 40000, multiplier: 1, note: "Careful review for longer documents." },
  { days: 28, label: "28 days / 4 weeks", shortLabel: "4 weeks", maxWords: 50000, multiplier: 1, note: "Extended automatic calculator timeline." },
] as const;

const TURNAROUND_RATE_SEQUENCES = {
  full: [0.038, 0.034, 0.029, 0.027, 0.025, 0.024, 0.023, 0.022],
  expressStart: [0.034, 0.029, 0.027, 0.025, 0.024, 0.023, 0.022],
  shifted: [0.034, 0.029, 0.027, 0.025, 0.024, 0.023],
} as const;

export type PriceBreakdown = {
  wordCount: number;
  serviceTypes: string[];
  serviceType: string;
  turnaroundDays: number;
  turnaroundLabel: string;
  baseRate: number;
  multiplier: number;
  rushSurcharge: number;
  calculatedPrice: number;
  subtotal: number;
  serviceChargePercentage: number;
  serviceChargeAmount: number;
  finalTotal: number;
  finalPrice: number;
  minimumApplied: boolean;
};

export type PricingValidation = {
  allowed: boolean;
  message?: string;
  contactRequired?: boolean;
  customReviewRequired?: boolean;
};

export const CUSTOM_REVIEW_MESSAGE = "Your document is above 50,000 words. Please contact support so we can confirm the best timeline and final quote.";
export const TURNAROUND_SUPPORT_MESSAGE = "Choose a longer timeline for larger word counts. Unavailable options are disabled automatically.";

export function isWritingSupportService(serviceTypes: string[] | string | null | undefined) {
  return normalizeSelectedServices(serviceTypes).includes("Writing Support");
}

export function getServiceOption(serviceType: string) {
  return SERVICE_OPTIONS.find((service) => service.label === serviceType) ?? SERVICE_OPTIONS[1];
}

export function normalizeSelectedServices(serviceTypes: string[] | string | null | undefined) {
  const rawServices = Array.isArray(serviceTypes) ? serviceTypes : serviceTypes ? [serviceTypes] : [];
  const validServiceLabels = new Set<string>(SERVICE_OPTIONS.map((service) => service.label));
  const selected = rawServices.filter((service, index, array) => validServiceLabels.has(service) && array.indexOf(service) === index);
  return selected.length > 0 ? selected : [SERVICE_OPTIONS[1].label];
}

export function getTurnaroundOption(turnaround: string | number) {
  const days = typeof turnaround === "number" ? turnaround : parseTurnaroundDays(turnaround);
  return TURNAROUND_OPTIONS.find((option) => option.days === days) ?? TURNAROUND_OPTIONS.find((option) => option.days === 14)!;
}

export function parseTurnaroundDays(turnaround: string) {
  const lower = turnaround.toLowerCase();
  if (lower.includes("12")) return 0.5;
  if (lower.includes("24")) return 1;
  if (lower.includes("48")) return 2;
  if (lower.includes("week")) return 28;
  const match = lower.match(/\d+/);
  return match ? Math.min(28, Math.max(1, Number(match[0]))) : 14;
}

export function isCustomReviewRequired(wordCount: number) {
  return Number(wordCount) > CUSTOM_REVIEW_WORD_COUNT;
}

export function getStandardTurnaroundDays(wordCount: number) {
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  return getValidTurnaroundOptions(safeWordCount)[0]?.days ?? 28;
}

export function getTurnaroundLimitMessage(days: number) {
  const option = TURNAROUND_OPTIONS.find((item) => item.days === days);
  if (option?.maxWords) return `${option.label} is available for documents up to ${option.maxWords.toLocaleString()} words.`;
  return null;
}

export function getValidTurnaroundOptions(wordCount: number, serviceTypes?: string[] | string | null | undefined) {
  if (isWritingSupportService(serviceTypes)) return [];
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  if (isCustomReviewRequired(safeWordCount)) return [];

  return TURNAROUND_OPTIONS.filter((option) => safeWordCount <= option.maxWords);
}

export function isTurnaroundAllowedForWordCount(wordCount: number, turnaround: string | number, serviceTypes?: string[] | string | null | undefined) {
  if (isWritingSupportService(serviceTypes)) return true;
  const days = typeof turnaround === "number" ? turnaround : parseTurnaroundDays(turnaround);
  return getValidTurnaroundOptions(wordCount, serviceTypes).some((option) => option.days === days);
}

export function getNextValidTurnaroundDays(wordCount: number, requestedTurnaround: string | number, serviceTypes?: string[] | string | null | undefined) {
  const validOptions = getValidTurnaroundOptions(wordCount, serviceTypes);
  if (validOptions.length === 0) return getStandardTurnaroundDays(wordCount);

  const requestedDays = typeof requestedTurnaround === "number" ? requestedTurnaround : parseTurnaroundDays(requestedTurnaround);
  return validOptions.find((option) => option.days >= requestedDays)?.days ?? validOptions[validOptions.length - 1].days;
}

export function getTurnaroundAdjustmentNotice(wordCount: number, requestedTurnaround: string | number) {
  const days = typeof requestedTurnaround === "number" ? requestedTurnaround : parseTurnaroundDays(requestedTurnaround);
  const option = TURNAROUND_OPTIONS.find((item) => item.days === days);
  if (option && wordCount > option.maxWords) return `${option.label} is available for documents up to ${option.maxWords.toLocaleString()} words. We have selected the fastest available timeline for this word count.`;
  return null;
}

export function formatTurnaroundLabel(turnaround: string | number) {
  return getTurnaroundOption(turnaround).label;
}

export function getTurnaroundRate(wordCount: number, turnaround: string | number) {
  const validOptions = getValidTurnaroundOptions(wordCount);
  const turnaroundOption = getTurnaroundOption(turnaround);
  const index = validOptions.findIndex((option) => option.days === turnaroundOption.days);
  if (index < 0) return 0;

  const fastestDays = validOptions[0]?.days;
  const sequence =
    fastestDays === 0.5
      ? TURNAROUND_RATE_SEQUENCES.full
      : fastestDays === 1
        ? TURNAROUND_RATE_SEQUENCES.expressStart
        : TURNAROUND_RATE_SEQUENCES.shifted;

  return sequence[index] ?? sequence[sequence.length - 1];
}

function getServiceRateForTurnaround(serviceType: string, wordCount: number, turnaround: string | number) {
  const service = getServiceOption(serviceType);
  if ("fixedPrice" in service) return 0;
  const timelineRate = getTurnaroundRate(wordCount, turnaround);
  const serviceFactor = service.rate / STANDARD_EDITORIAL_RATE;
  return Number((timelineRate * serviceFactor).toFixed(5));
}

export function getServiceBasePrice(serviceTypes: string[] | string, wordCount: number) {
  const selectedServices = normalizeSelectedServices(serviceTypes);
  if (selectedServices.includes("Writing Support")) return WRITING_SUPPORT_FIXED_PRICE;
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  const baseRate = selectedServices.map((service) => getServiceOption(service)).reduce((sum, service) => sum + service.rate, 0);
  return Number((safeWordCount * baseRate).toFixed(2));
}

export function calculateRushSurcharge(serviceTypes: string[] | string, wordCount: number, selectedTurnaround: string | number) {
  return 0;
}

export function calculateProcessingFee(basePrice: number) {
  return Number((Math.max(0, basePrice) * (SERVICE_CHARGE_PERCENTAGE / 100)).toFixed(2));
}

export function calculateFinalPaymentTotal(basePrice: number) {
  return Number((Math.max(0, basePrice) + calculateProcessingFee(basePrice)).toFixed(2));
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
      customReviewRequired: true,
      message: CUSTOM_REVIEW_MESSAGE,
    };
  }

  if ((days < 1 && days !== 0.5) || days > 28) {
    return {
      allowed: false,
      contactRequired: true,
      message: "Please contact our editors for a custom timeline.",
    };
  }

  if (!isTurnaroundAllowedForWordCount(wordCount, days)) {
    const option = getTurnaroundOption(days);
    return {
      allowed: false,
      message: `${option.label} is not available for this word count. Please choose a longer timeline.`,
    };
  }

  return { allowed: true };
}

export function calculatePrice(wordCount: number, serviceTypes: string[] | string, turnaround: string | number): PriceBreakdown {
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  const selectedServices = normalizeSelectedServices(serviceTypes);
  const turnaroundOption = getTurnaroundOption(turnaround);
  const fixedPackage = selectedServices.includes("Writing Support");
  const baseRate = fixedPackage ? 0 : selectedServices.reduce((sum, service) => sum + getServiceRateForTurnaround(service, safeWordCount, turnaroundOption.days), 0);
  const basePrice = fixedPackage ? WRITING_SUPPORT_FIXED_PRICE : Number((safeWordCount * baseRate).toFixed(2));
  const rushSurcharge = calculateRushSurcharge(selectedServices, safeWordCount, turnaroundOption.days);
  const calculatedPrice = Number((basePrice + rushSurcharge).toFixed(2));
  const subtotal = Number(Math.max(MINIMUM_ORDER, calculatedPrice).toFixed(2));
  const serviceChargeAmount = calculateProcessingFee(subtotal);
  const finalTotal = calculateFinalPaymentTotal(subtotal);

  return {
    wordCount: safeWordCount,
    serviceTypes: selectedServices,
    serviceType: selectedServices.join(", "),
    turnaroundDays: turnaroundOption.days,
    turnaroundLabel: turnaroundOption.label,
    baseRate,
    multiplier: turnaroundOption.multiplier,
    rushSurcharge,
    calculatedPrice,
    subtotal,
    serviceChargePercentage: SERVICE_CHARGE_PERCENTAGE,
    serviceChargeAmount,
    finalTotal,
    finalPrice: subtotal,
    minimumApplied: calculatedPrice < MINIMUM_ORDER,
  };
}

export function calculateServerPrice(wordCount: number, serviceTypes: string[] | string, turnaround: string | number): number {
  return calculatePrice(wordCount, serviceTypes, turnaround).finalTotal;
}
