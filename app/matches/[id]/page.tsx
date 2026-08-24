import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import GlowButton from "@/app/components/ui/GlowButton";
import { getMatchById, getPlayerById, matches } from "@/app/data/squad";

export function generateStaticParams() {
  return matches.map((m) => ({ id: m.id }));
}

export async function generateMetadata(
  props: PageProps<"/matches/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const match = getMatchById(id);
  if (!match) return { title: "Match Not Found" };
  const score = `${match.score[0]}-${match.score[1]}`;
  return {
    title: `vs ${match.opponent} (${score})`,
    description: `${match.tournament ?? "Scrim block"} — ${match.format} ${match.result === "win" ? "win" : "loss"} against ${match.opponent}.`,
  };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default async function MatchPage(props: PageProps<"/matches/[id]">) {
  const { id } = await props.params;
  const match = getMatchById(id);
  if (!match) notFound();

  const mvp = match.mvp ? getPlayerById(match.mvp) : undefined;
  const win = match.result === "win";

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/matches"
        className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide text-muted transition-colors hover:text-venom"
      >
        ← Back to Match History
      </Link>

      <header className="clip-notch mt-6 bg-surface p-8 text-center ring-1 ring-line sm:p-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span
            className={`clip-notch-sm px-3 py-1 font-display text-[10px] font-bold tracking-[0.2em] uppercase ${
              win
                ? "bg-venom/15 text-venom ring-1 ring-venom/40"
                : "bg-red-500/15 text-red-400 ring-1 ring-red-500/40"
            }`}
          >
            {win ? "Victory" : "Defeat"}
          </span>
          {match.tournament && (
            <span className="clip-notch-sm bg-toxic/10 px-3 py-1 font-display text-[10px] font-bold tracking-[0.2em] text-toxic uppercase ring-1 ring-toxic/40">
              {match.tournament}
            </span>
          )}
        </div>

        <h1 className="mt-6 font-display text-2xl font-black tracking-wide uppercase sm:text-4xl">
          VenomVanguard <span className="text-muted">vs</span>{" "}
          <span className={win ? "text-venom" : "text-red-400"}>{match.opponent}</span>
        </h1>

        <p className="mt-2 font-display text-7xl font-black tracking-wider tabular-nums sm:text-8xl">
          <span className={win ? "text-venom" : "text-muted"}>
            {match.score[0]}
          </span>
          <span className="mx-3 text-muted">:</span>
          <span className={win ? "text-muted" : "text-red-400"}>
            {match.score[1]}
          </span>
        </p>

        <p className="mt-4 font-body text-sm tracking-wide text-muted">
          {formatDate(match.date)} · {match.format}
        </p>
      </header>

      {(mvp || match.notes) && (
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {mvp && (
            <Link
              href={`/roster/${mvp.id}`}
              className="clip-notch group flex items-center gap-4 bg-surface p-5 ring-1 ring-venom/30 transition-shadow hover:shadow-[0_0_24px_rgba(168, 85, 247,0.18)]"
            >
              <span className="clip-notch-sm flex h-12 w-12 shrink-0 items-center justify-center bg-venom/15 font-display text-base font-black text-venom ring-1 ring-venom/40">
                MVP
              </span>
              <div>
                <p className="font-display text-base font-bold tracking-wide uppercase transition-colors group-hover:text-venom">
                  {mvp.ign}
                </p>
                <p className="font-body text-xs text-muted">
                  Series MVP — tap to view profile
                </p>
              </div>
            </Link>
          )}
          {match.notes && (
            <div className="clip-notch bg-surface p-5 ring-1 ring-line">
              <p className="font-display text-[10px] font-bold tracking-[0.25em] text-muted uppercase">
                Notes
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                {match.notes}
              </p>
            </div>
          )}
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-4 font-display text-sm font-bold tracking-[0.25em] text-muted uppercase">
          Game by Game
        </h2>
        {match.games && match.games.length > 0 ? (
          <ol className="space-y-2.5">
            {match.games.map((game) => {
              const gameMvp = game.mvp ? getPlayerById(game.mvp) : undefined;
              return (
                <li
                  key={game.game}
                  className={`clip-notch flex flex-wrap items-center gap-x-4 gap-y-1 bg-surface p-4 ring-1 ${
                    game.win ? "ring-line" : "ring-red-500/20"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center font-display text-sm font-black text-muted ring-1 ring-line">
                    {game.game}
                  </span>
                  <span
                    className={`font-display text-lg font-black ${
                      game.win ? "text-venom" : "text-red-400"
                    }`}
                  >
                    {game.win ? "W" : "L"}
                  </span>
                  <span className="ml-auto font-body text-sm text-muted tabular-nums">
                    {game.duration}
                  </span>
                  {gameMvp && (
                    <Link
                      href={`/roster/${gameMvp.id}`}
                      className="clip-notch-sm bg-surface-raised px-2 py-1 font-display text-[10px] font-bold tracking-widest text-venom uppercase ring-1 ring-venom/25 transition-shadow hover:shadow-[0_0_10px_rgba(168, 85, 247,0.35)]"
                    >
                      MVP {gameMvp.ign}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="clip-notch bg-surface p-6 font-body text-sm text-muted ring-1 ring-line">
            No game-by-game data was recorded for this series.
          </p>
        )}
      </section>

      <div className="mt-14 flex flex-wrap justify-center gap-3">
        <GlowButton href="/matches" variant="outline">
          All Matches
        </GlowButton>
        <GlowButton href="/schedule">Next Events</GlowButton>
      </div>
    </article>
  );
}
