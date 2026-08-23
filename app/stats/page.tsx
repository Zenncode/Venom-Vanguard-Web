import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import RoleBadge from "@/app/components/ui/RoleBadge";
import { getLeaderboard, getSquadStats } from "@/app/data/squad";

export const metadata: Metadata = {
  title: "Stats",
  description:
    "Venom Vanguard leaderboard — win rates, MVP counts, and match records per player.",
};

export default function StatsPage() {
  const leaderboard = getLeaderboard();
  const stats = getSquadStats();
  const maxWr = Math.max(...leaderboard.map((l) => l.player.winRate));

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="By the Numbers"
        title="Leaderboard"
        description="Individual performance across recorded scrims and official series."
      />

      <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-y-2.5 text-left">
          <thead>
            <tr className="font-display text-[10px] tracking-[0.22em] text-muted uppercase">
              <th scope="col" className="px-4 pb-1 font-bold">#</th>
              <th scope="col" className="px-4 pb-1 font-bold">Player</th>
              <th scope="col" className="px-4 pb-1 font-bold">Role</th>
              <th scope="col" className="px-4 pb-1 font-bold">Win Rate</th>
              <th scope="col" className="px-4 pb-1 text-right font-bold">Matches</th>
              <th scope="col" className="px-4 pb-1 text-right font-bold">MVPs</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(({ player, mvps }, i) => (
              <tr key={player.id} className="animate-fade-up group" style={{ animationDelay: `${i * 70}ms` }}>
                <td className="bg-surface px-4 py-3.5 ring-1 ring-line">
                  <span
                    className={`font-display text-base font-black ${
                      i === 0 ? "text-glow text-venom" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </td>
                <td className="bg-surface px-4 py-3.5 ring-1 ring-line">
                  <p className="font-body text-base font-bold transition-colors group-hover:text-venom">
                    {player.ign}
                    {player.captain && (
                      <span className="ml-2 align-middle font-display text-[9px] font-bold tracking-widest text-venom uppercase">
                        CPT
                      </span>
                    )}
                  </p>
                  <p className="font-body text-xs text-muted">{player.rank}</p>
                </td>
                <td className="bg-surface px-4 py-3.5 ring-1 ring-line">
                  <RoleBadge role={player.role} />
                </td>
                <td className="bg-surface px-4 py-3.5 ring-1 ring-line">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 overflow-hidden bg-background">
                      <div
                        className={`h-full ${player.winRate === maxWr ? "bg-gradient-to-r from-venom/60 to-venom shadow-[0_0_8px_rgba(124,252,0,0.6)]" : "bg-muted/50"}`}
                        style={{ width: `${player.winRate}%` }}
                      />
                    </div>
                    <span
                      className={`font-display text-sm font-bold tabular-nums ${
                        player.winRate === maxWr ? "text-venom" : "text-foreground"
                      }`}
                    >
                      {player.winRate}%
                    </span>
                  </div>
                </td>
                <td className="bg-surface px-4 py-3.5 text-right font-display text-sm font-bold text-foreground tabular-nums ring-1 ring-line">
                  {player.matchesPlayed.toLocaleString()}
                </td>
                <td className="bg-surface px-4 py-3.5 text-right font-display text-sm font-bold text-venom tabular-nums ring-1 ring-line">
                  {mvps}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ScrollReveal className="mx-auto mt-10 max-w-5xl">
        <div className="clip-notch grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-4">
          {[
            { label: "Squad Win Rate", value: `${stats.winRate}%` },
            { label: "Recorded Series", value: String(stats.totalMatches) },
            { label: "Tournaments Won", value: String(stats.tournamentsWon) },
            { label: "Roster Size", value: String(stats.activeMembers) },
          ].map((item) => (
            <div key={item.label} className="bg-surface p-6 text-center">
              <p className="font-display text-2xl font-black text-venom">{item.value}</p>
              <p className="mt-1 font-body text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <p className="mt-6 text-center font-body text-xs tracking-wide text-muted">
        MVP counts include series and game-level awards. Ranked stats reflect each
        member&apos;s personal ladder record.
      </p>
    </section>
  );
}
