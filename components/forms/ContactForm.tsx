"use client";
import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact, type FormState } from "@/app/actions";
import { track } from "@/lib/analytics";
import { Check } from "@/components/ui/icons";
import { Field, Honeypot, inputCls, SubmitButton, Turnstile } from "./fields";

const AUDIENCES = ["NGO or program", "Consultancy", "Business", "Corporate or institution", "Other"];
const NEEDS = ["Stories", "Data", "Digital", "Capability", "Not sure"];
const BUDGETS = ["Under 2,500 USD", "2,500 to 10,000 USD", "10,000 to 30,000 USD", "Over 30,000 USD", "Not sure"];

export function ContactForm({ bookingHref, packages }: { bookingHref: string; packages: Record<string, { name: string; audience: string }> }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { status: "idle" });
  const top = useRef<HTMLDivElement>(null);
  const e = state.errors ?? {};
  const params = useSearchParams();
  const pkg = packages[params.get("package") ?? ""];
  const v = state.values ?? {};
  const val = (k: string) => (typeof v[k] === "string" ? (v[k] as string) : "");
  const defaultAudience = val("audience") || params.get("type") || pkg?.audience;
  const defaultMessage = val("message") || (pkg ? `We are interested in the ${pkg.name} package. ` : "");
  const needs = Array.isArray(v.needs) ? v.needs : [];

  useEffect(() => {
    if (state.status === "success") track("Form Submit", { form: "contact" });
    if (state.status !== "idle") top.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={top} tabIndex={-1} className="rounded-card bg-navy p-8 text-white sm:p-12" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-navy"><Check /></span>
        <h3 className="t-3 mt-6">Thank you. Your message is with us.</h3>
        <p className="mt-4 text-white/75">We reply within one working day. A confirmation is on its way to your inbox.</p>
        <a href={bookingHref} className="mt-8 inline-flex h-12 items-center rounded-full bg-amber px-6 font-semibold text-navy">Book a call now instead</a>
      </div>
    );
  }

  return (
    <form key={JSON.stringify(v)} action={action} noValidate className="relative grid gap-6">
      <div ref={top} tabIndex={-1} className="outline-none">
        {state.status === "error" && state.message && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{state.message}</p>
        )}
      </div>
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" error={e.name}>
          <input id="name" name="name" defaultValue={val("name")} autoComplete="name" required aria-invalid={!!e.name} aria-describedby={e.name ? "name-error" : undefined} className={inputCls} />
        </Field>
        <Field label="Email" name="email" error={e.email}>
          <input id="email" name="email" defaultValue={val("email")} type="email" autoComplete="email" required aria-invalid={!!e.email} aria-describedby={e.email ? "email-error" : undefined} className={inputCls} />
        </Field>
        <Field label="Phone or WhatsApp" name="phone" optional>
          <input id="phone" name="phone" defaultValue={val("phone")} type="tel" autoComplete="tel" className={inputCls} placeholder="+252 ..." />
        </Field>
        <Field label="Organization" name="organization" optional>
          <input id="organization" name="organization" defaultValue={val("organization")} autoComplete="organization" className={inputCls} />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">I am a</legend>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map((a) => (
            <label key={a} className="cursor-pointer">
              <input type="radio" name="audience" value={a} defaultChecked={a === defaultAudience} className="peer sr-only" />
              <span className="inline-flex h-11 items-center rounded-full border border-line px-4 text-[15px] transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-amber">{a}</span>
            </label>
          ))}
        </div>
        {e.audience && <p className="mt-1.5 text-sm font-medium text-red-700">{e.audience}</p>}
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">I need help with <span className="font-normal text-slate">(choose any)</span></legend>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <label key={n} className="cursor-pointer">
              <input type="checkbox" name="needs" value={n} defaultChecked={needs.includes(n)} className="peer sr-only" />
              <span className="inline-flex h-11 items-center rounded-full border border-line px-4 text-[15px] transition peer-checked:border-amber peer-checked:bg-amber peer-checked:text-navy peer-focus-visible:ring-2 peer-focus-visible:ring-navy">{n}</span>
            </label>
          ))}
        </div>
        {e.needs && <p className="mt-1.5 text-sm font-medium text-red-700">{e.needs}</p>}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Budget range" name="budget" error={e.budget}>
          <select id="budget" name="budget" defaultValue={val("budget")} aria-invalid={!!e.budget} className={inputCls}>
            <option value="" disabled>Choose a range</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Timeline" name="timeline" optional>
          <input id="timeline" name="timeline" defaultValue={val("timeline")} className={inputCls} placeholder="For example: by March, or before our donor visit" />
        </Field>
      </div>

      <Field label="Tell us about your project" name="message" error={e.message}>
        <textarea id="message" name="message" rows={5} defaultValue={defaultMessage} aria-invalid={!!e.message} className={inputCls} placeholder="What you do, what you need, and who needs to see it." />
      </Field>

      <label className="flex items-start gap-3 text-[15px]">
        <input type="checkbox" name="consent" defaultChecked={val("consent") === "on"} className="mt-1 h-5 w-5 shrink-0 rounded border-line accent-navy" />
        <span>I agree that Durbaan may store these details to reply to my enquiry. See our <a href="/privacy" className="underline decoration-amber decoration-2 underline-offset-4">privacy policy</a>.</span>
      </label>
      {e.consent && <p className="-mt-4 text-sm font-medium text-red-700">{e.consent}</p>}

      <Turnstile />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending}>Send message</SubmitButton>
        <p className="text-sm text-slate">We reply within one working day.</p>
      </div>
    </form>
  );
}
