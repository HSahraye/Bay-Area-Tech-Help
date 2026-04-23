import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleCheckBig, Handshake, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { CtaButtons } from "@/components/ui/cta-buttons";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { CONTACT_LINKS, WEBSITE_URL } from "@/lib/site-data";
import AliImage from "@/Images/Ali.png";
import OmarImage from "@/Images/Omar.png";
import KevinImage from "@/Images/Kevin.png";
import CarlosImage from "@/Images/Carlos.png";
import BrianImage from "@/Images/Brian.png";

export const metadata: Metadata = {
  title: "About Bay Area Tech Help | Local Bay Area Tech Support",
  description:
    "Learn more about Bay Area Tech Help, a small Bay Area team of professionals and students from UC Berkeley and San Francisco State University offering friendly onsite and virtual tech support.",
  alternates: {
    canonical: `${WEBSITE_URL}/about`
  }
};

// ABOUT PAGE CONTENT EDIT GUIDE:
// Update these values to change About page copy quickly.
const ABOUT_BUSINESS_NAME = "Bay Area Tech Help";
const ABOUT_SERVICE_AREA =
  "San Francisco, Oakland, Berkeley, Daly City, Alameda, and nearby Bay Area neighborhoods";
const ABOUT_SUPPORT_EMAIL = "support@bayareatechhelp.com";
const ABOUT_PHONE_NUMBER = "(510) 978-6055";

const teamMembers = [
  {
    name: "Ali",
    role: "Home Tech Specialist",
    image: AliImage
  },
  {
    name: "Omar",
    role: "Network Support Specialist",
    image: OmarImage
  },
  {
    name: "Kevin",
    role: "In-Home Setup Specialist",
    image: KevinImage
  },
  {
    name: "Carlos",
    role: "Smart Home Specialist",
    image: CarlosImage
  },
  {
    name: "Brian",
    role: "Remote Support Specialist",
    image: BrianImage
  }
] as const;

const values = [
  {
    icon: CircleCheckBig,
    title: "Clear communication",
    description: "We explain what we are doing in plain language so you always know what changed and why."
  },
  {
    icon: ShieldCheck,
    title: "Respect for your home and privacy",
    description: "We are careful, professional, and respectful with your space, devices, and personal information."
  },
  {
    icon: HeartHandshake,
    title: "Patient help without jargon",
    description: "Questions are always welcome. We keep support calm, friendly, and easy to follow."
  },
  {
    icon: Handshake,
    title: "Reliable local support",
    description: "As a Bay Area team, we focus on fast response times and dependable follow-through."
  }
] as const;

const audiences = [
  "Busy professionals who need tech to work without wasting time",
  "Families managing multiple devices, accounts, and home internet needs",
  "Older adults who want patient guidance and clear step-by-step help",
  "Recent movers setting up Wi-Fi, TVs, printers, and home office tools"
] as const;

const teamTrustPoints = [
  "In-home & remote support",
  "Fast response times",
  "Trusted across the Bay Area"
] as const;

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden pb-14 pt-12 sm:pt-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-52 bg-gradient-to-b from-brand-100/70 to-transparent" />
          <div className="section-shell">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <Users aria-hidden="true" className="h-3.5 w-3.5" />
              Local Bay Area team
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              About Bay Area Tech Help
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Meet the team behind {ABOUT_BUSINESS_NAME}. We are a small Bay Area group providing
              friendly, reliable onsite and virtual tech support for homes across the region.
            </p>
            <div className="mt-8">
              <CtaButtons phoneHref={CONTACT_LINKS.call} smsHref={CONTACT_LINKS.text} />
            </div>
            <div className="mt-3">
              <Link className="cta-secondary" href="/book">
                Book Now Online
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Who We Are"
              title="Community-rooted support, built around real households"
              description={`${ABOUT_BUSINESS_NAME} is a small group of professionals and enthusiastic students connected to UC Berkeley and San Francisco State University. We care deeply about making technology easier for everyday people, whether you need one quick fix or full home setup support.`}
            />
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="section-shell max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 sm:text-sm">
                Meet the Team
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Trusted local technicians you can feel comfortable inviting into your home
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Reliable, local tech specialists serving Bay Area homes and professionals.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <article
                  key={member.name}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`${member.name}, Bay Area Tech Help technician`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                  </div>
                  <div className="border-t border-slate-200 px-4 py-3">
                    <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {teamTrustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  <CircleCheckBig aria-hidden="true" className="h-4 w-4 text-brand-700" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="section-shell">
            <SectionHeading
              eyebrow="What We Believe"
              title="The standards we bring into every home visit"
              description="Our approach is simple: be clear, be respectful, and make tech feel manageable."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {values.map((value) => (
                <article key={value.title} className="glass-card p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <value.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Who We Help"
                title="Support designed for busy, real-life routines"
                description="Most of our clients are balancing work, family, and everyday responsibilities. They want practical support from someone local and easy to work with."
              />
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {audiences.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CircleCheckBig aria-hidden="true" className="mt-0.5 h-4 w-4 text-brand-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-900">Why people choose us</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                People call us because they want someone they can trust in their home, someone local,
                someone patient, and someone who can solve problems without making technology feel
                overwhelming. We focus on calm, capable support that helps you feel confident moving
                forward.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Serving {ABOUT_SERVICE_AREA} with onsite and virtual appointments.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="section-shell">
            <div className="glass-card p-7 sm:p-8">
              <SectionHeading
                eyebrow="Join Our Team"
                title="Skilled, friendly, and people-first? Let&apos;s talk."
                description="If you are a skilled, reliable, and friendly tech professional or student who enjoys helping people, we would love to hear from you."
              />
              <p className="mt-4 text-sm text-slate-700">
                If you would like to join our team, please send us an email at{" "}
                <a className="font-semibold text-brand-700 hover:text-brand-900" href={`mailto:${ABOUT_SUPPORT_EMAIL}`}>
                  {ABOUT_SUPPORT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="pb-24 pt-6 sm:pb-16">
          <div className="section-shell">
            <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-soft sm:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                Bay Area local support
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Need help with home tech support in the Bay Area?
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
                Call, text, or book today and we&apos;ll help you choose the right support for your
                home. We keep it simple, clear, and stress-free.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a className="cta-primary bg-white text-slate-900 hover:bg-slate-100" href={CONTACT_LINKS.call}>
                  Call {ABOUT_PHONE_NUMBER}
                </a>
                <a className="cta-secondary border-white/30 bg-transparent text-white hover:bg-white/10" href={CONTACT_LINKS.text}>
                  Text to book help
                </a>
                <Link className="cta-secondary border-white/30 bg-transparent text-white hover:bg-white/10" href="/book">
                  Book now
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </div>
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
    </>
  );
}
