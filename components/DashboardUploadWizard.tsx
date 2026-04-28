"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PAYMENT_PROVIDERS, type PaymentProviderName } from "@/lib/payment";
import {
  DOCUMENT_TYPES,
  ENGLISH_TYPES,
  FORMATTING_STYLES,
  SERVICE_OPTIONS,
  TURNAROUND_OPTIONS,
  calculatePrice,
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

export function DashboardUploadWizard({ userId, userEmail, userName }: WizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [documentType, setDocumentType] = useState("Academic Paper");
  const [formattingStyle, setFormattingStyle] = useState("APA");
  const [englishType, setEnglishType] = useState("No preference");
  const [academicField, setAcademicField] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [service, setService] = useState("Editing");
  const [turnaroundDays, setTurnaroundDays] = useState(14);

  // Payment state
  const [provider, setProvider] = useState<PaymentProviderName>("paystack");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [providerNotice, setProviderNotice] = useState<string | null>(null);

  const priceBreakdown = wordCount ? calculatePrice(wordCount, service, turnaroundDays) : null;
  const price = priceBreakdown?.finalPrice ?? 0;
  const turnaround = priceBreakdown?.turnaroundLabel ?? "14 days";
  const validation: PricingValidation = wordCount ? validateAutomaticPricing(wordCount, turnaroundDays) : { allowed: true };
  const checkoutBlocked = !validation.allowed;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setIsParsing(true);
    setWordCount(null);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await fetch("/api/parse-document", { method: "POST", body: formData });
      const data = await res.json();
      if (data.wordCount) setWordCount(data.wordCount);
      else alert(data.error || "Failed to parse document");
    } catch { alert("Error uploading file."); }
    finally { setIsParsing(false); }
  };

  const handlePayment = async () => {
    if (!file || !wordCount) return;
    if (checkoutBlocked) {
      setPaymentError(validation.message || "This document requires a custom editorial timeline. Please contact our editors for a tailored quote.");
      return;
    }
    if (provider !== "paystack") {
      setProviderNotice("This payment option will be available soon.");
      return;
    }

    setIsSubmitting(true);
    setPaymentError(null);
    setProviderNotice(null);

    try {
      // 1. Upload file to Supabase Storage
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      const filePath = `${userId}/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, file);
      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        throw new Error("We could not prepare your order. Please try again or contact support.");
      }

      // 2. Initialize payment (server calculates price)
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          service_type: service,
          turnaround,
          word_count: wordCount,
          file_path: filePath,
          title: file.name,
          client_notes: [academicField ? `Field / industry: ${academicField}` : "", notes].filter(Boolean).join("\n\n"),
          document_type: documentType,
          formatting_style: formattingStyle,
          english_type: englishType,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("Checkout initialization failed:", {
          status: res.status,
          code: data.code,
          error: data.error,
        });

        if (data.code === "checkout_setup_required") {
          throw new Error("Checkout setup needs a quick database update before payment can continue. Please contact support.");
        }

        if (data.code === "payment_provider_failed") {
          throw new Error("We could not start secure checkout. Please try again or contact support.");
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
    <div className="mb-8 flex justify-between items-center border-b border-ivory/10 pb-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s ? "bg-gold text-ink shadow-[0_0_20px_rgba(176,138,60,0.3)]" : "bg-ivory/10 text-ivory/40"}`}>
            {step > s ? "✓" : s}
          </div>
          {s < totalSteps && <div className={`h-px w-8 sm:w-14 transition-colors duration-300 ${step > s ? "bg-gold" : "bg-ivory/10"}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="border border-ink/10 bg-ink p-6 sm:p-10 text-ivory max-w-4xl mx-auto shadow-2xl">
      <p className="text-xs uppercase tracking-[0.24em] text-gold mb-4">New Project Submission</p>
      {renderStepIndicator()}

      <div className="min-h-[400px]">
        {/* Step 1: Project Details */}
        {step === 1 && (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl leading-tight text-ivory mb-2">Project Details</h2>
            <p className="text-ivory/60 text-sm mb-4">Tell us about the document to ensure the right editorial fit.</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="grid gap-2 text-sm text-ivory/70">Document Type
                <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="min-h-12 border border-ivory/15 bg-ivory/5 px-4 text-ivory [&>option]:text-ink">
                  {DOCUMENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-ivory/70">Formatting Style
                <select value={formattingStyle} onChange={(e) => setFormattingStyle(e.target.value)} className="min-h-12 border border-ivory/15 bg-ivory/5 px-4 text-ivory [&>option]:text-ink">
                  {FORMATTING_STYLES.map((style) => <option key={style} value={style}>{style}</option>)}
                </select>
              </label>
            </div>
            <label className="grid gap-2 text-sm text-ivory/70">English Type
              <select value={englishType} onChange={(e) => setEnglishType(e.target.value)} className="min-h-12 border border-ivory/15 bg-ivory/5 px-4 text-ivory [&>option]:text-ink">
                {ENGLISH_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-ivory/70">Academic Field / Industry
              <input value={academicField} onChange={(e) => setAcademicField(e.target.value)} type="text" placeholder="e.g. Sociology, Tech Startup" className="min-h-12 border border-ivory/15 bg-ivory/5 px-4 text-ivory" />
            </label>
            <label className="grid gap-2 text-sm text-ivory/70">Editorial Notes
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Specific concerns, tone preferences, or areas to focus on..." className="min-h-32 border border-ivory/15 bg-ivory/5 p-4 text-ivory" />
            </label>
          </div>
        )}

        {/* Step 2: Upload */}
        {step === 2 && (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl leading-tight text-ivory mb-2">Upload Document</h2>
            <p className="text-ivory/60 text-sm mb-4">We will securely extract the word count to calculate your exact rate.</p>
            <div className="border-2 border-dashed border-ivory/20 bg-ivory/5 p-10 text-center relative hover:bg-ivory/10 transition">
              <input type="file" accept=".docx,.txt" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="grid gap-3 justify-items-center pointer-events-none">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <p className="text-lg font-medium text-ivory">{file ? file.name : "Click or drag file here"}</p>
                <p className="text-sm text-ivory/50">Supports .docx and .txt files</p>
              </div>
            </div>
            {isParsing && <div className="p-4 bg-gold/10 text-gold border border-gold/20 text-center animate-pulse">Extracting text and calculating word count...</div>}
            {wordCount !== null && (
              <div className="bg-ivory/10 p-6 border border-ivory/20 flex justify-between items-center">
                <div><p className="text-xs uppercase tracking-widest text-gold mb-1">Confirmed Length</p><p className="text-3xl font-display">{wordCount.toLocaleString()} words</p></div>
                <div className="h-12 w-12 bg-gold/20 flex items-center justify-center rounded-full text-gold">✓</div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Service & Turnaround */}
        {step === 3 && (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl leading-tight text-ivory mb-2">Service & Turnaround</h2>
            <p className="text-ivory/60 text-sm mb-4">Select your required timeline and service level.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm text-ivory/70">Service Level
                  <select value={service} onChange={(e) => setService(e.target.value)} className="min-h-12 border border-ivory/15 bg-ivory/5 px-4 text-ivory [&>option]:text-ink">
                    {SERVICE_OPTIONS.map((option) => <option key={option.label} value={option.label}>{option.label}</option>)}
                  </select>
                </label>
                <div className="grid gap-3 text-sm text-ivory/70">
                  <div className="flex items-center justify-between gap-4">
                    <span>Turnaround Time</span>
                    <span className="text-gold">{turnaround}</span>
                  </div>
                  <input
                    aria-label="Turnaround time"
                    type="range"
                    min={1}
                    max={28}
                    step={1}
                    value={turnaroundDays}
                    onChange={(event) => setTurnaroundDays(Number(event.target.value))}
                    className="w-full accent-[#b08a3c]"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 7, 14, 21, 28].map((days) => {
                      const option = TURNAROUND_OPTIONS.find((item) => item.days === days)!;
                      return (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setTurnaroundDays(days)}
                          className={`min-h-10 border px-2 text-xs transition ${turnaroundDays === days ? "border-gold bg-gold/12 text-gold" : "border-ivory/15 bg-ivory/5 text-ivory/65 hover:border-gold/50"}`}
                        >
                          {option.label.replace(" / 28 days", "")}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-ivory/45">Maximum automatic turnaround is 4 weeks / 28 days. Please contact our editors for a custom timeline if you need longer.</p>
                </div>
              </div>
              <div className="border border-gold/30 bg-gold/5 p-6 flex flex-col justify-center items-center text-center">
                <p className="text-sm text-ivory/60 mb-2">Estimated Total</p>
                <p className="text-5xl font-display text-gold">${price.toFixed(2)}</p>
                <p className="text-xs text-ivory/40 mt-4">Based on {wordCount?.toLocaleString()} words and your selected timeline.</p>
                {!validation.allowed ? (
                  <div className="mt-4 border border-gold/25 bg-gold/10 p-4 text-sm leading-6 text-gold">
                    {validation.message}
                    {validation.contactRequired ? (
                      <a href="/contact" className="mt-3 inline-flex min-h-10 items-center justify-center border border-gold/40 px-4 text-xs uppercase tracking-[0.16em] text-gold">
                        Contact our editors
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
            <h2 className="font-display text-3xl leading-tight text-ivory mb-2">Select Payment Method</h2>
            <p className="text-ivory/60 text-sm mb-6">Paystack is available now. Additional providers are being prepared for future checkout options.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {PAYMENT_PROVIDERS.map((info) => {
                const isAvailable = info.status === "available" && info.id === "paystack";
                const isSelected = provider === info.id;

                return (
                <button
                  key={info.id}
                  type="button"
                  aria-disabled={!isAvailable}
                  onClick={() => {
                    if (!isAvailable) {
                      setProviderNotice("This payment option will be available soon.");
                      return;
                    }

                    setProvider(info.id);
                    setProviderNotice(null);
                  }}
                  className={`group relative border p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-gold bg-gold/10 shadow-[0_0_30px_rgba(176,138,60,0.15)]"
                      : isAvailable
                        ? "border-ivory/15 bg-ivory/5 hover:border-ivory/30 hover:bg-ivory/8"
                        : "cursor-not-allowed border-ivory/10 bg-ivory/[0.025] opacity-55"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 h-6 w-6 bg-gold rounded-full flex items-center justify-center">
                      <svg className="h-3.5 w-3.5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                  {!isAvailable && (
                    <span className="absolute right-4 top-4 border border-ivory/15 bg-ink px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/60">
                      Coming Soon
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center border text-sm font-bold ${isSelected ? "border-gold bg-gold text-ink" : "border-ivory/10 bg-ivory/10 text-ivory/60"}`}>
                      {PROVIDER_INITIALS[info.id]}
                    </div>
                    <div>
                      <p className={`font-semibold text-lg ${isSelected ? "text-gold" : "text-ivory"}`}>{info.label}</p>
                      <p className="text-xs text-ivory/50">{info.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {info.methods.map((m) => (
                      <span key={m} className={`border px-2 py-1 text-xs ${isSelected ? "border-gold/30 text-gold/80" : "border-ivory/10 text-ivory/40"}`}>{m}</span>
                    ))}
                  </div>
                </button>
              )})}
            </div>
            {providerNotice && (
              <div className="border border-gold/25 bg-gold/10 p-4 text-sm text-gold">
                {providerNotice}
              </div>
            )}
            <div className="flex items-center gap-3 mt-4 p-4 border border-ivory/10 bg-ivory/[0.03]">
              <svg className="h-5 w-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <p className="text-xs text-ivory/50">Your payment is processed securely. We never store your card details. All transactions are verified server-side before your order is confirmed.</p>
            </div>
          </div>
        )}

        {/* Step 5: Order Summary + Pay */}
        {step === 5 && (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl leading-tight text-ivory mb-2">Confirm & Pay</h2>
            <p className="text-ivory/60 text-sm mb-6">Review your order details and proceed to secure payment.</p>

            <div className="border border-ivory/10 bg-ivory/5 p-6 mb-2">
              <div className="grid gap-3 text-sm">
                {[
                  ["Document", file?.name],
                  ["Document Type", documentType],
                  ["Formatting Style", formattingStyle],
                  ["English Type", englishType],
                  ["Service & Turnaround", `${service} — ${turnaround}`],
                  ["Word Count", wordCount?.toLocaleString()],
                  ["Payment Provider", PAYMENT_PROVIDERS.find((item) => item.id === provider)?.label || "Paystack"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-ivory/10 pb-3">
                    <span className="text-ivory/60">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2">
                  <span className="text-ivory/80 text-lg">Total Due</span>
                  <span className="text-gold font-display text-xl">${price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-ivory/40 text-center">Final price is calculated and verified server-side before secure checkout.</p>

            {!validation.allowed ? (
              <div className="border border-gold/25 bg-gold/10 p-4 text-sm leading-6 text-gold">
                <p>{validation.message || "This document requires a custom editorial timeline. Please contact our editors for a tailored quote."}</p>
                {validation.contactRequired ? (
                  <a href="/contact" className="mt-3 inline-flex min-h-10 items-center justify-center border border-gold/40 px-4 text-xs uppercase tracking-[0.16em] text-gold">
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
              className="w-full min-h-14 bg-gold px-5 text-base text-ink font-semibold transition-all duration-300 hover:bg-ivory hover:shadow-[0_0_40px_rgba(176,138,60,0.2)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Initializing secure payment...
                </span>
              ) : (
                checkoutBlocked ? "Contact our editors" : `Pay $${price.toFixed(2)} with ${PAYMENT_PROVIDERS.find((item) => item.id === provider)?.label || "Paystack"}`
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-ivory/10 flex justify-between">
        {step > 1 ? (
          <button onClick={() => { setStep(step - 1); setPaymentError(null); }} className="px-6 py-3 border border-ivory/20 text-sm text-ivory hover:bg-ivory/10 transition" disabled={isSubmitting}>Back</button>
        ) : <div />}
        {step < totalSteps ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={(step === 2 && wordCount === null) || (step === 3 && checkoutBlocked) || isParsing}
            className="px-8 py-3 bg-ivory text-ink text-sm font-semibold hover:bg-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >Continue</button>
        ) : <div />}
      </div>
    </div>
  );
}
