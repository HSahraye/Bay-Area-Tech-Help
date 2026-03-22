import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  MapPinned,
  Phone,
  Star
} from "lucide-react";
import { CtaButtons } from "@/components/ui/cta-buttons";
import { InfoCard } from "@/components/ui/info-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import {
  BUSINESS_NAME,
  COMMON_ISSUES,
  CONTACT_LINKS,
  FAQS,
  HIGHLIGHTS,
  HOW_IT_WORKS,
  OFFICE_HOURS,
  OFFICE_LOCATION,
  OFFICE_MAPS_LINK,
  PACKAGES,
  PHONE_NUMBER,
  SERVICE_AREA,
  TESTIMONIALS,
  TRUST_POINTS,
  WEBSITE_URL
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | Home Tech Support in the Bay Area`,
  description:
    "Bay Area home tech support with 3 clear packages: Quick Fix, Home Tech Setup, and VIP Home Tech Day. Friendly local service with simple, transparent pricing."
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_NAME,
  description:
    "Friendly home tech support for Bay Area residents with 3 clear package options: Quick Fix, Home Tech Setup, and VIP Home Tech Day.",
  telephone: PHONE_NUMBER,
  areaServed: SERVICE_AREA,
  address: {
    "@type": "PostalAddress",
    streetAddress: "2417 Mariner Square Loop",
    addressLocality: "Alameda",
    addressRegion: "CA",
    postalCode: "94501",
    addressCountry: "US"
  },
  openingHours: ["Mo-Fr 09:00-18:00"],
  hasMap: OFFICE_MAPS_LINK,
  priceRange: "$99-$599",
  serviceType: [
    "Quick Fix package",
    "Home Tech Setup package",
    "VIP Home Tech Day package",
    "General home tech support"
  ],
  url: WEBSITE_URL
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden pb-16 pt-10 sm:pt-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-brand-100/70 to-transparent" />
          <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-floatIn">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                <MapPinned aria-hidden="true" className="h-3.5 w-3.5" />
                Bay Area local service
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Stress-free home tech support for your busy life.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                {BUSINESS_NAME} helps busy professionals, families, older adults, and recent movers
                choose the right level of support fast. Pick one of three clear options: one issue,
                home setup, or a full tech day.
              </p>
              <div className="mt-8">
                <CtaButtons phoneHref={CONTACT_LINKS.call} smsHref={CONTACT_LINKS.text} />
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Call or text <span className="font-semibold text-slate-700">{PHONE_NUMBER}</span>{" "}
                for quick scheduling.
              </p>
            </div>

            <aside className="glass-card animate-floatIn p-6 [animation-delay:120ms] sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">Choose your package</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {PACKAGES.map((pkg) => (
                  <li
                    key={pkg.name}
                    className="flex items-center gap-2 border-b border-slate-100 pb-3 last:border-none last:pb-0"
                  >
                    <CircleCheckBig aria-hidden="true" className="h-4 w-4 text-brand-700" />
                    <span>{pkg.name}</span>
                  </li>
                ))}
              </ul>
              <a href="#packages" className="mt-5 inline-flex items-center text-sm font-semibold text-brand-700">
                Compare packages
                <ChevronRight aria-hidden="true" className="ml-1 h-4 w-4" />
              </a>
            </aside>
          </div>
        </section>

        <section aria-label="Service highlights" className="pb-14">
          <div className="section-shell grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <article key={item.text} className="glass-card flex items-start gap-3 p-5">
                <item.icon aria-hidden="true" className="mt-0.5 h-5 w-5 text-brand-700" />
                <p className="text-sm font-medium text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="packages" className="py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Packages"
              title="One issue, home setup, or a full tech day"
              description="Skip the confusing service menu. Choose the package that matches how much help you need."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <article key={pkg.name} className="glass-card flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{pkg.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {pkg.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2">
                        <CircleCheckBig aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-800">
                    {pkg.supportLine}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600">
              We also help with Wi-Fi, printers, laptops, TVs, email, Zoom, device setup, and more.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {COMMON_ISSUES.map((issue) => (
                <span
                  key={issue}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {issue}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              Quick Fix covers one clearly defined issue. If your visit turns into a larger setup or
              multi-item project, we&apos;ll give you a clear upgrade option before continuing.
            </p>
            <div className="mt-6">
              <CtaButtons phoneHref={CONTACT_LINKS.call} smsHref={CONTACT_LINKS.text} compact />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="How It Works"
              title="Simple, fast, and easy from first text to final fix"
              description="We keep the process clear so you can get back to your day without tech interruptions."
            />
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {HOW_IT_WORKS.map((step) => (
                <li key={step.title} className="glass-card p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <step.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="why-us" className="bg-white py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Trusted support with a premium-but-friendly approach"
              description="You get calm, reliable help from someone who respects your time, your home, and your privacy."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {TRUST_POINTS.map((item) => (
                <InfoCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Testimonials"
              title="What Bay Area clients say"
              description="Real feedback from households who wanted tech support that feels clear and dependable."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial) => (
                <figure key={testimonial.name} className="glass-card p-6">
                  <div className="mb-3 flex gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={`${testimonial.name}-star-${idx}`} aria-hidden="true" className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-6 text-slate-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                    {testimonial.name}
                    <span className="ml-2 text-slate-500">· {testimonial.area}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="service-area" className="bg-white py-16 sm:py-20">
          <div className="section-shell grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Service Area"
                title="Local support across the Bay Area"
                description="Need in-home tech help near work, school, or a new move-in? We provide friendly local service throughout the region."
              />
              <p className="mt-5 text-base leading-7 text-slate-600">
                We currently serve <strong className="font-semibold text-slate-900">{SERVICE_AREA}</strong>.
                If you are just outside this area, text us your ZIP code and we will do our best to
                accommodate.
              </p>
              <div className="mt-6">
                <CtaButtons phoneHref={CONTACT_LINKS.call} smsHref={CONTACT_LINKS.text} compact />
              </div>
              <div className="glass-card mt-6 space-y-3 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Stop by the office
                </p>
                <p className="flex items-start gap-2 text-sm text-slate-700">
                  <Building2 aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                  <span>{OFFICE_LOCATION}</span>
                </p>
                <p className="flex items-start gap-2 text-sm text-slate-700">
                  <Clock3 aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                  <span>{OFFICE_HOURS}</span>
                </p>
                <a
                  className="inline-flex items-center text-sm font-semibold text-brand-700 hover:text-brand-900"
                  href={OFFICE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                  <ChevronRight aria-hidden="true" className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            <aside className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-900">Popular requests this month</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {[
                  "Move-in Wi-Fi and streaming setup",
                  "Home office Zoom and printer fixes",
                  "Computer speed cleanup for remote workers",
                  "New iPhone and laptop setup for families"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CircleCheckBig aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions before booking"
              description="Quick answers to help you schedule confidently."
            />
            <div className="mt-10 space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.question} className="glass-card group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-base font-semibold text-slate-900">
                    {faq.question}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 text-slate-500 transition group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="pb-24 pt-4 sm:pb-16">
          <div className="section-shell">
            <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-soft sm:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                Friendly local support
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Get your home tech working right today.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
                Whether you need one quick fix or full home setup after a move, {BUSINESS_NAME} is
                ready to help. Call or text now and get clear guidance, fast scheduling, and a
                setup that simply works.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a className="cta-primary bg-white text-slate-900 hover:bg-slate-100" href={CONTACT_LINKS.call}>
                  <Phone aria-hidden="true" className="mr-2 h-4 w-4" />
                  Call {PHONE_NUMBER}
                </a>
                <a className="cta-secondary border-white/30 bg-transparent text-white hover:bg-white/10" href={CONTACT_LINKS.text}>
                  Text for same-day availability
                </a>
              </div>
              <p className="mt-3 text-sm text-slate-200">
                Not sure which package fits? Call or text and we&apos;ll guide you.
              </p>
              <p className="mt-4 text-sm text-slate-300">
                Office location: {OFFICE_LOCATION} | Office hours: {OFFICE_HOURS}
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <div className="section-shell flex gap-2 px-0">
          <a className="cta-primary flex-1" href={CONTACT_LINKS.call}>
            Call
          </a>
          <a className="cta-secondary flex-1" href={CONTACT_LINKS.text}>
            Text
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
