"use client";

import { useEffect } from "react";

const TAWK_PROPERTY_ID = "6a2154b86d77da1c401dcf9f";
const TAWK_WIDGET_ID = "1jq93635o";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export function TawkWidget() {
  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return;
    }

    const propertyId = TAWK_PROPERTY_ID;
    const widgetId = TAWK_WIDGET_ID;

    const scriptId = "tawk-to-widget";
    if (document.getElementById(scriptId)) return;

    const loadWidget = () => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();

      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    };

    const timeout = window.setTimeout(loadWidget, document.readyState === "complete" ? 1200 : 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return null;
}
