import type { Metadata } from "next";
import { BookingPageContent } from "@/components/booking/booking-page-content";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";

export const metadata: Metadata = {
  title: "Book Tech Support | Bay Area Tech Help",
  description:
    "Schedule in-home or remote tech support, choose a convenient time, and confirm your appointment online."
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <BookingPageContent />
      <SiteFooter />
    </>
  );
}
