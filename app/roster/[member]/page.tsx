import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import RoleBadge from "@/app/components/ui/RoleBadge";
import GlowButton from "@/app/components/ui/GlowButton";
import MatchCard from "@/app/components/matches/MatchCard";
import {
  getPlayerById,
  getMvpCounts,
  getPlayerMatches,
  players,
} from "@/app/data/squad";

export function generateStaticParams() {
  return players.map((p) => ({ member: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/roster/[member]">,
): Promise<Metadata> {
  const { member } = await props.params;
  const player = getPlayerById(member);
  if (!player) return { title: "Player Not Found" };
  return {
    title: `${player.ign} — ${player.role} Lane`,
    description:
      player.bio ??
      `${player.ign}, ${player.role} lane player for Venom Vanguard. ${player.rank}.`,
  };
}

export default async function PlayerPage(props: PageProps<"/roster/[member]">) {
  const { member } = await props.params;
  const player = getPlayerById(member);
  if (!player) notFound();

  const mvps = getMvpCounts().get(player.id) ?? 0;
  const appearances = getPlayerMatches(player.id);

  const stats = [
    { label: "Current Rank", value: player.rank },
    ...(player.peakRank
      ? [{ label: "Peak Rank", value: player.peakRank }]
      : []),
    { label: "Win Rate", value: `${player.winRate}%` },
    { label: "Matches Played", value: player.matchesPlayed.toLocaleString() },
    { label: "MVP Awards", value: String(mvps) },
    {
      label: "Joined",
      value: new Date(`${player.joinedDate}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    },
  ];

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/roster"
        className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide text-muted transition-colors hover:text-venom"
      >
        ← Back to Roster
      </Link>

      <header className="clip-notch mt-6 flex flex-col items-center gap-6 bg-surface p-8 ring-1 ring-line sm:flex-row sm:p-10">
        <span className="clip-notch flex h-24 w-24 shrink-0 animate-pulse-glow items-center justify-center bg-venom/10 font-display text-3xl font-black text-venom ring-1 ring-venom/40">
          {player.ign.slice(0, 2).toUpperCase()}
        </span>
        <div className="text-center sm:text-left">
          <h1 className="font-display text-3xl font-black tracking-wide uppercase sm:text-4xl">
            {player.ign}
          </h1>
          <p className="mt-1 font-body text-base text-muted">
            {player.realName ?? "Venom Vanguard"} · Member since{" "}
            {new Date(`${player.joinedDate}T00:00:00`).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <RoleBadge role={player.role} />
            {player.captain && (
              <span className="clip-notch-sm bg-venom/15 px-2 py-1 font-display text-[10px] font-bold tracking-widest text-venom uppercase ring-1 ring-venom/40">
                Team Captain
              </span>
            )}
          </div>
        </div>
      </header>

      {player.bio && (
        <blockquote className="mt-8 border-l-2 border-venom pl-5 font-body text-lg leading-relaxed text-muted">
          {player.bio}
        </blockquote>
      )}

      <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="clip-notch-sm bg-surface p-4 ring-1 ring-line">
            <p className="font-display text-base font-bold text-venom">{stat.value}</p>
            <p className="mt-1 font-body text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-sm font-bold tracking-[0.25em] text-muted uppercase">
          Hero Pool
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {player.signatureHeroes.map((hero) => (
            <span
              key={hero.name}
              className="clip-notch-sm bg-surface px-4 py-2 font-body text-sm font-bold text-foreground ring-1 ring-line"
            >
              {hero.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-sm font-bold tracking-[0.25em] text-muted uppercase">
          Notable Performances
        </h2>
        {appearances.length > 0 ? (
          <div className="space-y-3">
            {appearances.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <p className="clip-notch bg-surface p-6 font-body text-sm text-muted ring-1 ring-line">
            No recorded MVP performances yet — the grind continues.
          </p>
        )}
      </section>

      <section className="clip-notch relative mt-14 overflow-hidden bg-surface p-10 text-center ring-1 ring-venom/25">
        <h2 className="font-display text-xl font-black tracking-wide uppercase">
          Want <span className="text-venom">{player.ign}</span> on your side of the
          bracket?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-muted">
          Tryouts are open for Mythic+ players. Come earn a spot on the strike
          team.
        </p>
        <div className="mt-6 flex justify-center">
          <GlowButton href="/recruit">Apply for Tryouts</GlowButton>
        </div>
      </section>
    </article>
  );
}
