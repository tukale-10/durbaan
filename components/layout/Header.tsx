"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Seal, Wordmark } from "@/components/brand/marks";
import { ChevronDown, Close, Menu, WhatsApp } from "@/components/ui/icons";
import { ServicesPanel, type ServicesMenuItem } from "./ServicesMenu";
import { track } from "@/lib/analytics";

type NavItem = { href: string; label: string };

export function Header({ nav, whatsapp, services }: { nav: NavItem[]; whatsapp: string | null; services: ServicesMenuItem[] }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const trigger = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        trigger.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  // Hover opens the menu on mouse devices, with a short grace period so it doesn't flicker.
  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setMenu(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(false), 180);
  };
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
    <header ref={headerRef} className={`sticky top-0 z-50 bg-navy text-white transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(255,255,255,.08)]" : ""}`}>
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
            <li onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
              <button
                ref={trigger}
                type="button"
                aria-expanded={menu}
                aria-controls="services-menu"
                onClick={() => setMenu((m) => !m)}
                className={`flex items-center gap-1 rounded-full px-2.5 py-2 text-[15px] xl:px-3.5 transition-colors hover:text-amber ${menu || isActive("/services") ? "text-amber" : "text-white/85"}`}
              >
                Services
                <ChevronDown width={16} height={16} className={`transition-transform duration-200 ${menu ? "rotate-180" : ""}`} />
              </button>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative rounded-full px-2.5 py-2 text-[15px] xl:px-3.5 transition-colors hover:text-amber ${isActive(n.href) ? "text-amber" : "text-white/85"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden h-11 items-center whitespace-nowrap rounded-full bg-amber px-5 text-[15px] font-semibold text-navy transition-colors hover:bg-[#FFC14D] sm:inline-flex">
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

      {menu && (
        <>
          <div aria-hidden className="menu-fade fixed inset-x-0 bottom-0 top-[72px] -z-10 hidden bg-night/60 backdrop-blur-sm lg:block" onClick={() => setMenu(false)} />
          <div
            id="services-menu"
            onPointerEnter={hoverOpen}
            onPointerLeave={hoverClose}
            className="menu-in absolute inset-x-0 top-full hidden border-t border-white/10 bg-navy shadow-[0_24px_48px_-12px_rgba(8,20,40,.6)] lg:block"
          >
            <ServicesPanel items={services} onNavigate={() => setMenu(false)} />
          </div>
        </>
      )}

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
              <li>
                <Link href="/" className="flex items-center justify-between py-4 font-display text-2xl font-semibold">
                  Home
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  aria-expanded={mobileServices}
                  aria-controls="mobile-services"
                  onClick={() => setMobileServices((v) => !v)}
                  className={`flex w-full items-center justify-between py-4 font-display text-2xl font-semibold ${isActive("/services") ? "text-amber" : ""}`}
                >
                  Services
                  <ChevronDown className={`text-amber transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`} />
                </button>
                {mobileServices && (
                  <ul id="mobile-services" className="menu-in mb-4 grid gap-1">
                    {services.map((p, i) => (
                      <li key={p.id}>
                        <Link href={`/services/${p.id}`} className="flex items-start gap-4 rounded-2xl bg-white/[.05] px-4 py-3.5">
                          <span className="mt-1 font-display text-xs tabular-nums text-amber">{String(i + 1).padStart(2, "0")}</span>
                          <span>
                            <span className="block font-display text-lg font-semibold">{p.name}</span>
                            <span className="block text-sm text-white/60">{p.promise}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/services" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-amber">
                        All services <ChevronDown width={16} height={16} className="-rotate-90" />
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {[...nav, { href: "/films", label: "Films" }, { href: "/resources", label: "Resources" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={`flex items-center justify-between py-4 font-display text-2xl font-semibold ${isActive(n.href) ? "text-amber" : ""}`}>
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
