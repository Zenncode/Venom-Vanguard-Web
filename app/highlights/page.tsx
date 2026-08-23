import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import HighlightCard from "@/app/components/highlights/HighlightCard";
import { getPlayerById, highlights } from "@/app/data/squad";

export const metadata: Metadata = {
  title: "Highlights",
  description:
    "The best Venom Vanguard plays — pentakills, clutch hooks, and championship teamfights.",
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export default function HighlightsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Play of the Week"
        title="Highlights & Clips"
        description="Championship teamfights, outplays, and the clips that keep breaking our Discord."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 80}>
            <HighlightCard item={item} playerIgn={item.player ? getPlayerById(item.player)?.ign : undefined} />
            <p className="mt-2 text-right font-body text-[11px] tracking-wide text-muted">
              {formatDate(item.date)}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
