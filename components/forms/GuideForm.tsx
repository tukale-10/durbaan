"use client";
import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { requestGuide, type FormState } from "@/app/actions";
import { track } from "@/lib/analytics";
import { Check } from "@/components/ui/icons";
import { cx } from "@/components/ui/primitives";
import { Field, Honeypot, inputCls, SubmitButton, Turnstile } from "./fields";

/** Full gated form for the guide landing page (name, email, organization, role). */
export function GuideForm({ bookingHref, tone = "light" }: { bookingHref: string; tone?: "light" | "amber" }) {
  const [state, action, pending] = useActionState<FormState, FormData>(requestGuide, { status: "idle" });
  const e = state.errors ?? {};
  const urlEmail = useSearchParams().get("email") ?? "";
  const v = (state.values ?? {}) as Record<string, string>;
  useEffect(() => {
    if (state.status === "success") track("Guide Download");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-card bg-navy p-8 text-white" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-navy"><Check /></span>
        <h3 className="t-3 mt-6">{state.message === "sent" ? "Check your inbox." : "Thank you. You are on the list."}</h3>
        <p className="mt-3 text-white/75">
          {state.message === "sent"
            ? "The guide is on its way. While you read, you can book a free 30 minute donor-readiness call."
            : "We will email you the guide shortly. In the meantime, you can book a free 30 minute donor-readiness call."}
        </p>
        <a href={bookingHref} className="mt-6 inline-flex h-12 items-center rounded-full bg-amber px-6 font-semibold text-navy">Book a free call</a>
      </div>
    );
  }

  return (
    <form key={JSON.stringify(v)} action={action} noValidate className={cx("relative grid gap-5 rounded-card p-6 sm:p-8", tone === "light" ? "bg-white shadow-[0_30px_60px_-30px_rgba(14,31,61,.35)] ring-1 ring-line" : "bg-white")}>
      <Honeypot />
      {state.status === "error" && state.message && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{state.message}</p>}
      <Field label="Name" name="g-name" error={e.name}>
        <input id="g-name" name="name" defaultValue={v.name} autoComplete="name" aria-invalid={!!e.name} className={inputCls} />
      </Field>
      <Field label="Work email" name="g-email" error={e.email}>
        <input id="g-email" name="email" type="email" defaultValue={v.email ?? urlEmail} autoComplete="email" aria-invalid={!!e.email} className={inputCls} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organization" name="g-org" error={e.organization}>
          <input id="g-org" name="organization" defaultValue={v.organization} autoComplete="organization" aria-invalid={!!e.organization} className={inputCls} />
        </Field>
        <Field label="Role" name="g-role" error={e.role}>
          <input id="g-role" name="role" defaultValue={v.role} autoComplete="organization-title" aria-invalid={!!e.role} className={inputCls} />
        </Field>
      </div>
      <label className="flex items-start gap-3 text-[15px]">
        <input type="checkbox" name="consent" defaultChecked={v.consent === "on"} className="mt-1 h-5 w-5 shrink-0 accent-navy" />
        <span>Send me the guide. Durbaan may store these details to do so.</span>
      </label>
      {e.consent && <p className="-mt-3 text-sm font-medium text-red-700">{e.consent}</p>}
      <label className="flex items-start gap-3 text-[15px] text-slate">
        <input type="checkbox" name="newsletter" defaultChecked={v.newsletter === "on"} className="mt-1 h-5 w-5 shrink-0 accent-navy" />
        <span>Also send me occasional notes on impact communications. Unsubscribe any time.</span>
      </label>
      <Turnstile />
      <SubmitButton pending={pending} className="w-full">Get the guide</SubmitButton>
    </form>
  );
}
