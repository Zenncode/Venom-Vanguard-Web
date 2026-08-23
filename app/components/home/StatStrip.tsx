import type { JSX } from "react";
import Counter from "@/app/components/ui/Counter";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import { getSquadStats } from "@/app/data/squad";

const StatStrip = (): JSX.Element => {
  const stats = getSquadStats();

  const items = [
    { label: "Matches Played", value: stats.totalMatches, suffix: "", decimals: 0 },
    { label: "Win Rate", value: stats.winRate, suffix: "%", decimals: 1 },
    { label: "Trophies Lifted", value: stats.tournamentsWon, suffix: "", decimals: 0 },
    { label: "Active Members", value: stats.activeMembers, suffix: "", decimals: 0 },
  ];

  return (
    <div className="border-y border-line bg-surface/50">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-line lg:grid-cols-4">
        {items.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 90}>
            <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
              <span className="font-display text-3xl font-black tracking-wide text-venom sm:text-4xl">
                <Counter value={item.value} suffix={item.suffix} decimals={item.decimals} />
              </span>
              <span className="font-body text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                {item.label}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default StatStrip;
