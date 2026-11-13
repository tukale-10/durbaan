"use client";
type EventName = "Form Submit" | "Guide Download" | "WhatsApp Click" | "Booking Click" | "Film Play" | "Newsletter Signup";
declare global {
  interface Window { plausible?: (e: string, o?: { props?: Record<string, string> }) => void }
}
export function track(event: EventName, props?: Record<string, string>) {
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {}
}
