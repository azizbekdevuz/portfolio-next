"use client";

import { useState, type ReactNode } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useI18n } from "@/components/i18n/I18nProvider";

export function I18nErrorBoundary({ children }: { children: ReactNode }) {
  const { messages } = useI18n();
  const e = messages.errorBoundary;
  const [resetKey, setResetKey] = useState(0);

  return (
    <ErrorBoundary
      key={resetKey}
      fallback={
        <div className="p-8 text-center">
          <h2 className="mb-4 text-2xl text-red-500">{e.title}</h2>
          <p className="mb-4 text-muted">{e.body}</p>
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            className="rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
          >
            {e.retry}
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
