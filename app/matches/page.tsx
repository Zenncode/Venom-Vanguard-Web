import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import MatchesList from "@/app/components/matches/MatchesList";
import { achievements, getSquadStats, matches } from "@/app/data/squad";

export const metadata: Metadata = {
  title: "Matches",
  description:
    "Venom Vanguard match history — tournament runs, scrim blocks, and every trophy along the way.",
};

const sorted = [...matches].sort((a, b) => b.date.localeCompare(a.date));

const timeline = [...achievements].sort((a, b) => b.date.localeCompare(a.date));

export default function MatchesPage() {
  const stats = getSquadStats();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="War Record"
        title="Match History"
        description="Every official series and scrim block on record. Filters at the top."
      />

      <ScrollReveal className="mt-12">
        <div className="clip-notch grid grid-cols-3 divide-x divide-line bg-surface ring-1 ring-line">
          <div className="flex flex-col items-center gap-1 px-4 py-8">
            <span className="font-display text-4xl font-black text-venom sm:text-5xl">
              {stats.wins}
            </span>
            <span className="font-body text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              Wins
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-8">
            <span className="font-display text-4xl font-black text-red-400 sm:text-5xl">
              {stats.losses}
            </span>
            <span className="font-body text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              Losses
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-8">
            <span className="text-glow font-display text-4xl font-black text-venom sm:text-5xl">
              {stats.winRate}%
            </span>
            <span className="font-body text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              Win Rate
            </span>
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-12">
        <MatchesList matches={sorted} />
      </div>

      <div className="mt-24">
        <SectionHeading
          align="left"
          kicker="Trophy Room"
          title="Achievements Timeline"
        />
        <ol className="relative mt-10 space-y-6 border-l border-line pl-6 ml-3">
          {timeline.map((a, i) => (
            <li key={a.id} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <span
                className={`absolute -left-[9px] mt-2 h-4 w-4 rounded-full ring-4 ring-background ${
                  a.placement === "1st"
                    ? "bg-venom shadow-[0_0_12px_rgba(124,252,0,0.8)]"
                    : "bg-toxic shadow-[0_0_12px_rgba(168,85,247,0.7)]"
                }`}
              />
              <div className="clip-notch flex flex-wrap items-center gap-x-4 gap-y-2 bg-surface p-5 ring-1 ring-line transition-shadow hover:shadow-[0_0_20px_rgba(124,252,0,0.12)]">
                <span
                  className={`clip-notch-sm px-2.5 py-1 font-display text-xs font-black ${
                    a.placement === "1st"
                      ? "bg-venom/15 text-venom ring-1 ring-venom/40"
                      : "bg-toxic/10 text-toxic ring-1 ring-toxic/40"
                  }`}
                >
                  {a.placement}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-base font-bold">{a.title}</p>
                  <p className="font-body text-xs tracking-wide text-muted">{a.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
