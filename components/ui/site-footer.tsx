import Link from "next/link";
import { BUSINESS_NAME, SUPPORT_EMAIL, SUPPORT_EMAIL_GMAIL_LINK } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="section-shell flex flex-col gap-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-slate-900">{BUSINESS_NAME}</span> - Home tech support
          in the Bay Area.
        </p>
        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-slate-900" href="/">
            Home
          </Link>
          <Link className="hover:text-slate-900" href="/about">
            About
          </Link>
          <a
            className="hover:text-slate-900"
            href={SUPPORT_EMAIL_GMAIL_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SUPPORT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  );
}
