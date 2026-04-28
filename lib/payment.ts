/**
 * Unified Payment Abstraction Layer
 *
 * Paystack is the only enabled provider today. Flutterwave, Stripe, and PayPal
 * are represented in the registry so the UI and API can expand without a
 * checkout rewrite later.
 *
 * SECURITY: All price calculations happen server-side.
 * NEVER trust frontend-submitted prices or payment success callbacks.
 */

export type PaymentProviderName = "paystack" | "flutterwave" | "stripe" | "paypal";
export type PaymentProviderStatus = "available" | "coming_soon";
export type PaymentStatus = "pending" | "processing" | "paid" | "failed" | "cancelled";

export interface PaymentProviderConfig {
  id: PaymentProviderName;
  label: string;
  description: string;
  methods: string[];
  status: PaymentProviderStatus;
}

export interface InitParams {
  email: string;
  amount: number;
  currency: string;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}

export interface InitResult {
  success: boolean;
  authorizationUrl: string;
  reference: string;
  accessCode?: string;
  raw?: unknown;
}

export interface VerifyResult {
  success: boolean;
  status: "success" | "failed" | "abandoned" | "pending";
  amount: number;
  currency: string;
  reference: string;
  transactionId: string;
  paidAt?: string;
  channel?: string;
  raw?: unknown;
}

export interface WebhookResult {
  valid: boolean;
  event: string;
  reference: string;
  amount: number;
  currency: string;
  transactionId: string;
  raw?: unknown;
}

export interface PaymentProvider {
  initialize(params: InitParams): Promise<InitResult>;
  verify(reference: string): Promise<VerifyResult>;
  validateWebhook(request: Request): Promise<WebhookResult | null>;
}

export class ProviderUnavailableError extends Error {
  constructor(provider: PaymentProviderName) {
    super(`${getProviderConfig(provider).label} is not available yet.`);
    this.name = "ProviderUnavailableError";
  }
}

export const PAYMENT_PROVIDERS: PaymentProviderConfig[] = [
  {
    id: "paystack",
    label: "Paystack",
    description: "Secure checkout for card, bank transfer, USSD, and mobile money.",
    methods: ["Card", "Bank Transfer", "USSD", "Mobile Money"],
    status: "available",
  },
  {
    id: "flutterwave",
    label: "Flutterwave",
    description: "Global and African payment rails.",
    methods: ["Card", "Bank Transfer", "M-Pesa", "Apple Pay"],
    status: "coming_soon",
  },
  {
    id: "stripe",
    label: "Stripe",
    description: "International card and wallet payments.",
    methods: ["Card", "Apple Pay", "Google Pay"],
    status: "coming_soon",
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "PayPal wallet and card checkout.",
    methods: ["PayPal Balance", "Card"],
    status: "coming_soon",
  },
];

export const ACTIVE_PAYMENT_PROVIDER: PaymentProviderName =
  (process.env.PAYMENT_ACTIVE_PROVIDER as PaymentProviderName) || "paystack";

export function isPaymentProviderName(provider: unknown): provider is PaymentProviderName {
  return typeof provider === "string" && PAYMENT_PROVIDERS.some((item) => item.id === provider);
}

export function getProviderConfig(provider: PaymentProviderName): PaymentProviderConfig {
  const config = PAYMENT_PROVIDERS.find((item) => item.id === provider);
  if (!config) throw new Error(`Unknown payment provider: ${provider}`);
  return config;
}

export function isProviderEnabled(provider: PaymentProviderName): boolean {
  return provider === ACTIVE_PAYMENT_PROVIDER && getProviderConfig(provider).status === "available";
}

export function getSafeAppUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const url = new URL(configured);
    if (url.protocol === "https:" || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return url.origin;
    }
  } catch {
    // Fall through to the local development default.
  }

  return "http://localhost:3000";
}

// ─── Pricing Engine (Server-Side Only) ───────────────────────────────────────
export {
  DOCUMENT_TYPES,
  ENGLISH_TYPES,
  FORMATTING_STYLES,
  MAX_AUTOMATIC_WORD_COUNT,
  MINIMUM_ORDER,
  SERVICE_OPTIONS,
  TURNAROUND_OPTIONS,
  calculatePrice,
  calculateServerPrice,
  parseTurnaroundDays,
  validateAutomaticPricing,
  type PriceBreakdown,
  type PricingValidation,
} from "@/lib/pricing";

export function generateReference(prefix = "MEP"): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ─── Paystack Provider ───────────────────────────────────────────────────────

const PAYSTACK_BASE = "https://api.paystack.co";

function getPaystackHeaders(): HeadersInit {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not set");

  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

async function hmacSha512Hex(secret: string, body: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return Array.from(new Uint8Array(signatureBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(left: string, right: string): boolean {
  if (left.length !== right.length) return false;

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

export const PaystackProvider: PaymentProvider = {
  async initialize(params: InitParams): Promise<InitResult> {
    const response = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: getPaystackHeaders(),
      body: JSON.stringify({
        email: params.email,
        amount: params.amount,
        currency: params.currency,
        reference: params.reference,
        callback_url: params.callbackUrl,
        metadata: params.metadata || {},
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      console.error("Paystack init error:", data);
      throw new Error(data.message || "Failed to initialize Paystack transaction");
    }

    return {
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      accessCode: data.data.access_code,
      raw: data,
    };
  },

  async verify(reference: string): Promise<VerifyResult> {
    const response = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: getPaystackHeaders(),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      return {
        success: false,
        status: "failed",
        amount: 0,
        currency: "",
        reference,
        transactionId: "",
        raw: data,
      };
    }

    const txn = data.data;
    return {
      success: txn.status === "success",
      status: txn.status,
      amount: txn.amount,
      currency: txn.currency,
      reference: txn.reference,
      transactionId: String(txn.id),
      paidAt: txn.paid_at,
      channel: txn.channel,
      raw: data,
    };
  },

  async validateWebhook(request: Request): Promise<WebhookResult | null> {
    const signature = request.headers.get("x-paystack-signature");
    if (!signature) return null;

    const body = await request.text();
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;
    if (!secret) return null;

    const computedSignature = await hmacSha512Hex(secret, body);
    if (!timingSafeEqualHex(computedSignature, signature)) {
      console.warn("Paystack webhook signature mismatch");
      return null;
    }

    const payload = safeJsonParse(body) as any;
    if (!payload || payload.event !== "charge.success" || payload.data?.status !== "success") {
      return null;
    }

    const txn = payload.data;
    return {
      valid: true,
      event: payload.event,
      reference: txn.reference,
      amount: txn.amount,
      currency: txn.currency,
      transactionId: String(txn.id),
      raw: payload,
    };
  },
};

// ─── Disabled Future Providers ───────────────────────────────────────────────

function createUnavailableProvider(provider: PaymentProviderName): PaymentProvider {
  return {
    async initialize(): Promise<InitResult> {
      throw new ProviderUnavailableError(provider);
    },
    async verify(): Promise<VerifyResult> {
      throw new ProviderUnavailableError(provider);
    },
    async validateWebhook(): Promise<WebhookResult | null> {
      return null;
    },
  };
}

export const FlutterwaveProvider = createUnavailableProvider("flutterwave");
export const StripeProvider = createUnavailableProvider("stripe");
export const PaypalProvider = createUnavailableProvider("paypal");

export function getProvider(name: PaymentProviderName): PaymentProvider {
  if (!isProviderEnabled(name)) {
    return createUnavailableProvider(name);
  }

  return PaystackProvider;
}
