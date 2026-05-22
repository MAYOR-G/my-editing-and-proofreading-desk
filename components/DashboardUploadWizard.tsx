"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PAYMENT_PROVIDERS, type PaymentProviderName } from "@/lib/payment";
import { type PaymentSettings } from "@/lib/payment-settings";
import {
  DOCUMENT_TYPES,
  ENGLISH_TYPES,
  FORMATTING_STYLES,
  SERVICE_OPTIONS,
  TRANSLATION_OPTIONS,
  TURNAROUND_OPTIONS,
  CUSTOM_REVIEW_MESSAGE,
  TURNAROUND_SUPPORT_MESSAGE,
  calculatePrice,
  getNextValidTurnaroundDays,
  getStandardTurnaroundDays,
  getTurnaroundAdjustmentNotice,
  getTurnaroundLimitMessage,
  getValidTurnaroundOptions,
  isCustomReviewRequired,
  isTurnaroundAllowedForWordCount,
  isWritingSupportService,
  type PricingValidation,
  validateAutomaticPricing,
} from "@/lib/pricing";

type WizardProps = {
  userId: string;
  userEmail: string;
  userName: string;
};

const PROVIDER_INITIALS: Record<PaymentProviderName, string> = {
  paystack: "P",
  flutterwave: "F",
  stripe: "S",
  paypal: "PP",
};

const FORMAT_INSTRUCTION_OPTIONS = new Set(["Custom formatting", "Other", "Non-standard consistency"]);

type PaymentReadiness = Record<PaymentProviderName, { configured: boolean; message: string | null }>;
type SubmittedProject = {
  id: string;
  friendlyId: string;
  amount: number;
  paymentStatus: string;
  status: string;
};

function includesFormattingService(services: string[]) {
  return services.some((service) => service === "Formatting" || service === "Formatting Style");
}

function includesTranslationService(services: string[]) {
  return services.includes("Translation");
}

function summarizeFormatting(style: string, instructions: string) {
  if (!style) return "Not required";
  return instructions ? `${style} — ${instructions}` : style;
}

function summarizeTranslation(preference: string, targetLanguage: string) {
  if (!preference) return "Not required";
  return targetLanguage ? `${preference} — ${targetLanguage}` : preference;
}

export function DashboardUploadWizard({ userId, userEmail, userName }: WizardProps) {
  const [step, setStep] = useState(1);

  // Form State
  const [documentType, setDocumentType] = useState("Academic Paper");
  const [targetJournal, setTargetJournal] = useState("");
  const [formattingStyle, setFormattingStyle] = useState("");
  const [formattingInstructions, setFormattingInstructions] = useState("");
  const [translationPreference, setTranslationPreference] = useState("");
  const [translationTargetLanguage, setTranslationTargetLanguage] = useState("");
  const [englishType, setEnglishType] = useState("No preference");
  const [academicField, setAcademicField] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [detectedWordCount, setDetectedWordCount] = useState<number | null>(null);
  const [adjustedWordCount, setAdjustedWordCount] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Editing"]);
  const [turnaroundDays, setTurnaroundDays] = useState(14);
  const [activeServiceModal, setActiveServiceModal] = useState<"formatting" | "translation" | null>(null);

  // Payment state
  const [provider, setProvider] = useState<PaymentProviderName | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [providerNotice, setProviderNotice] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(null);
  const [paymentReadiness, setPaymentReadiness] = useState<PaymentReadiness | null>(null);
  const [isLoadingPaymentSettings, setIsLoadingPaymentSettings] = useState(true);
  const [paymentSettingsError, setPaymentSettingsError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pricingNotice, setPricingNotice] = useState("");
  const [submittedProject, setSubmittedProject] = useState<SubmittedProject | null>(null);
  const paymentSectionRef = useRef<HTMLDivElement | null>(null);

  const priceBreakdown = wordCount ? calculatePrice(wordCount, selectedServices, turnaroundDays) : null;
  const isWritingSupport = isWritingSupportService(selectedServices);
  const customReviewRequired = Boolean(wordCount && !isWritingSupport && isCustomReviewRequired(wordCount));
  const validTurnaroundOptions = useMemo(() => getValidTurnaroundOptions(wordCount ?? 1, selectedServices), [selectedServices, wordCount]);
  const price = priceBreakdown?.finalPrice ?? 0;
  const finalPaymentTotal = priceBreakdown?.finalTotal ?? 0;
  const subtotal = priceBreakdown?.subtotal ?? 0;
  const serviceChargeAmount = priceBreakdown?.serviceChargeAmount ?? 0;
  const serviceChargePercentage = priceBreakdown?.serviceChargePercentage ?? 5;
  const turnaround = priceBreakdown?.turnaroundLabel ?? "14 days";
  const validation: PricingValidation = wordCount && !isWritingSupport ? validateAutomaticPricing(wordCount, turnaroundDays) : { allowed: true };
  const checkoutBlocked = !validation.allowed;
  const standardDays = getStandardTurnaroundDays(wordCount ?? 1);
  const selectedProviderLabel = provider ? PAYMENT_PROVIDERS.find((item) => item.id === provider)?.label || "Selected provider" : "Select payment method";
  const activePaymentProviders = useMemo(() => {
    if (!paymentSettings) return [];
    return PAYMENT_PROVIDERS.filter((item) => paymentSettings[`${item.id}_enabled`] && paymentReadiness?.[item.id]?.configured !== false);
  }, [paymentReadiness, paymentSettings]);
  const hasAvailablePaymentMethods = activePaymentProviders.length > 0;

  const applyAdjustedWordCount = (value: string, detected = detectedWordCount) => {
    setAdjustedWordCount(value);
    const parsed = Math.max(1, Math.round(Number(value) || 0));
    setWordCount(value.trim() && Number.isFinite(parsed) ? parsed : detected);
  };

  useEffect(() => {
    if (!wordCount || isWritingSupport || customReviewRequired) return;
    if (isTurnaroundAllowedForWordCount(wordCount, turnaroundDays, selectedServices)) return;

    const nextDays = getNextValidTurnaroundDays(wordCount, turnaroundDays, selectedServices);
    const nextNotice = getTurnaroundAdjustmentNotice(wordCount, turnaroundDays);
    setTurnaroundDays(nextDays);
    if (nextNotice) setPricingNotice(nextNotice);
  }, [customReviewRequired, isWritingSupport, selectedServices, turnaroundDays, wordCount]);

  useEffect(() => {
    let cancelled = false;

    async function loadPaymentSettings() {
      setIsLoadingPaymentSettings(true);
      setPaymentSettingsError(null);

      try {
        const response = await fetch("/api/payment-settings", { cache: "no-store" });
        const data = await response.json();

        if (!response.ok || !data.success || !data.settings) {
          throw new Error(data.error || "Payment settings could not be loaded.");
        }

        if (cancelled) return;
        setPaymentSettings(data.settings);
        setPaymentReadiness(data.readiness || null);
      } catch (error: any) {
        if (!cancelled) setPaymentSettingsError(error.message || "Payment settings could not be loaded.");
      } finally {
        if (!cancelled) setIsLoadingPaymentSettings(false);
      }
    }

    loadPaymentSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!submittedProject) return;

    window.setTimeout(() => {
      paymentSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }, [submittedProject]);

  const validateServiceExtras = () => {
    const errors: Record<string, string> = {};

    if (selectedServices.length === 0) {
      errors.selectedServices = "Please select at least one service.";
    }

    if (includesFormattingService(selectedServices)) {
      if (!formattingStyle) {
        errors.formattingStyle = "Please select a formatting style.";
      }

      if (formattingStyle && FORMAT_INSTRUCTION_OPTIONS.has(formattingStyle) && !formattingInstructions.trim()) {
        errors.formattingInstructions = "Please describe the formatting style or instructions.";
      }
    }

    if (includesTranslationService(selectedServices)) {
      if (!translationPreference) {
        errors.translationPreference = "Please select a translation preference.";
      }

      if (translationPreference === "Other" && !translationTargetLanguage.trim()) {
        errors.translationTargetLanguage = "Please enter the target language.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleService = (service: string) => {
    setFieldErrors({});
    setSelectedServices((current) => {
      if (service === "Writing Support") {
        setPricingNotice("Writing Support is offered as a fixed service package.");
        return current.includes("Writing Support") ? ["Editing"] : ["Writing Support"];
      }

      const nextServices = current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current.filter((item) => item !== "Writing Support"), service];

      if (!includesFormattingService(nextServices)) {
        setFormattingStyle("");
        setFormattingInstructions("");
      }

      if (!includesTranslationService(nextServices)) {
        setTranslationPreference("");
        setTranslationTargetLanguage("");
      }

      return nextServices;
    });
  };

  const handleServiceToggle = (service: string) => {
    const wasSelected = selectedServices.includes(service);
    toggleService(service);
    if (!wasSelected && includesFormattingService([service])) setActiveServiceModal("formatting");
    if (!wasSelected && includesTranslationService([service])) setActiveServiceModal("translation");
  };

  const handleTurnaroundSelect = (days: number) => {
    if (!wordCount) {
      setTurnaroundDays(days);
      return;
    }

    if (!isTurnaroundAllowedForWordCount(wordCount, days, selectedServices)) {
      const nextDays = getNextValidTurnaroundDays(wordCount, days, selectedServices);
      setTurnaroundDays(nextDays);
      setPricingNotice(getTurnaroundAdjustmentNotice(wordCount, days) || TURNAROUND_SUPPORT_MESSAGE);
      return;
    }

    setTurnaroundDays(days);
    setPricingNotice("");
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setIsParsing(true);
    setWordCount(null);
    setDetectedWordCount(null);
    setAdjustedWordCount("");
    setParseError("");
    setPricingNotice("");
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await fetch("/api/parse-document", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.wordCount) {
        setParseError(data.error || "We could not calculate a reliable word count. Please re-upload the file or contact support.");
        return;
      }

      const detectedWordCount = Math.max(1, Math.round(Number(data.wordCount)));
      setWordCount(detectedWordCount);
      setDetectedWordCount(detectedWordCount);
      if (detectedWordCount > 50000) setPricingNotice(CUSTOM_REVIEW_MESSAGE);
    } catch {
      setParseError("We could not read this file. Please re-upload a .docx or .txt file, or contact support if the issue continues.");
    }
    finally { setIsParsing(false); }
  };

  const projectPayload = (filePath: string) => ({
    selected_services: selectedServices,
    service_type: selectedServices.join(", "),
    turnaround,
    word_count: wordCount,
    detected_word_count: detectedWordCount || wordCount,
    adjusted_word_count: adjustedWordCount.trim() ? wordCount : null,
    final_word_count: wordCount,
    file_path: filePath,
    title: file?.name,
    client_notes: [academicField ? `Field / industry: ${academicField}` : "", notes].filter(Boolean).join("\n\n"),
    document_type: documentType,
    target_journal: targetJournal.trim() || null,
    formatting_style: formattingStyle,
    formatting_instructions: formattingInstructions.trim() || null,
    translation_preference: translationPreference || null,
    translation_target_language: translationTargetLanguage.trim() || null,
    english_type: englishType,
  });

  const handleSubmitProject = async () => {
    if (!file || !wordCount) return;
    if (!validateServiceExtras()) {
      setPaymentError("Please complete the required service details before submitting.");
      setStep(3);
      return;
    }
    if (checkoutBlocked) {
      setPaymentError(validation.message || "This document requires a custom editorial timeline. Please contact our editors for a tailored quote.");
      return;
    }

    setIsSubmitting(true);
    setPaymentError(null);
    setProviderNotice(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      const uploadRes = await fetch("/api/uploads/document", {
        method: "POST",
        body: uploadFormData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.success || !uploadData.file_path) {
        console.error("Document upload failed:", {
          status: uploadRes.status,
          code: uploadData.code,
          error: uploadData.error,
          traceId: uploadData.trace_id,
        });
        throw new Error(uploadData.error || "We could not upload your document. Please try again or contact support.");
      }

      const filePath = uploadData.file_path;

      const res = await fetch("/api/projects/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload(filePath)),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("Project submission failed:", {
          status: res.status,
          code: data.code,
          error: data.error,
          traceId: data.trace_id,
        });

        if (data.code === "profile_not_found" || data.code === "auth_required") {
          throw new Error(data.error || "Please sign in again before submitting.");
        }

        throw new Error(data.error || "We could not submit your project. Please try again or contact support.");
      }

      setSubmittedProject({
        id: data.project_id,
        friendlyId: data.friendly_id,
        amount: Number(data.final_total || data.amount || finalPaymentTotal),
        paymentStatus: data.payment_status || "pending",
        status: data.status || "Pending",
      });
      setPaymentError(null);
    } catch (err: any) {
      setPaymentError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!submittedProject) return;
    if (isLoadingPaymentSettings) {
      setPaymentError("Payment methods are still loading. Please wait a moment.");
      return;
    }
    if (paymentSettingsError || !hasAvailablePaymentMethods) {
      setPaymentError(paymentSettingsError || "No payment method is currently available. Please contact support.");
      return;
    }
    if (!provider || !activePaymentProviders.some((item) => item.id === provider)) {
      setPaymentError("Please choose an available payment method.");
      return;
    }

    const providerConfig = PAYMENT_PROVIDERS.find((item) => item.id === provider);
    if (paymentReadiness?.[provider] && !paymentReadiness[provider].configured) {
      setPaymentError(`${providerConfig?.label || "This payment method"} is currently unavailable. Please contact support or try another payment method.`);
      return;
    }

    setIsSubmitting(true);
    setPaymentError(null);
    setProviderNotice(null);

    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          project_id: submittedProject.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "We could not prepare payment. Please try again or contact support.");
      }

      window.location.href = data.authorization_url;
    } catch (err: any) {
      setPaymentError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const totalSteps = 4;

  const renderStepIndicator = () => (
    <div className="mb-8 flex items-center justify-between border-b border-hairline pb-5">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex flex-1 items-center last:flex-none">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${step >= s ? "border-primary bg-primary text-white shadow-[0_12px_28px_rgba(23,74,124,0.18)]" : "border-hairline bg-surface-soft text-muted"}`}>
            {step > s ? "✓" : s}
          </div>
          {s < totalSteps && <div className={`h-px flex-1 transition-colors duration-300 ${step > s ? "bg-primary" : "bg-hairline"}`} />}
        </div>
      ))}
    </div>
  );

  const renderServiceModal = () => {
    if (!activeServiceModal) return null;

    const isFormattingModal = activeServiceModal === "formatting";

    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-4 py-6 backdrop-blur-sm">
        <div className="max-h-[88vh] w-full max-w-xl overflow-y-auto border border-hairline bg-ivory p-5 text-ink shadow-[0_28px_90px_rgba(17,17,15,0.25)] sm:p-6">
          <div className="flex items-start justify-between gap-5 border-b border-hairline pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary">{isFormattingModal ? "Formatting details" : "Translation details"}</p>
              <h3 className="mt-2 font-display text-3xl leading-tight text-ink">
                {isFormattingModal ? "Choose formatting style" : "Choose translation preference"}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveServiceModal(null)}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-hairline text-charcoal/60 transition hover:border-primary hover:text-primary"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {isFormattingModal ? (
            <div className="mt-5 grid gap-4">
              <p className="text-sm leading-6 text-charcoal/62">Select the style guide or formatting direction for this document.</p>
              <div className="flex flex-wrap gap-2">
                {FORMATTING_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => {
                      setFormattingStyle(style);
                      if (!FORMAT_INSTRUCTION_OPTIONS.has(style)) setFormattingInstructions("");
                      setFieldErrors((current) => ({ ...current, formattingStyle: "", formattingInstructions: "" }));
                    }}
                    className={`min-h-10 border px-3 text-xs font-medium transition ${
                      formattingStyle === style
                        ? "border-primary bg-primary text-white shadow-[0_12px_28px_rgba(23,74,124,0.16)]"
                        : "border-hairline bg-surface-soft text-charcoal/68 hover:border-primary/40 hover:bg-ivory hover:text-primary"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
              {fieldErrors.formattingStyle ? <p className="text-xs text-red-600">{fieldErrors.formattingStyle}</p> : null}
              {FORMAT_INSTRUCTION_OPTIONS.has(formattingStyle) ? (
                <label className="grid gap-2 text-sm text-charcoal/72">
                  Describe the formatting style or instructions
                  <textarea
                    value={formattingInstructions}
                    onChange={(event) => {
                      setFormattingInstructions(event.target.value);
                      setFieldErrors((current) => ({ ...current, formattingInstructions: "" }));
                    }}
                    className="min-h-28 border border-hairline bg-surface-soft p-3 text-ink placeholder:text-charcoal/38 transition focus:border-primary focus:bg-ivory"
                    placeholder="Share the required guide, template, journal instructions, or consistency rules."
                  />
                  {fieldErrors.formattingInstructions ? <span className="text-xs text-red-600">{fieldErrors.formattingInstructions}</span> : null}
                </label>
              ) : null}
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              <p className="text-sm leading-6 text-charcoal/62">Select the target language or preference for this translation request.</p>
              <div className="flex flex-wrap gap-2">
                {TRANSLATION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setTranslationPreference(option);
                      if (option !== "Other") setTranslationTargetLanguage("");
                      setFieldErrors((current) => ({ ...current, translationPreference: "", translationTargetLanguage: "" }));
                    }}
                    className={`min-h-10 border px-3 text-xs font-medium transition ${
                      translationPreference === option
                        ? "border-primary bg-primary text-white shadow-[0_12px_28px_rgba(23,74,124,0.16)]"
                        : "border-hairline bg-surface-soft text-charcoal/68 hover:border-primary/40 hover:bg-ivory hover:text-primary"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {fieldErrors.translationPreference ? <p className="text-xs text-red-600">{fieldErrors.translationPreference}</p> : null}
              {translationPreference === "Other" ? (
                <label className="grid gap-2 text-sm text-charcoal/72">
                  Enter target language
                  <input
                    value={translationTargetLanguage}
                    onChange={(event) => {
                      setTranslationTargetLanguage(event.target.value);
                      setFieldErrors((current) => ({ ...current, translationTargetLanguage: "" }));
                    }}
                    className="min-h-12 border border-hairline bg-surface-soft px-4 text-ink placeholder:text-charcoal/38 transition focus:border-primary focus:bg-ivory"
                    placeholder="e.g. Dutch, Hindi, Swahili"
                  />
                  {fieldErrors.translationTargetLanguage ? <span className="text-xs text-red-600">{fieldErrors.translationTargetLanguage}</span> : null}
                </label>
              ) : null}
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-hairline pt-4">
            <button
              type="button"
              onClick={() => setActiveServiceModal(null)}
              className="min-h-11 rounded-full border border-hairline px-5 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceModal(null)}
              className="min-h-11 rounded-full bg-cta px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(31,143,90,0.16)] transition hover:bg-cta-active"
            >
              Confirm selection
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-4xl border border-hairline bg-ivory p-6 text-ink shadow-[0_24px_80px_rgba(17,17,15,0.07)] sm:p-10">
      {renderServiceModal()}
      <p className="mb-4 text-xs uppercase tracking-[0.24em] text-primary">New project submission</p>
      {renderStepIndicator()}

      <div className="min-h-[400px]">
        {/* Step 1: Project Details */}
        {step === 1 && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Project details</h2>
              <p className="text-sm text-charcoal/68">Tell us about the document to ensure the right editorial fit.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 md:items-start">
              <label className="grid content-start gap-2.5 text-sm font-medium text-ink">
                Document Type
                <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="min-h-[3.5rem] w-full appearance-none rounded-xl border border-hairline bg-surface-soft px-5 text-ink shadow-sm transition hover:border-primary/30 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20">
                  {DOCUMENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                <span className="text-xs font-normal leading-5 text-charcoal/50">Select the category that best fits your document.</span>
              </label>
              <label className="grid content-start gap-2.5 text-sm font-medium text-ink">
                Target Journal
                <input
                  value={targetJournal}
                  onChange={(e) => setTargetJournal(e.target.value)}
                  type="text"
                  placeholder="e.g. Journal of Applied Research"
                  className="min-h-[3.5rem] w-full rounded-xl border border-hairline bg-surface-soft px-5 text-ink placeholder:text-charcoal/38 shadow-sm transition hover:border-primary/30 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
                <span className="text-xs font-normal leading-5 text-charcoal/50">Optional. Add the journal name if preparing for submission.</span>
              </label>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 md:items-start">
              <label className="grid gap-2.5 text-sm font-medium text-ink">
                Style of English
                <select value={englishType} onChange={(e) => setEnglishType(e.target.value)} className="min-h-[3.5rem] appearance-none rounded-xl border border-hairline bg-surface-soft px-5 text-ink shadow-sm transition hover:border-primary/30 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20">
                  {ENGLISH_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className="grid gap-2.5 text-sm font-medium text-ink">
                Academic Field / Industry
                <input value={academicField} onChange={(e) => setAcademicField(e.target.value)} type="text" placeholder="e.g. Sociology, Tech Startup" className="min-h-[3.5rem] rounded-xl border border-hairline bg-surface-soft px-5 text-ink placeholder:text-charcoal/38 shadow-sm transition hover:border-primary/30 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </label>
            </div>
            
            <label className="grid gap-2.5 text-sm font-medium text-ink">
              Notes to editors
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Specific concerns, tone preferences, or areas to focus on..." className="min-h-32 rounded-xl border border-hairline bg-surface-soft p-5 text-ink placeholder:text-charcoal/38 shadow-sm transition hover:border-primary/30 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20" />
            </label>
          </div>
        )}

        {/* Step 2: Upload */}
        {step === 2 && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Upload document</h2>
              <p className="text-sm text-charcoal/68">We will calculate the word count from your uploaded file and use it for pricing.</p>
            </div>
            
            <div className="relative rounded-2xl border-2 border-dashed border-primary/20 bg-primary/[0.03] p-12 text-center transition-all duration-300 ease-premium-out hover:border-primary/40 hover:bg-primary/[0.06]">
              <input type="file" accept=".docx,.txt" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="grid gap-3 justify-items-center pointer-events-none">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <p className="mt-2 text-lg font-medium text-ink">{file ? file.name : "Click or drag file here"}</p>
                <p className="text-sm text-charcoal/50">Supports .docx and .txt files</p>
              </div>
            </div>
            
            {isParsing && (
              <div className="flex items-center justify-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm font-medium text-primary animate-pulse">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Extracting text and calculating word count...
              </div>
            )}
            
            {parseError ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center shadow-sm">
                <p className="text-base font-semibold text-red-700">Word count could not be detected</p>
                <p className="text-sm text-red-700/80">{parseError}</p>
                <a href="/contact" className="mt-2 inline-flex min-h-10 items-center justify-center rounded-full bg-white border border-red-500/30 px-5 text-xs font-bold uppercase tracking-[0.16em] text-red-700 shadow-sm transition hover:bg-red-500 hover:text-white">
                  Contact Support
                </a>
              </div>
            ) : null}
            
            {wordCount !== null && (
              <div className="grid gap-5 rounded-2xl border border-cta/20 bg-cta/[0.03] p-6 shadow-sm ring-1 ring-inset ring-white lg:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-cta/80">Detected Word Count</p>
                    <p className="font-display text-4xl text-ink">{(detectedWordCount || wordCount).toLocaleString()} <span className="text-xl text-charcoal/60">words</span></p>
                    <p className="mt-2 text-sm text-charcoal/60">Pricing is based on this word count.</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cta text-white shadow-sm ring-4 ring-cta/10">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                
                <div className="mt-2 border-t border-cta/10 pt-5">
                  <label className="grid max-w-sm gap-2.5 text-sm font-medium text-ink">
                    Adjusted word count
                    <input
                      value={adjustedWordCount}
                      onChange={(event) => applyAdjustedWordCount(event.target.value)}
                      inputMode="numeric"
                      min={1}
                      type="number"
                      placeholder={detectedWordCount ? detectedWordCount.toString() : "Optional"}
                      className="min-h-[3.5rem] rounded-xl border border-hairline bg-white px-5 text-ink placeholder:text-charcoal/38 shadow-sm transition hover:border-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    <span className="text-[0.75rem] font-normal leading-5 text-charcoal/50">Optional. Adjust if the detected count includes non-editable sections like references.</span>
                    {adjustedWordCount.trim() ? <span className="mt-1 text-xs font-semibold text-primary">Pricing will use {wordCount?.toLocaleString()} words.</span> : null}
                  </label>
                </div>
                
                {customReviewRequired ? (
                  <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 p-4 text-[0.85rem] leading-6 text-primary">
                    <p>{CUSTOM_REVIEW_MESSAGE}</p>
                    <a href="/contact" className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full bg-white border border-primary/30 px-5 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-sm hover:bg-primary hover:text-white transition-colors">
                      Request Custom Quote
                    </a>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Service & Turnaround */}
        {step === 3 && (
          <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Service & turnaround</h2>
              <p className="text-sm text-charcoal/68">Select your required timeline and service level.</p>
            </div>
            
            <div className="grid gap-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">Service Level</p>
                  <p className="mt-0.5 text-xs text-charcoal/58">Select one or more services for this document.</p>
                </div>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICE_OPTIONS.map((option) => {
                  const selected = selectedServices.includes(option.label);
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => handleServiceToggle(option.label)}
                      className={`group relative flex min-h-[4.5rem] items-start gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
                        selected
                          ? "border-primary bg-primary/[0.03] shadow-[0_4px_16px_rgba(23,74,124,0.06)] ring-1 ring-primary/20"
                          : "border-hairline bg-surface-soft hover:border-primary/40 hover:bg-ivory hover:shadow-sm"
                      }`}
                    >
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${selected ? "border-primary bg-primary text-white" : "border-hairline bg-ivory text-transparent group-hover:border-primary/40"}`}>
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-sm font-semibold transition-colors ${selected ? "text-primary" : "text-ink"}`}>{option.label}</span>
                        <span className="mt-0.5 block text-[0.7rem] leading-[1.1rem] text-charcoal/60 line-clamp-2">{option.note}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {fieldErrors.selectedServices ? <p className="text-xs text-red-600">{fieldErrors.selectedServices}</p> : null}
            </div>
            
            {(includesFormattingService(selectedServices) || includesTranslationService(selectedServices)) && (
              <div className="grid gap-3 sm:grid-cols-2">
                {includesFormattingService(selectedServices) && (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/15 bg-primary/[0.02] p-4 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink">Formatting details</p>
                      <p className="mt-0.5 truncate text-xs text-charcoal/60">{summarizeFormatting(formattingStyle, formattingInstructions)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveServiceModal("formatting")}
                      className="min-h-8 shrink-0 rounded-full border border-primary/30 bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition hover:bg-primary hover:text-white"
                    >
                      Edit
                    </button>
                    <div className="w-full">
                      {fieldErrors.formattingStyle ? <p className="text-xs text-red-600">{fieldErrors.formattingStyle}</p> : null}
                      {fieldErrors.formattingInstructions ? <p className="text-xs text-red-600">{fieldErrors.formattingInstructions}</p> : null}
                    </div>
                  </div>
                )}
                
                {includesTranslationService(selectedServices) && (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/15 bg-primary/[0.02] p-4 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink">Translation details</p>
                      <p className="mt-0.5 truncate text-xs text-charcoal/60">{summarizeTranslation(translationPreference, translationTargetLanguage)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveServiceModal("translation")}
                      className="min-h-8 shrink-0 rounded-full border border-primary/30 bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition hover:bg-primary hover:text-white"
                    >
                      Edit
                    </button>
                    <div className="w-full">
                      {fieldErrors.translationPreference ? <p className="text-xs text-red-600">{fieldErrors.translationPreference}</p> : null}
                      {fieldErrors.translationTargetLanguage ? <p className="text-xs text-red-600">{fieldErrors.translationTargetLanguage}</p> : null}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* The Horizontal "In-Between" Live Quote Bar */}
            <div className="flex flex-col gap-6 rounded-2xl border border-primary/15 bg-white p-6 shadow-[0_8px_30px_rgba(23,74,124,0.06)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary/70">Live Quote</p>
                <p className="font-display text-4xl tracking-tight text-ink">{customReviewRequired ? "Custom" : `$${price.toFixed(2)}`}</p>
                <p className="mt-1 text-[0.75rem] text-charcoal/50">
                  {isWritingSupport ? "Writing Support is a fixed package." : `Based on ${wordCount?.toLocaleString() || 0} words, services & timeline.`}
                </p>
              </div>
              
              <div className="grid gap-2 border-t border-hairline pt-4 text-sm sm:w-64 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <div className="flex justify-between gap-4 text-charcoal/70">
                  <span>Service total</span>
                  <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
                </div>
                {priceBreakdown?.minimumApplied ? (
                  <div className="flex justify-between gap-4 text-charcoal/70">
                    <span>Minimum order</span>
                    <span className="font-medium text-ink">$10.00</span>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 text-charcoal/70">
                  <span>Processing fee</span>
                  <span className="font-medium text-ink">At payment</span>
                </div>
              </div>
            </div>

            {pricingNotice || !validation.allowed ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-[0.8rem] leading-5 text-primary shadow-sm">
                <p>{customReviewRequired ? CUSTOM_REVIEW_MESSAGE : pricingNotice || validation.message}</p>
                {validation.contactRequired ? (
                  <a href="/contact" className="mt-3 inline-flex min-h-9 items-center justify-center rounded-full bg-white border border-primary/30 px-6 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-primary shadow-sm hover:bg-primary hover:text-white transition-colors">
                    Request Custom Quote
                  </a>
                ) : null}
              </div>
            ) : null}
            
            <div className={`rounded-xl border border-hairline bg-surface-soft p-5 sm:p-6 shadow-sm transition-opacity ${isWritingSupport || customReviewRequired ? "opacity-60 pointer-events-none" : ""}`}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
                <div>
                  <h3 className="font-semibold text-ink">Turnaround Time</h3>
                  <p className="text-xs text-charcoal/55 mt-0.5">Select when you need the document returned.</p>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary ring-1 ring-primary/20">
                  {isWritingSupport ? "Fixed package" : turnaround}
                </span>
              </div>
              
              <div className="mb-6">
                <input
                  aria-label="Turnaround time"
                  type="range"
                  min={1}
                  max={28}
                  step={1}
                  value={turnaroundDays}
                  disabled={isWritingSupport || customReviewRequired}
                  onChange={(event) => handleTurnaroundSelect(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-hairline accent-[#174a7c]"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {[1, 2, 3, 7, 14, 21, 28].map((days) => {
                  const option = TURNAROUND_OPTIONS.find((item) => item.days === days)!;
                  const disabled = isWritingSupport || customReviewRequired || !validTurnaroundOptions.some((item) => item.days === days);
                  const isSelected = turnaroundDays === days && !disabled;
                  
                  return (
                    <button
                      key={days}
                      type="button"
                      onClick={() => handleTurnaroundSelect(days)}
                      disabled={disabled}
                      title={disabled ? getTurnaroundLimitMessage(days) || "Contact support for a custom review." : undefined}
                      className={`flex h-10 items-center justify-center rounded-lg border text-[0.7rem] font-semibold transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-white shadow-sm"
                          : disabled
                            ? "cursor-not-allowed border-hairline bg-surface-soft text-charcoal/30"
                            : "border-hairline bg-white text-charcoal/65 hover:border-primary/50 hover:bg-surface-soft hover:text-ink"
                      }`}
                    >
                      {option.label.replace(" / 28 days", "")}
                    </button>
                  );
                })}
              </div>
              <p className="mt-5 text-[0.75rem] text-charcoal/50 text-center">{isWritingSupport ? "Writing Support uses a fixed package price." : TURNAROUND_SUPPORT_MESSAGE}</p>
            </div>
            
          </div>
        )}

        {/* Step 4: Order Summary + Submit */}
        {step === 4 && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="mb-2 font-display text-3xl leading-tight text-ink">{submittedProject ? "Project submitted successfully." : "Review & submit"}</h2>
              <p className="text-sm text-charcoal/68">
                {submittedProject
                  ? "We've received your document and project details. You can complete payment now or return to this project later from your dashboard."
                  : "Review your project details. Submitting will save the project before payment."}
              </p>
            </div>

            {submittedProject ? (
              <div className="rounded-2xl border border-cta/25 bg-cta/[0.04] p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cta">Saved project</p>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-charcoal/60">Project ID</span>
                    <p className="mt-1 font-display text-3xl text-ink">{submittedProject.friendlyId}</p>
                  </div>
                  <div>
                    <span className="text-charcoal/60">Total payable</span>
                    <p className="mt-1 font-display text-3xl text-primary">${submittedProject.amount.toFixed(2)}</p>
                  </div>
                  <div><span className="text-charcoal/60">Payment</span><p className="font-semibold text-ink">Unpaid</p></div>
                  <div><span className="text-charcoal/60">Status</span><p className="font-semibold text-ink">{submittedProject.status}</p></div>
                </div>
              </div>
            ) : null}

            {submittedProject ? (
              <div ref={paymentSectionRef} className="rounded-2xl border border-hairline bg-white p-6 shadow-sm ring-2 ring-primary/10">
                <p className="text-xs font-bold uppercase tracking-widest text-charcoal/50">Select payment method</p>
                <div className="mt-4">
                  {isLoadingPaymentSettings ? (
                    <p className="text-sm text-charcoal/60">Loading available payment methods...</p>
                  ) : paymentSettingsError ? (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700">{paymentSettingsError}</p>
                  ) : !hasAvailablePaymentMethods ? (
                    <p className="text-sm text-charcoal/60">No payment method is currently available. Please contact support.</p>
                  ) : (
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Payment method
                      <select
                        value={provider}
                        onChange={(event) => {
                          setProvider(event.target.value as PaymentProviderName | "");
                          setPaymentError(null);
                        }}
                        className="min-h-12 rounded-xl border border-hairline bg-surface-soft px-4 text-ink transition focus:border-primary focus:bg-white"
                      >
                        <option value="">Select payment method...</option>
                        {activePaymentProviders.map((info) => (
                          <option key={info.id} value={info.id}>{info.label}</option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>
              </div>
            ) : null}

            <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
              <div className="border-b border-hairline bg-surface-soft px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-widest text-charcoal/50">Order Summary</p>
              </div>
              <div className="p-6 text-sm">
                <div className="grid gap-4">
                  {[
                    ["Document", file?.name],
                    ["Document Type", documentType],
                    ["Target Journal", targetJournal.trim() || "Not provided"],
                    ["Formatting Style", summarizeFormatting(formattingStyle, formattingInstructions)],
                    ["Translation", summarizeTranslation(translationPreference, translationTargetLanguage)],
                    ["Style of English", englishType],
                    ["Services & Turnaround", `${selectedServices.join(", ")} — ${turnaround}`],
                    ["Detected Word Count", (detectedWordCount || wordCount)?.toLocaleString()],
                    ["Adjusted Word Count", adjustedWordCount.trim() ? wordCount?.toLocaleString() : "Not provided"],
                    ["Final Word Count", wordCount?.toLocaleString()],
                    ["Payment Provider", submittedProject ? selectedProviderLabel : "Choose after submission"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-hairline/50 pb-3 last:border-0">
                      <span className="text-charcoal/60">{label}</span>
                      <span className="font-medium text-ink sm:text-right">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 rounded-xl border border-primary/10 bg-primary/[0.02] p-5">
                  <div className="grid gap-3">
                    <div className="flex justify-between gap-4">
                      <span className="text-charcoal/60">Service total</span>
                      <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
                    </div>
                    {priceBreakdown?.minimumApplied ? (
                      <div className="flex justify-between gap-4">
                        <span className="text-charcoal/60">Minimum order amount</span>
                        <span className="font-medium text-ink">$10.00</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between gap-4">
                      <span className="text-charcoal/60">Processing fee ({serviceChargePercentage}%)</span>
                      <span className="font-medium text-ink">${serviceChargeAmount.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 flex justify-between border-t border-primary/15 pt-4">
                      <span className="font-display text-xl text-ink">Total payable</span>
                      <span className="font-display text-3xl tracking-tight text-primary">${finalPaymentTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!validation.allowed ? (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-primary">{validation.message || "This document requires a custom editorial timeline. Please contact our editors for a tailored quote."}</p>
                {validation.contactRequired ? (
                  <a href="/contact" className="inline-flex min-h-10 items-center justify-center rounded-full bg-white border border-primary/30 px-6 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-sm hover:bg-primary hover:text-white transition-colors">
                    Contact our editors
                  </a>
                ) : null}
              </div>
            ) : null}

            {paymentError && (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-700 shadow-sm">
                <svg className="h-5 w-5 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                <div>
                  <p className="font-bold">Payment Error</p>
                  <p className="mt-1 opacity-90">{paymentError}</p>
                </div>
              </div>
            )}

            <button
              onClick={submittedProject ? handlePayment : handleSubmitProject}
              disabled={isSubmitting || checkoutBlocked || (Boolean(submittedProject) && !provider)}
              className="min-h-[3.75rem] w-full rounded-xl bg-cta px-6 text-base font-bold text-white shadow-[0_12px_30px_rgba(31,143,90,0.2)] transition-all duration-300 hover:bg-cta-active hover:shadow-[0_16px_40px_rgba(31,143,90,0.25)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  {submittedProject ? "Initializing secure payment..." : "Submitting project..."}
                </span>
              ) : (
                checkoutBlocked
                  ? "Contact our editors"
                  : submittedProject
                    ? provider ? `Proceed to payment with ${selectedProviderLabel}` : "Select a payment method"
                    : "Submit project and continue"
              )}
            </button>
            {submittedProject ? (
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`/dashboard/active/${submittedProject.id}`} className="inline-flex min-h-11 items-center rounded-full border border-hairline px-5 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary">
                  View project
                </a>
                <a href="/dashboard/active" className="inline-flex min-h-11 items-center rounded-full border border-hairline px-5 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary">
                  Pay later
                </a>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between border-t border-hairline pt-6">
        {step > 1 ? (
          <button onClick={() => { setStep(step - 1); setPaymentError(null); }} className="rounded-full border border-hairline px-6 py-3 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary" disabled={isSubmitting || Boolean(submittedProject)}>Back</button>
        ) : <div />}
        {step < totalSteps ? (
          <button
            onClick={() => {
              setPaymentError(null);
              if (step === 3 && !validateServiceExtras()) return;
              setStep(step + 1);
            }}
            disabled={
              (step === 2 && wordCount === null) ||
              (step === 3 && checkoutBlocked) ||
              isParsing
            }
            className="rounded-full bg-cta px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(31,143,90,0.16)] transition hover:bg-cta-active disabled:cursor-not-allowed disabled:opacity-50"
          >Continue</button>
        ) : <div />}
      </div>
    </div>
  );
}
