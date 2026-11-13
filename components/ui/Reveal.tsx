"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Small scroll reveal. Content is visible without JS and with reduced motion. */
export function Reveal({ children, className = "", delay = 0, as: As = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) return; // already in view: no animation
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <As ref={ref as any} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </As>
  );
}
