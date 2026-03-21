import {
  CheckCircle2,
  Clock3,
  LaptopMinimal,
  MapPin,
  MessageSquare,
  MonitorSmartphone,
  Printer,
  Router,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tv,
  Users,
  Wrench
} from "lucide-react";

// TODO: Replace with actual business name.
export const BUSINESS_NAME = "Bay Area Tech Help";
export const WEBSITE_URL = "https://bayareatechhelp.com";

// TODO: Replace with your real phone number.
export const PHONE_NUMBER = "(510) 978-6055";
export const PHONE_TEL = "+15109786055";

// TODO: Replace with your real service area text.
export const SERVICE_AREA = "San Francisco, Oakland, Berkeley, Daly City, Alameda, and nearby Bay Area neighborhoods";

// TODO: Replace with your live CTA links.
export const CONTACT_LINKS = {
  call: `tel:${PHONE_TEL}`,
  text: `sms:${PHONE_TEL}`,
  primaryCta: `tel:${PHONE_TEL}`
};

export const OFFICE_LOCATION = "2417 Mariner Square Loop, Alameda, CA 94501";
// TODO: Update office hours if they change.
export const OFFICE_HOURS = "Monday to Friday, 9:00 AM to 6:00 PM";
export const OFFICE_MAPS_LINK = "https://maps.google.com/?q=2417+Mariner+Square+Loop,+Alameda,+CA+94501";

export const SERVICES = [
  {
    icon: Router,
    title: "Wi-Fi setup and optimization",
    description:
      "Set up new routers, mesh systems, and secure passwords so every room gets reliable, fast internet.",
    detail: "Starting at $100"
  },
  {
    icon: Printer,
    title: "Printer setup and troubleshooting",
    description:
      "Connect wireless printers, fix offline issues, and make sure laptops and phones print without headaches.",
    detail: "Starting at $75"
  },
  {
    icon: Tv,
    title: "Smart TV and streaming setup",
    description:
      "Install and organize apps, connect sound systems, and simplify remotes for easy everyday use.",
    detail: "Starting at $80"
  },
  {
    icon: LaptopMinimal,
    title: "Slow computer cleanup",
    description:
      "Remove clutter, improve startup speed, and tune settings so your computer feels fast and stable again.",
    detail: "Starting at $75"
  },
  {
    icon: Smartphone,
    title: "New device setup",
    description:
      "Set up phones, tablets, and laptops, transfer accounts, and configure privacy and backup settings.",
    detail: "Starting at $120"
  },
  {
    icon: MonitorSmartphone,
    title: "File transfers and app help",
    description:
      "Move files safely from old devices and get practical help with Zoom, email, messaging, and daily apps.",
    detail: "Starting at $75"
  }
] as const;

export const HOW_IT_WORKS = [
  {
    icon: MessageSquare,
    title: "1) Reach out in minutes",
    description:
      "Call or text what you need help with. We will reply quickly and suggest the best visit window."
  },
  {
    icon: MapPin,
    title: "2) In-home or remote support",
    description:
      "Choose convenient on-site support in the Bay Area or remote help for simple fixes."
  },
  {
    icon: CheckCircle2,
    title: "3) Fixed and explained clearly",
    description:
      "We solve the issue, then walk you through what changed so your setup stays easy to use."
  }
] as const;

// TODO: Replace these starting prices as needed for your business.
export const PRICING = [
  {
    service: "General tech help visit",
    price: "$75",
    note: "Ideal for troubleshooting, software fixes, and device questions."
  },
  {
    service: "Wi-Fi setup and optimization",
    price: "$100",
    note: "Router and mesh setup, speed tuning, and connection reliability."
  },
  {
    service: "Smart TV and streaming setup",
    price: "$80",
    note: "TV app setup, account sign-in, remote pairing, and audio checks."
  },
  {
    service: "New device setup",
    price: "$120",
    note: "Phone, tablet, or laptop setup with account sync and security settings."
  }
] as const;

export const TRUST_POINTS = [
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

// TODO: Replace testimonial names, neighborhoods, and quotes with real customer feedback.
export const TESTIMONIALS = [
  {
    quote:
      "Our Wi-Fi finally works in every room, and the printer setup took less than an hour. Super smooth.",
    name: "Priya M.",
    area: "Walnut Creek"
  },
  {
    quote:
      "We moved and had a pile of tech to set up. Everything was connected same day, including TVs and Zoom.",
    name: "Daniel R.",
    area: "San Francisco"
  },
  {
    quote:
      "Patient and kind support for my parents. They can now use email and video calls without stress.",
    name: "Carolyn T.",
    area: "Berkeley"
  }
] as const;

export const FAQS = [
  {
    question: "Do you offer same-day appointments?",
    answer:
      "Yes, same-day or next-day appointments are often available depending on your location and schedule."
  },
  {
    question: "Can you help older adults who are not comfortable with technology?",
    answer:
      "Absolutely. We provide patient, step-by-step guidance and make sure everything is written down clearly."
  },
  {
    question: "Do you provide remote support?",
    answer:
      "Yes. Many software, email, and app issues can be solved remotely, while hardware and setup requests are usually best in-home."
  },
  {
    question: "What areas do you serve?",
    answer: `We serve ${SERVICE_AREA}. If you are nearby, text us and we will confirm availability.`
  }
] as const;

export const HIGHLIGHTS = [
  {
    icon: Users,
    text: "Trusted by busy professionals, families, older adults, and recent movers"
  },
  {
    icon: MapPin,
    text: "Locally focused home tech support across the Bay Area"
  },
  {
    icon: CheckCircle2,
    text: "Clear pricing with no surprise add-ons"
  }
] as const;
