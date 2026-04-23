type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false
}: SectionHeadingProps) {
  return (
    <header className={centered ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700 sm:mb-3 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-3 sm:text-lg sm:leading-8">
        {description}
      </p>
    </header>
  );
}
