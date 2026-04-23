"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, Clock3, MapPinned, ShieldCheck } from "lucide-react";
import {
  BOOKING_SERVICES,
  DEFAULT_BOOKING_SERVICE_SLUG,
  getBookingServiceBySlug,
  type BookingService
} from "@/lib/booking-services";
import { SERVICE_AREA } from "@/lib/site-data";
import { CalendlyEmbed } from "@/components/booking/calendly-embed";

export function BookingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedService, setSelectedService] = useState<BookingService>(() =>
    getBookingServiceBySlug(DEFAULT_BOOKING_SERVICE_SLUG)
  );

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
    router.replace(`${pathname}?service=${service.slug}`, { scroll: false });
  }

  return (
    <main>
      <section className="relative overflow-hidden pb-12 pt-10 sm:pt-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-brand-100/70 to-transparent" />
        <div className="section-shell">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Secure online booking
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Book Your Tech Help Visit
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the service that fits your needs, pick an available time, pay to confirm, and
            receive your booking details by email.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-700">
            Your appointment time is reserved after booking and payment confirmation.
          </p>
        </div>
      </section>

      <section className="pb-10">
        <div className="section-shell">
          <fieldset>
            <legend className="text-base font-semibold text-slate-900">1) Select your service package</legend>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {BOOKING_SERVICES.map((service) => {
                const isSelected = selectedServiceSlug === service.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => handleServiceChange(service)}
                    className={`glass-card h-full rounded-2xl p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                      isSelected ? "border-brand-500 ring-2 ring-brand-200" : "hover:border-brand-300"
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select ${service.name} package`}
                  >
                    <p className="text-base font-bold text-slate-900">{service.name}</p>
                    <p className="mt-2 text-sm text-slate-600">{service.shortDescription}</p>
                    <dl className="mt-4 space-y-1 text-sm text-slate-700">
                      <div>
                        <dt className="inline font-semibold">Duration:</dt> <dd className="inline">{service.duration}</dd>
                      </div>
                      <div>
                        <dt className="inline font-semibold">Price:</dt> <dd className="inline">{service.priceDisplay}</dd>
                      </div>
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

      <section className="pb-12">
        <div className="section-shell">
          <p className="mb-4 text-base font-semibold text-slate-900">2) Pick a time and confirm online</p>
          <CalendlyEmbed eventUrl={selectedServiceDetails.calendlyUrl} serviceName={selectedServiceDetails.name} />
          <p className="mt-3 text-sm text-slate-600">
            Confirmation details and meeting instructions are sent to your email after booking.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="section-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-slate-900">Booking FAQ and policies</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
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

          <aside className="glass-card p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-slate-900">Why clients book online</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
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
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">After-booking confirmation</p>
              <p className="mt-1 text-sm text-slate-600">
                Once booked, you will receive a confirmation email with date, time, and next steps.
              </p>
            </div>
            <Link className="cta-secondary mt-5 w-full" href="/">
              Back to homepage
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
