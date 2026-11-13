"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Seal, Wordmark } from "@/components/brand/marks";
import { Close, Menu, WhatsApp } from "@/components/ui/icons";
import { track } from "@/lib/analytics";

type NavItem = { href: string; label: string };

export function Header({ nav, whatsapp }: { nav: NavItem[]; whatsapp: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`sticky top-0 z-50 bg-navy text-white transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(255,255,255,.08)]" : ""}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Durbaan home">
          <Seal className="h-10 w-10" title="" aria-hidden />
          <Wordmark className="h-[22px] w-auto text-white" title="" aria-hidden />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[15px] transition-colors hover:text-amber ${isActive(n.href) ? "text-amber" : "text-white/85"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden h-11 items-center rounded-full bg-amber px-5 text-[15px] font-semibold text-navy transition-colors hover:bg-[#FFC14D] sm:inline-flex">
            Start a project
          </Link>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("WhatsApp Click", { path: pathname })}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 lg:hidden"
              aria-label="Message Durbaan on WhatsApp"
            >
              <WhatsApp />
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-navy">
          <div className="container flex h-[72px] items-center justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label="Durbaan home">
              <Seal className="h-10 w-10" title="" aria-hidden />
              <Wordmark className="h-[22px] w-auto text-white" title="" aria-hidden />
            </Link>
            <button type="button" autoFocus onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10" aria-label="Close menu">
              <Close />
            </button>
          </div>
          <nav aria-label="Mobile" className="container flex-1 pt-6">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/services", label: "Services" }, { href: "/films", label: "Films" }, { href: "/resources", label: "Resources" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={`flex items-center justify-between py-4 font-display text-2xl font-semibold ${isActive(n.href) && n.href !== "/" ? "text-amber" : ""}`}>
                    {n.label}
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container grid gap-3 pb-10 pt-8">
            <Link href="/contact" className="flex h-14 items-center justify-center rounded-full bg-amber font-semibold text-navy">Start a project</Link>
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/30 font-semibold">
                <WhatsApp /> WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
