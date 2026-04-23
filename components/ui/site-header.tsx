import Link from "next/link";
import { BUSINESS_NAME, CONTACT_LINKS } from "@/lib/site-data";
import { ThemeSelect } from "@/components/ui/theme-select";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-4">
        <Link className="text-base font-bold tracking-tight text-slate-900 sm:text-lg" href="/">
          {BUSINESS_NAME}
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <Link className="hover:text-slate-900" href="/">
            Home
          </Link>
          <Link className="hover:text-slate-900" href="/about">
            About
          </Link>
          <Link className="hover:text-slate-900" href="/book">
            Book Now
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSelect />
          <Link className="cta-secondary hidden px-4 py-2 text-xs sm:inline-flex" href="/book">
            Book Now
          </Link>
          <a className="cta-primary hidden px-4 py-2 text-xs lg:inline-flex" href={CONTACT_LINKS.call}>
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}
