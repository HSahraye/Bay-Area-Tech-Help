"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageSquare, PhoneCall, X } from "lucide-react";
import { BUSINESS_NAME, CONTACT_LINKS } from "@/lib/site-data";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between gap-3">
        <Link className="shrink-0 text-base font-bold tracking-tight text-slate-900 sm:text-lg" href="/">
          {BUSINESS_NAME}
        </Link>

        <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-700">
            <Link className="transition hover:text-slate-900" href="/">
              Home
            </Link>
            <Link className="transition hover:text-slate-900" href="/about">
              About
            </Link>
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            href={CONTACT_LINKS.call}
          >
            <PhoneCall aria-hidden="true" className="h-4 w-4" />
            Call or Text
          </a>
          <Link className="cta-primary px-4 py-2 text-sm" href="/book">
            Book Now
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link className="cta-primary px-3.5 py-2 text-xs" href="/book">
            Book Now
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav aria-label="Mobile navigation" className="section-shell space-y-2 py-3">
            <Link
              className="block rounded-lg px-2 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              href="/"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              className="block rounded-lg px-2 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              href="/about"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a className="cta-secondary px-3 py-2 text-xs" href={CONTACT_LINKS.call}>
                <PhoneCall aria-hidden="true" className="mr-1.5 h-4 w-4" />
                Call
              </a>
              <a className="cta-secondary px-3 py-2 text-xs" href={CONTACT_LINKS.text}>
                <MessageSquare aria-hidden="true" className="mr-1.5 h-4 w-4" />
                Text
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
