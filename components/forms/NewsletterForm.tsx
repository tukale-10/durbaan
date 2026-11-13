"use client";
import { useActionState, useEffect } from "react";
import { subscribe, type FormState } from "@/app/actions";
import { track } from "@/lib/analytics";
import { Honeypot } from "./fields";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, { status: "idle" });
  useEffect(() => {
    if (state.status === "success") track("Newsletter Signup");
  }, [state.status]);
  if (state.status === "success") return <p role="status" className="text-amber">Thank you. You are subscribed.</p>;
  return (
    <form action={action} noValidate className="relative">
      <Honeypot />
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 focus-within:ring-amber">
        <input id="nl-email" name="email" type="email" autoComplete="email" placeholder="Your email" className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-white placeholder:text-white/50 focus:outline-none" />
        <button disabled={pending} className="h-11 shrink-0 rounded-full bg-amber px-5 text-sm font-semibold text-navy hover:bg-[#FFC14D] disabled:opacity-60">
          {pending ? "..." : "Subscribe"}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2.5 text-sm text-white/65">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 shrink-0 accent-amber" />
        <span>Yes, email me Durbaan notes. Unsubscribe any time.</span>
      </label>
      {state.status === "error" && <p role="alert" className="mt-2 text-sm text-amber">{state.message}</p>}
    </form>
  );
}
