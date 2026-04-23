import { PhoneCall, MessageSquare } from "lucide-react";

type CtaButtonsProps = {
  phoneHref: string;
  smsHref: string;
  compact?: boolean;
};

export function CtaButtons({ phoneHref, smsHref, compact = false }: CtaButtonsProps) {
  const sizeClass = compact ? "px-3.5 py-2.5 text-sm sm:px-4" : "px-4 py-2.5 text-sm sm:px-5 sm:py-3";

  return (
    <div className="flex flex-wrap gap-3">
      <a className={`cta-primary ${sizeClass}`} href={phoneHref}>
        <PhoneCall aria-hidden="true" className="mr-2 h-4 w-4" />
        Call Now
      </a>
      <a className={`cta-secondary ${sizeClass}`} href={smsHref}>
        <MessageSquare aria-hidden="true" className="mr-2 h-4 w-4" />
        Text for Fast Reply
      </a>
    </div>
  );
}
