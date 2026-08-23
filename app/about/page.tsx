import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import GlowButton from "@/app/components/ui/GlowButton";
import {
  getMvpCounts,
  getPlayerById,
  getSquadStats,
  historyTimeline,
} from "@/app/data/squad";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Venom Vanguard story — from a ranked grind group to Squad Clash Championship winners.",
};

const VALUES = [
  {
    title: "Discipline Over Talent",
    description:
      "Mechanics win fights; discipline wins tournaments. Draft reviews, VOD sessions, and punctual scrims are non-negotiable.",
  },
  {
    title: "No Flame, All Venom",
    description:
      "We strike opponents, not teammates. Tilt is handled offline, comms stay clean under pressure.",
  },
  {
    title: "Earn the Slot",
    description:
      "Roster spots are won in scrim blocks and kept through consistency. Nobody's seat is permanent — including the captain's.",
  },
];

export default function AboutPage() {
  const stats = getSquadStats();
  const topVenom = [...getMvpCounts().entries()].sort((a, b) => b[1] - a[1])[0];
  const mvpName = topVenom ? getPlayerById(topVenom[0])?.ign : undefined;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Our Story"
        title="Forged in the Jungle"
        description="From a five-stack of ranked grinders to tournament champions — this is the Venom Vanguard story."
      />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Founded", value: "2023" },
          { label: "Trophies", value: String(stats.tournamentsWon) },
          { label: "Recorded Matches", value: String(stats.totalMatches) },
          { label: "Active Members", value: String(stats.activeMembers) },
        ].map((item) => (
          <div key={item.label} className="clip-notch-sm bg-surface p-4 text-center ring-1 ring-line">
            <p className="font-display text-2xl font-black text-venom">{item.value}</p>
            <p className="mt-1 font-body text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <ol className="relative mx-auto mt-16 max-w-3xl space-y-8 border-l border-line pl-8 ml-3">
        {historyTimeline.map((entry, i) => (
          <ScrollReveal key={entry.period} delay={i * 90} direction="left">
            <li className="relative">
              <span className="absolute top-1.5 -left-[41px] h-4 w-4 rounded-full bg-venom shadow-[0_0_12px_rgba(124,252,0,0.8)] ring-4 ring-background" />
              <div className="clip-notch bg-surface p-6 ring-1 ring-line transition-shadow hover:shadow-[0_0_20px_rgba(124,252,0,0.12)]">
                <p className="font-display text-[11px] font-bold tracking-[0.25em] text-venom uppercase">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold tracking-wide uppercase">
                  {entry.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                  {entry.description}
                </p>
              </div>
            </li>
          </ScrollReveal>
        ))}
      </ol>

      <div className="mx-auto mt-20 max-w-4xl">
        <SectionHeading
          align="left"
          kicker="Squad Code"
          title="What We Stand For"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 110}>
              <div className="clip-notch h-full bg-surface p-6 ring-1 ring-line">
                <span className="font-display text-2xl font-black text-venom/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-body text-base font-bold">{value.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="clip-notch relative mx-auto mt-20 max-w-4xl overflow-hidden bg-surface p-10 text-center ring-1 ring-venom/25 sm:p-12">
        <h2 className="font-display text-xl font-black tracking-wide uppercase sm:text-2xl">
          Chapter Next: <span className="text-glow text-venom">The Invitational</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-muted">
          The SCC trophy earned us a spot in the November Invitational Circuit.
          {mvpName
            ? ` Led by our most decorated venom, ${mvpName}, every lane is locked and loaded.`
            : ""}{" "}
          Want in on the grind?
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <GlowButton href="/recruit">Try Out</GlowButton>
          <GlowButton href="/schedule" variant="outline">
            Watch Us Play
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
