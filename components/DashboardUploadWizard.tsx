"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Editing"]);
  const [turnaroundDays, setTurnaroundDays] = useState(14);
  const [activeServiceModal, setActiveServiceModal] = useState<"formatting" | "translation" | null>(null);

  // Payment state
  const [provider, setProvider] = useState<PaymentProviderName>("paystack");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [providerNotice, setProviderNotice] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(null);
  const [paymentReadiness, setPaymentReadiness] = useState<PaymentReadiness | null>(null);
  const [isLoadingPaymentSettings, setIsLoadingPaymentSettings] = useState(true);
  const [paymentSettingsError, setPaymentSettingsError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pricingNotice, setPricingNotice] = useState("");

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
  const selectedProviderLabel = PAYMENT_PROVIDERS.find((item) => item.id === provider)?.label || "Paystack";
  const activePaymentProviders = useMemo(() => {
    if (!paymentSettings) return [];
    return PAYMENT_PROVIDERS.filter((item) => paymentSettings[`${item.id}_enabled`] && paymentReadiness?.[item.id]?.configured !== false);
  }, [paymentReadiness, paymentSettings]);
  const hasAvailablePaymentMethods = activePaymentProviders.length > 0;

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
        const availableProviders = PAYMENT_PROVIDERS.filter((item) => data.settings[`${item.id}_enabled`] && data.readiness?.[item.id]?.configured !== false);
        if (availableProviders.length > 0) {
          setProvider((current) => availableProviders.some((item) => item.id === current) ? current : availableProviders[0].id);
        }
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
      if (detectedWordCount > 50000) setPricingNotice(CUSTOM_REVIEW_MESSAGE);
    } catch {
      setParseError("We could not read this file. Please re-upload a .docx or .txt file, or contact support if the issue continues.");
    }
    finally { setIsParsing(false); }
  };

  const handlePayment = async () => {
    if (!file || !wordCount) return;
    if (!validateServiceExtras()) {
      setPaymentError("Please complete the required service details before checkout.");
      setStep(3);
      return;
    }
    if (checkoutBlocked) {
      setPaymentError(validation.message || "This document requires a custom editorial timeline. Please contact our editors for a tailored quote.");
      return;
    }
    if (isLoadingPaymentSettings) {
      setPaymentError("Payment methods are still loading. Please wait a moment.");
      return;
    }
    if (paymentSettingsError || !hasAvailablePaymentMethods) {
      setPaymentError(paymentSettingsError || "No payment method is currently available. Please contact support.");
      return;
    }
    if (!activePaymentProviders.some((item) => item.id === provider)) {
      setPaymentError("Please choose an available payment method.");
      setStep(4);
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
      // 1. Upload file through the authenticated server route.
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

      // 2. Initialize payment (server calculates price)
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          selected_services: selectedServices,
          service_type: selectedServices.join(", "),
          turnaround,
          word_count: wordCount,
          file_path: filePath,
          title: file.name,
          client_notes: [academicField ? `Field / industry: ${academicField}` : "", notes].filter(Boolean).join("\n\n"),
          document_type: documentType,
          target_journal: targetJournal.trim() || null,
          formatting_style: formattingStyle,
          formatting_instructions: formattingInstructions.trim() || null,
          translation_preference: translationPreference || null,
          translation_target_language: translationTargetLanguage.trim() || null,
          english_type: englishType,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("Checkout initialization failed:", {
          status: res.status,
          code: data.code,
          error: data.error,
          traceId: data.trace_id,
        });

        if (data.code === "checkout_setup_required") {
          throw new Error("Checkout is temporarily unavailable while we finish a database update. Please contact support if this continues.");
        }

        if (data.code === "payment_provider_failed") {
          throw new Error("We could not start secure checkout. Please try again or contact support.");
        }

        if (data.code === "order_create_failed") {
          throw new Error("We could not create your order. Please try again or contact support.");
        }

        if (data.code === "profile_not_found" || data.code === "auth_required") {
          throw new Error(data.error || "Please sign in again before checkout.");
        }

        throw new Error(data.error || "We could not prepare your order. Please try again or contact support.");
      }

      // 3. Redirect to payment provider
      window.location.href = data.authorization_url;
    } catch (err: any) {
      setPaymentError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const totalSteps = 5;

  const renderStepIndicator = () => (
    <div className="mb-8 flex items-center justify-between border-b border-hairline pb-5">
      {[1, 2, 3, 4, 5].map((s) => (
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
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Project details</h2>
            <p className="mb-4 text-sm text-charcoal/68">Tell us about the document to ensure the right editorial fit.</p>
            <div className="grid gap-5 md:grid-cols-2 md:items-start">
              <label className="grid content-start gap-2 text-sm text-charcoal/72">
                <span className="min-h-5">Document Type</span>
                <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="min-h-12 w-full border border-hairline bg-surface-soft px-4 text-ink transition focus:border-primary focus:bg-ivory">
                  {DOCUMENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                <span aria-hidden="true" className="min-h-10 text-xs leading-5 text-transparent">Document category</span>
              </label>
              <label className="grid content-start gap-2 text-sm text-charcoal/72">
                <span className="min-h-5">Target Journal</span>
                <input
                  value={targetJournal}
                  onChange={(e) => setTargetJournal(e.target.value)}
                  type="text"
                  placeholder="e.g. Journal of Applied Research"
                  className="min-h-12 w-full border border-hairline bg-surface-soft px-4 text-ink placeholder:text-charcoal/38 transition focus:border-primary focus:bg-ivory"
                />
                <span className="min-h-10 text-xs leading-5 text-charcoal/48">Optional. Add the journal name if your document is being prepared for submission.</span>
              </label>
            </div>
            <label className="grid gap-2 text-sm text-charcoal/72">Style of English
              <select value={englishType} onChange={(e) => setEnglishType(e.target.value)} className="min-h-12 border border-hairline bg-surface-soft px-4 text-ink transition focus:border-primary focus:bg-ivory">
                {ENGLISH_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-charcoal/72">Academic Field / Industry
              <input value={academicField} onChange={(e) => setAcademicField(e.target.value)} type="text" placeholder="e.g. Sociology, Tech Startup" className="min-h-12 border border-hairline bg-surface-soft px-4 text-ink placeholder:text-charcoal/38 transition focus:border-primary focus:bg-ivory" />
            </label>
            <label className="grid gap-2 text-sm text-charcoal/72">Notes to editors
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Specific concerns, tone preferences, or areas to focus on..." className="min-h-32 border border-hairline bg-surface-soft p-4 text-ink placeholder:text-charcoal/38 transition focus:border-primary focus:bg-ivory" />
            </label>
          </div>
        )}

        {/* Step 2: Upload */}
        {step === 2 && (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Upload document</h2>
            <p className="mb-4 text-sm text-charcoal/68">We will calculate the word count from your uploaded file and use it for pricing.</p>
            <div className="relative rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-10 text-center shadow-[0_18px_55px_rgba(23,74,124,0.045)] transition duration-300 ease-premium-out hover:border-primary/45 hover:bg-primary/10 hover:shadow-[0_24px_70px_rgba(23,74,124,0.07)]">
              <input type="file" accept=".docx,.txt" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="grid gap-3 justify-items-center pointer-events-none">
                <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <p className="text-lg font-medium text-ink">{file ? file.name : "Click or drag file here"}</p>
                <p className="text-sm text-charcoal/55">Supports .docx and .txt files</p>
              </div>
            </div>
            {isParsing && <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-center text-primary animate-pulse">Extracting text and calculating word count...</div>}
            {parseError ? (
              <div className="rounded-xl border border-primary/20 bg-surface-soft p-5 text-sm leading-6 text-charcoal/72">
                <p className="font-semibold text-ink">Word count could not be detected</p>
                <p className="mt-1">{parseError}</p>
                <a href="/contact" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-primary/30 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition hover:bg-primary hover:text-white">
                  Contact Support
                </a>
              </div>
            ) : null}
            {wordCount !== null && (
              <div className="grid gap-4 rounded-2xl border border-cta/20 bg-cta-soft p-6 shadow-[0_18px_55px_rgba(31,143,90,0.055)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-widest text-cta">Detected word count</p>
                    <p className="font-display text-3xl text-ink">{wordCount.toLocaleString()} words</p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-charcoal/62">
                      Pricing is based on the word count detected from your uploaded file.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cta text-white">✓</div>
                </div>
                {customReviewRequired ? (
                  <div className="rounded-lg border border-primary/25 bg-primary/10 p-4 text-sm leading-6 text-primary">
                    <p>{CUSTOM_REVIEW_MESSAGE}</p>
                    <a href="/contact" className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full border border-primary/40 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
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
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Service & turnaround</h2>
            <p className="mb-4 text-sm text-charcoal/68">Select your required timeline and service level.</p>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-start">
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-ink">Service Level</p>
                      <p className="mt-1 text-xs leading-5 text-charcoal/58">Select one or more services for this document.</p>
                    </div>
                    <div className="flex max-w-full flex-wrap gap-1.5">
                      {selectedServices.map((service) => (
                        <span key={service} className="border border-primary/20 bg-primary/[0.06] px-2.5 py-1 text-[0.68rem] font-medium text-primary">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {SERVICE_OPTIONS.map((option) => {
                      const selected = selectedServices.includes(option.label);
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleServiceToggle(option.label)}
                          className={`min-h-[4.1rem] border p-3 text-left transition ${
                            selected
                              ? "border-primary bg-primary/10 text-ink shadow-[0_14px_32px_rgba(23,74,124,0.10)]"
                              : "border-hairline bg-surface-soft text-charcoal/70 hover:border-primary/40 hover:bg-ivory"
                          }`}
                        >
                          <span className="flex items-start gap-3">
                            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${selected ? "border-primary bg-primary text-white" : "border-hairline bg-ivory text-transparent"}`}>
                              ✓
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-ink">{option.label}</span>
                              <span className="mt-1 block text-xs leading-4 text-charcoal/54">{option.note}</span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {fieldErrors.selectedServices ? <p className="text-xs text-red-600">{fieldErrors.selectedServices}</p> : null}
                </div>
                {includesFormattingService(selectedServices) && (
                  <div className="flex flex-wrap items-center justify-between gap-3 border border-primary/15 bg-primary/[0.04] p-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">Formatting details</p>
                      <p className="mt-1 truncate text-xs text-charcoal/58">{summarizeFormatting(formattingStyle, formattingInstructions)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveServiceModal("formatting")}
                      className="min-h-9 shrink-0 rounded-full border border-primary/30 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:bg-primary hover:text-white"
                    >
                      Edit
                    </button>
                    {fieldErrors.formattingStyle ? <p className="text-xs text-red-600">{fieldErrors.formattingStyle}</p> : null}
                    {fieldErrors.formattingInstructions ? <p className="text-xs text-red-600">{fieldErrors.formattingInstructions}</p> : null}
                  </div>
                )}
                {includesTranslationService(selectedServices) && (
                  <div className="flex flex-wrap items-center justify-between gap-3 border border-primary/15 bg-primary/[0.04] p-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">Translation details</p>
                      <p className="mt-1 truncate text-xs text-charcoal/58">{summarizeTranslation(translationPreference, translationTargetLanguage)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveServiceModal("translation")}
                      className="min-h-9 shrink-0 rounded-full border border-primary/30 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:bg-primary hover:text-white"
                    >
                      Edit
                    </button>
                    {fieldErrors.translationPreference ? <p className="text-xs text-red-600">{fieldErrors.translationPreference}</p> : null}
                    {fieldErrors.translationTargetLanguage ? <p className="text-xs text-red-600">{fieldErrors.translationTargetLanguage}</p> : null}
                  </div>
                )}
                <div className={`grid gap-3 border border-hairline bg-surface-soft p-4 text-sm text-charcoal/72 ${isWritingSupport || customReviewRequired ? "opacity-60" : ""}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span>Turnaround Time</span>
                    <span className="text-primary">{isWritingSupport ? "Fixed package" : turnaround}</span>
                  </div>
                  <input
                    aria-label="Turnaround time"
                    type="range"
                    min={1}
                    max={28}
                    step={1}
                    value={turnaroundDays}
                    disabled={isWritingSupport || customReviewRequired}
                    onChange={(event) => handleTurnaroundSelect(Number(event.target.value))}
                    className="w-full accent-[#174a7c]"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 7, 14, 21, 28].map((days) => {
                      const option = TURNAROUND_OPTIONS.find((item) => item.days === days)!;
                      const disabled = isWritingSupport || customReviewRequired || !validTurnaroundOptions.some((item) => item.days === days);
                      return (
                        <button
                          key={days}
                          type="button"
                          onClick={() => handleTurnaroundSelect(days)}
                          disabled={disabled}
                          title={disabled ? getTurnaroundLimitMessage(days) || "Contact support for a custom review." : undefined}
                          className={`min-h-10 border px-2 text-xs transition ${
                            turnaroundDays === days && !disabled
                              ? "border-primary bg-primary/10 text-primary"
                              : disabled
                                ? "cursor-not-allowed border-hairline bg-surface-soft text-charcoal/30"
                                : "border-hairline bg-surface-soft text-charcoal/65 hover:border-primary/50"
                          }`}
                        >
                          {option.label.replace(" / 28 days", "")}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-charcoal/50">{isWritingSupport ? "Writing Support uses a fixed package price." : TURNAROUND_SUPPORT_MESSAGE}</p>
                </div>
              </div>
              <div className="flex flex-col border border-primary/20 bg-primary/5 p-5 text-center lg:sticky lg:top-6">
                <p className="mb-2 text-sm text-charcoal/62">{customReviewRequired ? "Custom review required" : "Estimated service total"}</p>
                <p className="font-display text-4xl text-primary">{customReviewRequired ? "Custom" : `$${price.toFixed(2)}`}</p>
                <div className="mt-4 grid w-full gap-2 border-t border-primary/15 pt-4 text-sm">
                  <div className="flex justify-between gap-4 text-charcoal/62">
                    <span>Service total</span>
                    <span className="text-ink">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-charcoal/62">
                    <span>Processing fee</span>
                    <span className="text-ink">Shown at payment step</span>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-charcoal/50">
                  {isWritingSupport ? "Writing Support is a fixed package." : `Based on the detected ${wordCount?.toLocaleString()}-word count, selected services, and timeline.`}
                </p>
                {pricingNotice || !validation.allowed ? (
                  <div className="mt-4 rounded-lg border border-primary/25 bg-primary/10 p-4 text-sm leading-6 text-primary">
                    <p>{customReviewRequired ? CUSTOM_REVIEW_MESSAGE : pricingNotice || validation.message}</p>
                    {validation.contactRequired ? (
                      <a href="/contact" className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full border border-primary/40 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Request Custom Quote
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Payment Provider Selection */}
        {step === 4 && (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Select payment method</h2>
            <p className="mb-6 text-sm text-charcoal/68">Choose from the payment methods currently enabled by our admin team.</p>
            {isLoadingPaymentSettings ? (
              <div className="border border-primary/20 bg-primary/10 p-5 text-sm text-primary animate-pulse">
                Loading available payment methods...
              </div>
            ) : paymentSettingsError ? (
              <div className="border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-700">
                {paymentSettingsError}
              </div>
            ) : !hasAvailablePaymentMethods ? (
              <div className="border border-hairline bg-surface-soft p-6 text-center text-sm text-charcoal/68">
                No payment method is currently available. Please contact support.
              </div>
            ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {activePaymentProviders.map((info) => {
                const isSelected = provider === info.id;

                return (
                <button
                  key={info.id}
                  type="button"
                  onClick={() => {
                    setProvider(info.id);
                    setProviderNotice(null);
                  }}
                  className={`group relative border p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-[0_20px_50px_rgba(23,74,124,0.12)]"
                      : "border-hairline bg-surface-soft hover:border-primary/30 hover:bg-ivory"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center border text-sm font-bold ${isSelected ? "border-primary bg-primary text-white" : "border-hairline bg-ivory text-charcoal/60"}`}>
                      {PROVIDER_INITIALS[info.id]}
                    </div>
                    <div>
                      <p className={`text-lg font-semibold ${isSelected ? "text-primary" : "text-ink"}`}>{info.label}</p>
                      <p className="text-xs text-charcoal/55">{info.description}</p>
                    </div>
                  </div>
                </button>
              )})}
            </div>
            )}
            {providerNotice && (
              <div className="border border-primary/25 bg-primary/10 p-4 text-sm text-primary">
                {providerNotice}
              </div>
            )}
            <div className="mt-4 flex items-center gap-3 border border-hairline bg-surface-soft p-4">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <p className="text-xs text-charcoal/55">Checkout opens after your file and order details are confirmed.</p>
            </div>
          </div>
        )}

        {/* Step 5: Order Summary + Pay */}
        {step === 5 && (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 font-display text-3xl leading-tight text-ink">Confirm & pay</h2>
            <p className="mb-6 text-sm text-charcoal/68">Review your order details and proceed to payment.</p>

            <div className="mb-2 border border-hairline bg-surface-soft p-6">
              <div className="grid gap-3 text-sm">
                {[
                  ["Document", file?.name],
                  ["Document Type", documentType],
                  ["Target Journal", targetJournal.trim() || "Not provided"],
                  ["Formatting Style", summarizeFormatting(formattingStyle, formattingInstructions)],
                  ["Translation", summarizeTranslation(translationPreference, translationTargetLanguage)],
                  ["Style of English", englishType],
                  ["Services & Turnaround", `${selectedServices.join(", ")} — ${turnaround}`],
                  ["Detected Word Count", wordCount?.toLocaleString()],
                  ["Payment Provider", selectedProviderLabel],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-hairline pb-3">
                    <span className="text-charcoal/60">{label}</span>
                    <span className="text-right font-medium text-ink">{value}</span>
                  </div>
                ))}
                <div className="grid gap-2 pt-2">
                  <div className="flex justify-between gap-4">
                    <span className="text-charcoal/60">Service total</span>
                    <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-charcoal/60">Processing fee ({serviceChargePercentage}%)</span>
                    <span className="font-medium text-ink">${serviceChargeAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-hairline pt-3">
                    <span className="text-lg text-charcoal/80">Total payable</span>
                    <span className="font-display text-xl text-primary">${finalPaymentTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-charcoal/48">Final price is calculated again before checkout.</p>

            {!validation.allowed ? (
              <div className="border border-primary/25 bg-primary/10 p-4 text-sm leading-6 text-primary">
                <p>{validation.message || "This document requires a custom editorial timeline. Please contact our editors for a tailored quote."}</p>
                {validation.contactRequired ? (
                  <a href="/contact" className="mt-3 inline-flex min-h-10 items-center justify-center border border-primary/40 px-4 text-xs uppercase tracking-[0.16em] text-primary">
                    Contact our editors
                  </a>
                ) : null}
              </div>
            ) : null}

            {paymentError && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-300 text-sm flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                <div>
                  <p className="font-medium">Payment Error</p>
                  <p className="mt-1 text-red-300/80">{paymentError}</p>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isSubmitting || checkoutBlocked}
              className="min-h-14 w-full rounded-full bg-cta px-5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(31,143,90,0.18)] transition-all duration-300 hover:bg-cta-active disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Initializing secure payment...
                </span>
              ) : (
                checkoutBlocked ? "Contact our editors" : `Pay $${finalPaymentTotal.toFixed(2)} with ${selectedProviderLabel}`
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between border-t border-hairline pt-6">
        {step > 1 ? (
          <button onClick={() => { setStep(step - 1); setPaymentError(null); }} className="rounded-full border border-hairline px-6 py-3 text-sm text-charcoal/70 transition hover:border-primary hover:text-primary" disabled={isSubmitting}>Back</button>
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
              (step === 4 && (isLoadingPaymentSettings || Boolean(paymentSettingsError) || !hasAvailablePaymentMethods)) ||
              isParsing
            }
            className="rounded-full bg-cta px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(31,143,90,0.16)] transition hover:bg-cta-active disabled:cursor-not-allowed disabled:opacity-50"
          >Continue</button>
        ) : <div />}
      </div>
    </div>
  );
}
