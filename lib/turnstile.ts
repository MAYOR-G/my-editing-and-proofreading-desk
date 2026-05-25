export type TurnstileVerificationResult = {
  success: boolean;
  error?: string;
};

export function isTurnstileRequired() {
  return process.env.NODE_ENV === "production";
}

export async function verifyTurnstileToken(token: string | null | undefined, remoteIp?: string | null): Promise<TurnstileVerificationResult> {
  if (!isTurnstileRequired()) {
    return { success: true };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Turnstile secret is missing in production.");
    return { success: false, error: "Security verification is not configured. Please contact support." };
  }

  if (!token) {
    return { success: false, error: "Please complete the security check before continuing." };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const result = await response.json() as { success?: boolean; "error-codes"?: string[] };

    if (!result.success) {
      console.warn("Turnstile verification failed:", result["error-codes"] || "unknown_error");
      return { success: false, error: "Security verification failed. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    return { success: false, error: "Security verification failed. Please try again." };
  }
}
