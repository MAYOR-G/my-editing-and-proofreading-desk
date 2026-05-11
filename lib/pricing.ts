export const MINIMUM_ORDER = 30;
export const CUSTOM_REVIEW_WORD_COUNT = 50000;
export const MAX_AUTOMATIC_WORD_COUNT = CUSTOM_REVIEW_WORD_COUNT;
export const SERVICE_CHARGE_PERCENTAGE = 5;
export const WRITING_SUPPORT_FIXED_PRICE = 450;
export const RUSH_SURCHARGE_RATE = 0.003;

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
  { days: 1, label: "24 hours", multiplier: 1, note: "Express handling for short documents." },
  { days: 2, label: "48 hours", multiplier: 1, note: "Express editorial handling for eligible documents." },
  { days: 3, label: "3 days", multiplier: 1, note: "Priority handling for eligible documents." },
  { days: 4, label: "4 days", multiplier: 1, note: "Expedited review for shorter documents." },
  { days: 5, label: "5 days", multiplier: 1, note: "Faster than standard for shorter documents." },
  { days: 6, label: "6 days", multiplier: 1, note: "Near-standard priority for shorter documents." },
  { days: 7, label: "7 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 8, label: "8 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 9, label: "9 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 10, label: "10 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 11, label: "11 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 12, label: "12 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 13, label: "13 days", multiplier: 1, note: "Standard editorial pace." },
  { days: 14, label: "14 days", multiplier: 1, note: "Balanced pace for careful editorial work." },
  { days: 15, label: "15 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 16, label: "16 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 17, label: "17 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 18, label: "18 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 19, label: "19 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 20, label: "20 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 21, label: "21 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 22, label: "22 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 23, label: "23 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 24, label: "24 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 25, label: "25 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 26, label: "26 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 27, label: "27 days", multiplier: 1, note: "Flexible timeline for careful review." },
  { days: 28, label: "4 weeks / 28 days", multiplier: 1, note: "Extended automatic calculator timeline." },
] as const;

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

export const CUSTOM_REVIEW_MESSAGE = "Documents above 50,000 words require a custom review. Please contact our support team so we can confirm the best timeline and pricing for your project.";
export const TURNAROUND_SUPPORT_MESSAGE = "Choose a turnaround that fits your document. Larger or complex documents may require a custom review.";

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
  if (safeWordCount <= 10000) return 7;
  if (safeWordCount <= 30000) return 14;
  return 28;
}

export function getTurnaroundLimitMessage(days: number) {
  if (days === 1) return "24-hour turnaround is available for documents up to 5,000 words.";
  if (days === 2 || days === 3) return "This turnaround is available for documents up to 10,000 words.";
  if (days > 3 && days < 7) return "This expedited turnaround is available for documents up to 10,000 words.";
  return null;
}

export function getValidTurnaroundOptions(wordCount: number, serviceTypes?: string[] | string | null | undefined) {
  if (isWritingSupportService(serviceTypes)) return [];
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  if (isCustomReviewRequired(safeWordCount)) return [];

  return TURNAROUND_OPTIONS.filter((option) => {
    if (option.days === 1) return safeWordCount <= 5000;
    if (option.days >= 2 && option.days <= 6) return safeWordCount <= 10000;
    return option.days >= 7 && option.days <= 28;
  });
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
  if (days === 1 && wordCount > 5000) {
    return "24-hour turnaround is available for documents up to 5,000 words. We have selected the next available timeline for this word count.";
  }
  if (days >= 2 && days <= 6 && wordCount > 10000) {
    return "This turnaround is available for documents up to 10,000 words. We have selected a more suitable timeline for this word count.";
  }
  return null;
}

export function getServiceBasePrice(serviceTypes: string[] | string, wordCount: number) {
  const selectedServices = normalizeSelectedServices(serviceTypes);
  if (selectedServices.includes("Writing Support")) return WRITING_SUPPORT_FIXED_PRICE;
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  const baseRate = selectedServices.map((service) => getServiceOption(service)).reduce((sum, service) => sum + service.rate, 0);
  return Number((safeWordCount * baseRate).toFixed(2));
}

export function calculateRushSurcharge(serviceTypes: string[] | string, wordCount: number, selectedTurnaround: string | number) {
  if (isWritingSupportService(serviceTypes) || isCustomReviewRequired(wordCount)) return 0;
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  const days = typeof selectedTurnaround === "number" ? selectedTurnaround : parseTurnaroundDays(selectedTurnaround);
  const standardDays = getStandardTurnaroundDays(safeWordCount);
  if (days >= standardDays) return 0;
  const rushDays = standardDays - days;
  return Number((safeWordCount * RUSH_SURCHARGE_RATE * rushDays).toFixed(2));
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

  if (days < 1 || days > 28) {
    return {
      allowed: false,
      contactRequired: true,
      message: "Please contact our editors for a custom timeline.",
    };
  }

  if (days === 1 && wordCount > 5000) {
    return {
      allowed: false,
      message: "24-hour turnaround is available for documents up to 5,000 words. Please choose a longer turnaround.",
    };
  }

  if (days >= 2 && days <= 6 && wordCount > 10000) {
    return {
      allowed: false,
      message: "This turnaround is available for documents up to 10,000 words. Please choose a longer turnaround.",
    };
  }

  return { allowed: true };
}

export function calculatePrice(wordCount: number, serviceTypes: string[] | string, turnaround: string | number): PriceBreakdown {
  const safeWordCount = Math.max(1, Math.round(Number(wordCount) || 0));
  const selectedServices = normalizeSelectedServices(serviceTypes);
  const serviceOptions = selectedServices.map((service) => getServiceOption(service));
  const turnaroundOption = getTurnaroundOption(turnaround);
  const fixedPackage = selectedServices.includes("Writing Support");
  const baseRate = fixedPackage ? 0 : serviceOptions.reduce((sum, service) => sum + service.rate, 0);
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
