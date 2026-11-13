"use client";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

/** External link that records a conversion event (WhatsApp, booking) before navigating. */
export function TrackedLink({ event, ...props }: ComponentProps<"a"> & { event: "WhatsApp Click" | "Booking Click" }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { path: window.location.pathname });
        props.onClick?.(e);
      }}
    />
  );
}
