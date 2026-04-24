"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, Clock3, MapPinned, ShieldCheck } from "lucide-react";
import {
  BOOKING_SERVICES,
  DEFAULT_BOOKING_SERVICE_SLUG,
  getBookingServiceBySlug,
  type BookingService
} from "@/lib/booking-services";
import { CONTACT_LINKS, SERVICE_AREA } from "@/lib/site-data";

const LazyCalendlyEmbed = dynamic(
  () => import("@/components/booking/calendly-embed").then((module) => module.CalendlyEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="glass-card flex min-h-[420px] items-center justify-center p-6 text-sm text-slate-600">
        Preparing scheduler...
      </div>
    )
  }
);

export function BookingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedService, setSelectedService] = useState<BookingService>(() =>
    getBookingServiceBySlug(DEFAULT_BOOKING_SERVICE_SLUG)
  );
  const [isSchedulerVisible, setIsSchedulerVisible] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    setSelectedService(getBookingServiceBySlug(serviceParam));
  }, [searchParams]);

  const selectedServiceSlug = selectedService.slug;

  const selectedServiceDetails = useMemo(
    () =>
      BOOKING_SERVICES.find((service) => service.slug === selectedServiceSlug) ??
      getBookingServiceBySlug(DEFAULT_BOOKING_SERVICE_SLUG),
    [selectedServiceSlug]
  );

  function handleServiceChange(service: BookingService) {
    setSelectedService(service);
    setIsSchedulerVisible(false);
    router.replace(`${pathname}?service=${service.slug}`, { scroll: false });
  }

  return (
    <main>
      <section className="relative overflow-hidden pb-8 pt-8 sm:pb-12 sm:pt-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-brand-100/70 to-transparent" />
        <div className="section-shell">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-700 sm:mb-4 sm:text-xs">
            <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Secure online booking
          </p>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Book Your Tech Help Visit
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Choose the service that fits your needs, pick an available time, pay to confirm, and
            receive your booking details by email.
          </p>
          <p className="mt-3 text-sm font-medium text-slate-700 sm:mt-4">
            Your appointment time is reserved after booking and payment confirmation.
          </p>
        </div>
      </section>

      <section className="pb-8 sm:pb-10">
        <div className="section-shell">
          <fieldset>
            <legend className="text-base font-semibold text-slate-900">1) Select your service package</legend>
            <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3">
              {BOOKING_SERVICES.map((service) => {
                const isSelected = selectedServiceSlug === service.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => handleServiceChange(service)}
                    className={`glass-card h-full rounded-2xl p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 sm:p-5 ${
                      isSelected ? "border-brand-500 ring-2 ring-brand-200" : "hover:border-brand-300"
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select ${service.name} package`}
                  >
                    <p className="text-base font-bold text-slate-900">{service.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {service.priceDisplay}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {service.duration}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{service.shortDescription}</p>
                    <dl className="mt-3 space-y-1 text-sm text-slate-700">
                      <div>
                        <dt className="inline font-semibold">Best for:</dt> <dd className="inline">{service.bestFor}</dd>
                      </div>
                    </dl>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="section-shell">
          <p className="mb-3 text-base font-semibold text-slate-900 sm:mb-4">2) Pick a time and confirm online</p>
          {isSchedulerVisible ? (
            <LazyCalendlyEmbed eventUrl={selectedServiceDetails.calendlyUrl} serviceName={selectedServiceDetails.name} />
          ) : (
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <p className="text-sm text-slate-700">
                Load the live scheduler for <span className="font-semibold">{selectedServiceDetails.name}</span> when you are ready.
              </p>
              <button
                type="button"
                className="cta-primary mt-4"
                onClick={() => setIsSchedulerVisible(true)}
              >
                Load booking scheduler
              </button>
              <p className="mt-3 text-xs text-slate-500">
                If booking does not load quickly, call or text us and we will confirm your appointment manually.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a className="cta-secondary px-3 py-2 text-xs" href={CONTACT_LINKS.call}>
                  Call now
                </a>
                <a className="cta-secondary px-3 py-2 text-xs" href={CONTACT_LINKS.text}>
                  Text for fast reply
                </a>
              </div>
            </div>
          )}
          <p className="mt-2 text-sm text-slate-600 sm:mt-3">
            Confirmation details and meeting instructions are sent to your email after booking.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="section-shell grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card p-5 sm:p-7">
            <h2 className="text-xl font-semibold text-slate-900">Booking FAQ and policies</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700 sm:mt-5 sm:space-y-4">
              <div>
                <p className="font-semibold text-slate-900">How is my appointment confirmed?</p>
                <p>Once you choose a time and complete payment in Calendly, your slot is reserved immediately.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Can I reschedule?</p>
                <p>
                  Yes. Use the confirmation email from Calendly to reschedule or cancel based on the event policy.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">What happens after booking?</p>
                <p>
                  You receive an email confirmation with appointment details, then we arrive prepared for your selected package.
                </p>
              </div>
            </div>
          </div>

          <aside className="glass-card p-5 sm:p-7">
            <h3 className="text-lg font-semibold text-slate-900">Why clients book online</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 sm:mt-4 sm:space-y-3">
              <li className="flex items-start gap-2">
                <MapPinned aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                <span>Service area: {SERVICE_AREA}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock3 aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                <span>In-home and remote support options, depending on your issue.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                <span>Secure scheduling and payment handled by Calendly + Stripe.</span>
              </li>
            </ul>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:mt-5">
              <p className="text-sm font-semibold text-slate-900">After-booking confirmation</p>
              <p className="mt-1 text-sm text-slate-600">
                Once booked, you will receive a confirmation email with date, time, and next steps.
              </p>
            </div>
            <Link className="cta-secondary mt-4 w-full sm:mt-5" href="/">
              Back to homepage
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
