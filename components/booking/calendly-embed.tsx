"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const CALENDLY_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

type CalendlyEmbedProps = {
  eventUrl: string;
  serviceName: string;
};

export function CalendlyEmbed({ eventUrl, serviceName }: CalendlyEmbedProps) {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initTimerRef = useRef<number | null>(null);

  const fallbackLabel = useMemo(() => `Open ${serviceName} booking page`, [serviceName]);

  useEffect(() => {
    const existingScript = document.getElementById(CALENDLY_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.Calendly) {
        setIsScriptReady(true);
      } else {
        existingScript.addEventListener("load", () => setIsScriptReady(true), { once: true });
        existingScript.addEventListener("error", () => setHasError(true), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = CALENDLY_SCRIPT_ID;
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setIsScriptReady(true);
    script.onerror = () => setHasError(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isScriptReady || !containerRef.current) {
      return;
    }

    setHasError(false);
    containerRef.current.innerHTML = "";

    if (!window.Calendly) {
      setHasError(true);
      return;
    }

    try {
      window.Calendly.initInlineWidget({
        url: eventUrl,
        parentElement: containerRef.current,
        resize: true
      });

      initTimerRef.current = window.setTimeout(() => {
        const hasIframe = Boolean(containerRef.current?.querySelector("iframe"));
        if (!hasIframe) {
          setHasError(true);
        }
      }, 5000);
    } catch {
      setHasError(true);
    }

    return () => {
      if (initTimerRef.current) {
        window.clearTimeout(initTimerRef.current);
      }
    };
  }, [eventUrl, isScriptReady]);

  return (
    <section aria-label={`${serviceName} booking calendar`} className="glass-card p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Choose a time for {serviceName}</h2>
      </div>

      {!isScriptReady && (
        <div
          aria-live="polite"
          className="flex min-h-[620px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600"
        >
          Loading secure booking scheduler...
        </div>
      )}

      <div
        ref={containerRef}
        className={`${isScriptReady ? "block" : "hidden"} min-h-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white`}
      />

      {hasError && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">The embedded scheduler did not load.</p>
          <p className="mt-1">You can continue booking directly in Calendly:</p>
          <a
            className="cta-secondary mt-3"
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fallbackLabel}
          >
            {fallbackLabel}
          </a>
        </div>
      )}
    </section>
  );
}
