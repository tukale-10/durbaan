"use client";
import Script from "next/script";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/primitives";

export const inputCls =
  "block w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[16px] text-navy placeholder:text-slate/70 transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-amber aria-[invalid=true]:border-red-600";

export function Field({ label, name, error, hint, children, optional }: { label: string; name: string; error?: string; hint?: string; children: ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label} {optional && <span className="font-normal text-slate">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-sm text-slate">{hint}</p>}
      {error && <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

export function Turnstile() {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!key) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={key} data-theme="light" />
    </>
  );
}

export function SubmitButton({ pending, children, className }: { pending: boolean; children: ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cx("inline-flex h-14 items-center justify-center gap-2 rounded-full bg-navy px-8 font-semibold text-white transition hover:bg-navy-600 disabled:opacity-60", className)}
    >
      {pending ? "Sending..." : children}
    </button>
  );
}
