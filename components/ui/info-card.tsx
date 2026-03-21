import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  detail?: string;
};

export function InfoCard({ icon: Icon, title, description, detail }: InfoCardProps) {
  return (
    <article className="glass-card h-full p-6">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {detail ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
          {detail}
        </p>
      ) : null}
    </article>
  );
}
