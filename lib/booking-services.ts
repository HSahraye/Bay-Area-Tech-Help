export type BookingService = {
  id: "quick-fix" | "home-tech-setup" | "vip-home-tech-day";
  slug: "quick-fix" | "home-tech-setup" | "vip-home-tech-day";
  name: string;
  shortDescription: string;
  duration: string;
  priceDisplay: string;
  bestFor: string;
  calendlyUrl: string;
};

// TODO: Replace placeholder Calendly event links with your real production links.
export const QUICK_FIX_CALENDLY_URL = "https://calendly.com/sahrayehamid/quick-fix";
export const HOME_SETUP_CALENDLY_URL = "https://calendly.com/sahrayehamid/home-tech-setup";
export const VIP_DAY_CALENDLY_URL = "https://calendly.com/sahrayehamid/vip-home-tech-day";

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: "quick-fix",
    slug: "quick-fix",
    name: "Quick Fix",
    shortDescription: "Fast help for one clear issue in your home setup.",
    duration: "Up to 60 minutes",
    priceDisplay: "Starts at $99",
    bestFor: "Printer issues, email setup, Zoom trouble, or a single device problem.",
    calendlyUrl: QUICK_FIX_CALENDLY_URL
  },
  {
    id: "home-tech-setup",
    slug: "home-tech-setup",
    name: "Home Tech Setup",
    shortDescription: "Multi-device setup so your home tech works together cleanly.",
    duration: "90-120 minutes",
    priceDisplay: "$199-$299",
    bestFor: "Moves, Wi-Fi + TV setup, office setup, and device syncing.",
    calendlyUrl: HOME_SETUP_CALENDLY_URL
  },
  {
    id: "vip-home-tech-day",
    slug: "vip-home-tech-day",
    name: "VIP Home Tech Day",
    shortDescription: "Priority onsite support to tackle your full tech list in one visit.",
    duration: "2-4 hours",
    priceDisplay: "$399-$599",
    bestFor: "Busy households that want multiple issues solved in one appointment.",
    calendlyUrl: VIP_DAY_CALENDLY_URL
  }
];

export const DEFAULT_BOOKING_SERVICE_SLUG: BookingService["slug"] = "quick-fix";

export function getBookingServiceBySlug(slug: string | null | undefined): BookingService {
  const normalizedSlug = (slug ?? "").toLowerCase();
  return (
    BOOKING_SERVICES.find((service) => service.slug === normalizedSlug) ??
    BOOKING_SERVICES.find((service) => service.slug === DEFAULT_BOOKING_SERVICE_SLUG)!
  );
}

export function getBookingPathByServiceSlug(slug: BookingService["slug"]): string {
  return `/book?service=${slug}`;
}

export function getBookingPathByServiceName(name: string): string {
  const service = BOOKING_SERVICES.find((item) => item.name === name);
  return service ? getBookingPathByServiceSlug(service.slug) : "/book";
}
