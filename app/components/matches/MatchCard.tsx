import type { JSX } from "react";
import Link from "next/link";
import { getPlayerById, type Match } from "@/app/data/squad";

type MatchCardProps = {
  match: Match;
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const MatchCard = ({ match }: MatchCardProps): JSX.Element => {
  const mvp = match.mvp ? getPlayerById(match.mvp) : undefined;
  const win = match.result === "win";

  return (
    <Link
      href={`/matches/${match.id}`}
      className={`clip-notch group relative flex flex-wrap items-center gap-x-5 gap-y-3 bg-surface p-4 ring-1 transition-all duration-300 sm:flex-nowrap ${
        win
          ? "ring-line hover:shadow-[0_0_24px_rgba(162, 89, 255,0.15)]"
          : "ring-red-500/20 hover:shadow-[0_0_24px_rgba(244,63,94,0.12)]"
      }`}
    >
      <span
        className={`absolute top-0 left-0 h-full w-0.75 ${win ? "bg-venom" : "bg-red-500"}`}
        style={{ boxShadow: win ? "0 0 10px rgba(162, 89, 255,0.7)" : "0 0 10px rgba(244,63,94,0.7)" }}
      />

      <div className="flex min-w-14 flex-col items-center">
        <span
          className={`font-display text-lg font-black ${win ? "text-venom" : "text-red-400"}`}
        >
          {win ? "W" : "L"}
        </span>
        <span className="font-body text-[10px] tracking-wider text-muted uppercase">
          {formatDate(match.date)}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-base font-bold text-foreground">
          vs <span className="group-hover:text-venom">{match.opponent}</span>
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <span className="bg-surface-raised px-1.5 py-0.5 font-body text-[11px] font-semibold text-muted">
            {match.format}
          </span>
          {match.tournament && (
            <span className="truncate font-body text-[11px] text-toxic/90">
              {match.tournament}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-display text-xl font-black tracking-wider text-foreground tabular-nums">
          {match.score[0]} : {match.score[1]}
        </span>
        {mvp && (
          <span
            title={`MVP: ${mvp.ign}`}
            className="hidden clip-notch-sm bg-venom/10 px-2 py-1 font-display text-[10px] font-bold tracking-widest text-venom uppercase ring-1 ring-venom/30 group-hover:shadow-[0_0_12px_rgba(162, 89, 255,0.4)] sm:block"
          >
            MVP {mvp.ign}
          </span>
        )}
      </div>
    </Link>
  );
};

export default MatchCard;
