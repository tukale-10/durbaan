import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./icons";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "ghost-light";
const variants: Record<Variant, string> = {
  primary: "bg-amber text-navy hover:bg-[#FFC14D]",
  secondary: "bg-navy text-white hover:bg-navy-600",
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy",
  "ghost-light": "text-white hover:text-amber",
};

export function Button({
  href, variant = "primary", size = "md", arrow, children, className, external, ...rest
}: {
  href: string; variant?: Variant; size?: "sm" | "md" | "lg"; arrow?: boolean; children: ReactNode; className?: string; external?: boolean;
} & Omit<ComponentProps<"a">, "href">) {
  const cls = cx(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200",
    size === "sm" && "h-10 px-4 text-sm",
    size === "md" && "h-12 px-6 text-[15px]",
    size === "lg" && "h-14 px-7 text-base",
    variants[variant],
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight width={18} height={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  const isExternal = external ?? /^https?:/.test(href);
  if (isExternal) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{inner}</a>;
  return <Link href={href} className={cls} {...(rest as object)}>{inner}</Link>;
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("container", className)}>{children}</div>;
}

type Tone = "white" | "mist" | "navy" | "night" | "cream" | "amber";
const tones: Record<Tone, string> = {
  white: "bg-white text-navy",
  mist: "bg-mist text-navy",
  navy: "bg-navy text-white",
  night: "bg-night text-white",
  cream: "bg-cream text-navy",
  amber: "bg-amber text-navy",
};
export function Section({
  tone = "white", children, className, id, size = "md", ...rest
}: { tone?: Tone; children: ReactNode; className?: string; id?: string; size?: "sm" | "md" | "lg" } & ComponentProps<"section">) {
  return (
    <section id={id} data-tone={tone} className={cx(tones[tone], size === "sm" && "py-14 sm:py-16", size === "md" && "py-20 sm:py-28", size === "lg" && "py-24 sm:py-36", className)} {...rest}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className, tone = "default", dot = true }: { children: ReactNode; className?: string; tone?: "default" | "light" | "amber"; dot?: boolean }) {
  return (
    <p className={cx("eyebrow flex items-center gap-3", tone === "default" && "text-slate", tone === "light" && "text-white/70", tone === "amber" && "text-amber", className)}>
      {dot && <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />}
      {children}
    </p>
  );
}

/** Section heading block: eyebrow, title, optional intro. */
export function Heading({
  eyebrow, title, intro, tone = "dark", align = "left", className, as: As = "h2", size = "t-2",
}: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; tone?: "dark" | "light"; align?: "left" | "center"; className?: string; as?: "h1" | "h2"; size?: "t-1" | "t-2";
}) {
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "default"} className={cx("mb-5", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <As className={size}>{title}</As>
      {intro && <p className={cx("lead mt-6", tone === "light" ? "text-white/75" : "text-slate")}>{intro}</p>}
    </div>
  );
}

export function TagPill({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark" | "amber"; className?: string }) {
  return (
    <span className={cx(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
      tone === "light" && "bg-mist text-navy ring-1 ring-inset ring-line",
      tone === "dark" && "bg-white/10 text-white ring-1 ring-inset ring-white/15",
      tone === "amber" && "bg-amber text-navy",
      className,
    )}>{children}</span>
  );
}

export function SampleBadge({ className }: { className?: string }) {
  return (
    <span className={cx("eyebrow inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-amber px-2.5 py-1 !text-[10px] !tracking-[0.18em] text-navy", className)}>
      Sample content
    </span>
  );
}

/** A thin amber rule followed by a row of rhythm dots, echoing the seal ring. */
export function Rhythm({ className, count = 9 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden className={cx("flex items-center gap-2", className)}>
      <span className="h-px w-10 bg-amber" />
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-amber" style={{ opacity: 1 - i * 0.09 }} />
      ))}
    </div>
  );
}

export function formatUSD(n: number) {
  return n.toLocaleString("en-US");
}
