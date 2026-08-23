import type { JSX } from "react";
import ScrollReveal from "@/app/components/ui/ScrollReveal";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

const SectionHeading = ({
  kicker,
  title,
  description,
  align = "center",
}: SectionHeadingProps): JSX.Element => {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <ScrollReveal
      className={`flex flex-col gap-3 ${alignment} ${align === "center" ? "mx-auto" : ""} max-w-2xl`}
    >
      <span className="inline-flex items-center gap-2 clip-notch-sm bg-venom/10 px-3 py-1 font-display text-[11px] font-bold tracking-[0.25em] text-venom uppercase ring-1 ring-venom/30">
        {kicker}
      </span>
      <h2 className="font-display text-2xl font-black tracking-wide text-foreground uppercase sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="font-body text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
};

export default SectionHeading;
