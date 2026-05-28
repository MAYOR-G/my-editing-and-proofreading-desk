"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export function TawkWidget() {
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
      if (process.env.NODE_ENV === "development") {
        console.warn("tawk.to skipped: NEXT_PUBLIC_TAWK_PROPERTY_ID or NEXT_PUBLIC_TAWK_WIDGET_ID is missing.");
      }
      return;
    }

    const scriptId = "tawk-to-widget";
    if (document.getElementById(scriptId)) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
