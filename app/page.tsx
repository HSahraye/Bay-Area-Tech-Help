import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  MapPin,
  MapPinned,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Star
} from "lucide-react";
import { CtaButtons } from "@/components/ui/cta-buttons";
import { InfoCard } from "@/components/ui/info-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import {
  BUSINESS_NAME,
  CONTACT_LINKS,
  OFFICE_HOURS,
  OFFICE_LOCATION,
  OFFICE_MAPS_LINK,
  PHONE_NUMBER,
  SERVICE_AREA,
  WEBSITE_URL
} from "@/lib/site-data";
import { BOOKING_SERVICES, getBookingPathByServiceName } from "@/lib/booking-services";

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | Home Tech Support in the Bay Area`,
  description:
    "Bay Area home tech support with 3 clear packages: Quick Fix, Home Tech Setup, and VIP Home Tech Day. Friendly local service with simple, transparent pricing."
};

// HOMEPAGE CONTENT EDIT GUIDE:
// Update these constants to change most homepage text and cards.
const HOME_PACKAGES = [
  {
    name: "Quick Fix",
    price: "$99",
    description: "Fast help for one issue.",
    examples: ["Printer offline", "Email setup", "Zoom trouble", "TV app login", "Slow laptop", "Basic Wi-Fi issue"],
    supportLine: "Best for one problem, one visit, quick resolution."
  },
  {
    name: "Home Tech Setup",
    price: "$199 to $299",
    description: "For homes that need multiple devices set up and working together.",
    examples: [
      "Wi-Fi setup",
      "Printer connection",
      "Smart TV setup",
      "Laptop and phone setup",
      "Device syncing",
      "Basic home office setup"
    ],
    supportLine: "Best for movers, families, and new home setups."
  },
  {
    name: "VIP Home Tech Day",
    price: "$399 to $599",
    description: "2-4 hours onsite. We fix your whole list in one visit.",
    examples: [
      "Multiple tech issues in one home",
      "New move-in setup",
      "Slow devices",
      "Wi-Fi, printers, TVs, and phones",
      "Whole-home troubleshooting"
    ],
    supportLine: "Best for busy professionals, families, and older adults who want everything handled at once."
  }
] as const;

const HOME_COMMON_ISSUES = [
  "Wi-Fi problems",
  "Printer setup",
  "Laptop cleanup",
  "Smart TV setup",
  "Email help",
  "Zoom support",
  "Device setup"
] as const;

const HOME_HIGHLIGHTS = [
  { icon: Users, text: "Trusted by busy professionals, families, older adults, and recent movers" },
  { icon: MapPin, text: "Locally focused home tech support across the Bay Area" },
  { icon: CheckCircle2, text: "Clear pricing with no surprise add-ons" }
] as const;

const HOME_HOW_IT_WORKS = [
  {
    icon: MessageSquare,
    title: "1) Reach out in minutes",
    description: "Call or text what you need help with. We will reply quickly and suggest the best visit window."
  },
  {
    icon: MapPin,
    title: "2) In-home or remote support",
    description: "Choose convenient on-site support in the Bay Area or remote help for simple fixes."
  },
  {
    icon: CheckCircle2,
    title: "3) Fixed and explained clearly",
    description: "We solve the issue, then walk you through what changed so your setup stays easy to use."
  }
] as const;

const HOME_TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Respectful and privacy-focused",
    description: "Your data and home are treated with care, discretion, and professionalism."
  },
  {
    icon: Clock3,
    title: "Fast local response",
    description: "Same-day and next-day appointments are often available across the Bay Area."
  },
  {
    icon: Sparkles,
    title: "Patient, plain-English support",
    description: "No jargon, no pressure. Just clear help you can feel confident using."
  },
  {
    icon: Wrench,
    title: "One trusted contact",
    description: "From setup to troubleshooting, one reliable expert handles your home tech needs."
  }
] as const;

const HOME_TESTIMONIALS = [
  {
    quote: "Our Wi-Fi finally works in every room, and the printer setup took less than an hour. Super smooth.",
    name: "Priya M.",
    area: "Walnut Creek"
  },
  {
    quote: "We moved and had a pile of tech to set up. Everything was connected same day, including TVs and Zoom.",
    name: "Daniel R.",
    area: "San Francisco"
  },
  {
    quote: "Patient and kind support for my parents. They can now use email and video calls without stress.",
    name: "Carolyn T.",
    area: "Berkeley"
  }
] as const;

const HOME_FAQS = [
  {
    question: "How do I choose the right package?",
    answer:
      "Start with Quick Fix for one clearly defined issue, Home Tech Setup for multi-device setup, and VIP Home Tech Day when you want a full list handled in one visit."
  },
  {
    question: "Do you offer same-day appointments?",
    answer: "Yes, same-day or next-day appointments are often available depending on your location and schedule."
  },
  {
    question: "Can you help older adults who are not comfortable with technology?",
    answer: "Absolutely. We provide patient, step-by-step guidance and make sure everything is written down clearly."
  },
  {
    question: "Do you provide remote support?",
    answer:
      "Yes. Many software, email, and app issues can be solved remotely, while hardware and setup requests are usually best in-home."
  },
  {
    question: "What if my Quick Fix turns into a bigger project?",
    answer:
      "If the visit expands into a larger setup or multi-item project, we explain a clear upgrade option before continuing."
  },
  {
    question: "What areas do you serve?",
    answer: `We serve ${SERVICE_AREA}. If you are nearby, text us and we will confirm availability.`
  }
] as const;

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

const bookingMetaByName = Object.fromEntries(BOOKING_SERVICES.map((service) => [service.name, service]));

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden pb-10 pt-8 sm:pb-16 sm:pt-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-brand-100/70 to-transparent" />
          <div className="section-shell grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-floatIn">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-700 sm:mb-4 sm:text-xs">
                <MapPinned aria-hidden="true" className="h-3.5 w-3.5" />
                Bay Area local service
              </p>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Stress-free home tech support for your busy life.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
              We make it easy for busy professionals, families, older adults, and recent movers to get the right tech help fast—without the stress..
              </p>
              <div className="mt-6 hidden sm:block">
                <CtaButtons phoneHref={CONTACT_LINKS.call} smsHref={CONTACT_LINKS.text} />
              </div>
              <div className="mt-6 grid gap-2 sm:hidden">
                <Link className="cta-primary w-full" href="/book">
                  Book Now
                </Link>
                <a className="cta-secondary w-full" href={CONTACT_LINKS.text}>
                  Call or Text
                </a>
              </div>
              <div className="mt-3 hidden sm:block">
                <Link className="cta-secondary" href="/book">
                  Book Now Online
                </Link>
              </div>
              <p className="mt-2 text-xs text-slate-500 sm:mt-3 sm:text-sm">
                Call or text <span className="font-semibold text-slate-700"> {PHONE_NUMBER} </span>
                 for quick scheduling.
              </p>
            </div>

            <aside className="glass-card animate-floatIn p-5 [animation-delay:120ms] sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">Choose your package</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 sm:mt-4 sm:space-y-3">
                {HOME_PACKAGES.map((pkg) => (
                  <li
                    key={pkg.name}
                    className="flex items-center gap-2 border-b border-slate-100 pb-3 last:border-none last:pb-0"
                  >
                    <CircleCheckBig aria-hidden="true" className="h-4 w-4 text-brand-700" />
                    <span>{pkg.name}</span>
                  </li>
                ))}
              </ul>
              <a href="#packages" className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700 sm:mt-5">
                Compare packages
                <ChevronRight aria-hidden="true" className="ml-1 h-4 w-4" />
              </a>
            </aside>
          </div>
        </section>

        <section aria-label="Service highlights" className="pb-10 sm:pb-14">
          <div className="section-shell grid gap-4 md:grid-cols-3">
            {HOME_HIGHLIGHTS.map((item) => (
              <article key={item.text} className="glass-card flex items-start gap-3 p-4 sm:p-5">
                <item.icon aria-hidden="true" className="mt-0.5 h-5 w-5 text-brand-700" />
                <p className="text-sm font-medium text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="packages" className="py-12 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Packages"
              title="One issue, home setup, or a full tech day"
              description="Skip the confusing service menu. Choose the package that matches how much help you need."
            />
            <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
              {HOME_PACKAGES.map((pkg) => {
                const bookingMeta = bookingMetaByName[pkg.name] as
                  | { duration: string; bestFor: string; priceDisplay: string }
                  | undefined;
                return (
                <article key={pkg.name} className="glass-card flex h-full flex-col p-4 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{pkg.name}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:hidden">
                    {bookingMeta?.bestFor ?? pkg.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {bookingMeta?.priceDisplay ?? pkg.price}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {bookingMeta?.duration ?? "Scope varies"}
                    </span>
                  </div>
                  <Link className="cta-primary mt-4 w-full py-2.5 text-sm sm:hidden" href={getBookingPathByServiceName(pkg.name)}>
                    Book {pkg.name}
                  </Link>
                  <details className="mt-3 sm:hidden">
                    <summary className="cursor-pointer text-sm font-semibold text-brand-700">See details</summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{pkg.description}</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {pkg.examples.map((example) => (
                        <li key={example} className="flex items-start gap-2">
                          <CircleCheckBig aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </details>
                  <p className="mt-4 hidden border-t border-slate-100 pt-4 text-sm font-semibold text-slate-800 sm:block">
                    {pkg.supportLine}
                  </p>
                  <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">{pkg.description}</p>
                  <ul className="mt-4 hidden space-y-2 text-sm text-slate-700 sm:block">
                    {pkg.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2">
                        <CircleCheckBig aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <Link className="cta-secondary mt-5 hidden w-full sm:inline-flex" href={getBookingPathByServiceName(pkg.name)}>
                    Book {pkg.name}
                  </Link>
                </article>
              )})}
            </div>
            <p className="mt-6 text-sm text-slate-600">
              We also help with Wi-Fi, printers, laptops, TVs, email, Zoom, device setup, and more.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {HOME_COMMON_ISSUES.map((issue) => (
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
            <div className="mt-6 hidden sm:block">
              <CtaButtons phoneHref={CONTACT_LINKS.call} smsHref={CONTACT_LINKS.text} compact />
            </div>
            <div className="mt-5 sm:hidden">
              <Link className="cta-secondary w-full" href="/book">
                Compare and Book Packages
              </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-12 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="How It Works"
              title="Simple, fast, and easy from first text to final fix"
              description="We keep the process clear so you can get back to your day without tech interruptions."
            />
            <ol className="mt-6 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
              {HOME_HOW_IT_WORKS.map((step) => (
                <li key={step.title} className="glass-card p-5 sm:p-6">
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

        <section id="why-us" className="bg-white py-12 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Trusted support with a premium-but-friendly approach"
              description="You get calm, reliable help from someone who respects your time, your home, and your privacy."
            />
            <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2">
              {HOME_TRUST_POINTS.map((item) => (
                <InfoCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Testimonials"
              title="What Bay Area clients say"
              description="Real feedback from households who wanted tech support that feels clear and dependable."
            />
            <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
              {HOME_TESTIMONIALS.map((testimonial) => (
                <figure key={testimonial.name} className="glass-card p-5 sm:p-6">
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

        <section id="service-area" className="bg-white py-12 sm:py-20">
          <div className="section-shell grid items-start gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Service Area"
                title="Local support across the Bay Area"
                description="Need in-home tech help near work, school, or a new move-in? We provide friendly local service throughout the region."
              />
              <p className="mt-4 text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
                We currently serve <strong className="font-semibold text-slate-900">{SERVICE_AREA}</strong>.
                If you are just outside this area, text us your ZIP code and we will do our best to
                accommodate.
              </p>
              <div className="mt-5 hidden sm:block">
                <CtaButtons phoneHref={CONTACT_LINKS.call} smsHref={CONTACT_LINKS.text} compact />
              </div>
              <div className="mt-4 sm:hidden">
                <Link className="cta-secondary w-full" href="/book">
                  Book Service in Your Area
                </Link>
              </div>
              <details className="glass-card mt-5 p-4 sm:hidden">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  Office details and directions
                </summary>
                <div className="mt-3 space-y-3">
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
              </details>
              <div className="glass-card mt-6 hidden space-y-3 p-5 sm:block">
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
            <details className="glass-card p-4 sm:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Popular requests this month
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
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
            </details>
            <aside className="glass-card hidden p-6 sm:block">
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

        <section id="faq" className="py-12 sm:py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions before booking"
              description="Quick answers to help you schedule confidently."
            />
            <div className="mt-6 space-y-3 sm:mt-10 sm:space-y-4">
              {HOME_FAQS.map((faq) => (
                <details key={faq.question} className="glass-card group p-4 sm:p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-semibold text-slate-900 sm:text-base">
                    {faq.question}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 text-slate-500 transition group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="pb-24 pt-2 sm:pb-16 sm:pt-4">
          <div className="section-shell">
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-soft sm:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                Friendly local support
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-4xl">
                Get your home tech working right today.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200 sm:mt-4 sm:text-base sm:leading-7">
                Whether you need one quick fix or full home setup after a move, {BUSINESS_NAME} is
                ready to help. Call or text now and get clear guidance, fast scheduling, and a
                setup that simply works.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
                <Link className="cta-primary w-full bg-white text-slate-900 hover:bg-slate-100 sm:w-auto" href="/book">
                  Book Now
                </Link>
                <a className="cta-secondary w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto" href={CONTACT_LINKS.call}>
                  <Phone aria-hidden="true" className="mr-2 h-4 w-4" />
                  Call or Text
                </a>
                <a className="cta-secondary hidden border-white/30 bg-transparent text-white hover:bg-white/10 sm:inline-flex" href={CONTACT_LINKS.text}>
                  Text for same-day availability
                </a>
              </div>
              <p className="mt-2 text-xs text-slate-200 sm:mt-3 sm:text-sm">
                Not sure which package fits? Call or text and we&apos;ll guide you.
              </p>
              <p className="mt-3 text-xs text-slate-300 sm:mt-4 sm:text-sm">
                Office location: {OFFICE_LOCATION} | Office hours: {OFFICE_HOURS}
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <div className="section-shell flex gap-2 px-0">
          <Link className="cta-primary flex-1 py-2.5" href="/book">
            Book
          </Link>
          <a className="cta-secondary flex-1 py-2.5" href={CONTACT_LINKS.call}>
            Call / Text
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
