"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import MatchCard from "./MatchCard";
import type { Match } from "@/app/data/squad";

type TypeFilter = "All" | "Tournaments" | "Scrims";
type ResultFilter = "All" | "win" | "loss";

type MatchesListProps = {
  matches: Match[];
};

const MatchesList = ({ matches }: MatchesListProps): JSX.Element => {
  const [type, setType] = useState<TypeFilter>("All");
  const [result, setResult] = useState<ResultFilter>("All");

  const filtered = useMemo(
    () =>
      matches.filter((m) => {
        if (
          type === "Tournaments" &&
          !m.tournament
        )
          return false;
        if (type === "Scrims" && m.format !== "Scrim") return false;
        if (result !== "All" && m.result !== result) return false;
        return true;
      }),
    [matches, type, result],
  );

  const chip =
    "clip-notch-sm px-3.5 py-1.5 font-display text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["All", "Tournaments", "Scrims"] as TypeFilter[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`${chip} ${
                type === t
                  ? "bg-venom text-background shadow-[0_0_16px_rgba(168, 85, 247,0.35)]"
                  : "bg-surface text-muted ring-1 ring-line hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(
            [
              { key: "All", label: "All" },
              { key: "win", label: "Wins" },
              { key: "loss", label: "Losses" },
            ] as { key: ResultFilter; label: string }[]
          ).map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setResult(r.key)}
              className={`${chip} ${
                result === r.key
                  ? r.key === "loss"
                    ? "bg-red-500 text-white shadow-[0_0_16px_rgba(244,63,94,0.35)]"
                    : r.key === "win"
                      ? "bg-venom text-background shadow-[0_0_16px_rgba(168, 85, 247,0.35)]"
                      : "bg-surface-raised text-foreground ring-1 ring-venom/50"
                  : "bg-surface text-muted ring-1 ring-line hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {filtered.map((match, i) => (
          <div
            key={`${type}-${result}-${match.id}`}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <MatchCard match={match} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="clip-notch bg-surface p-8 text-center font-body text-base text-muted ring-1 ring-line">
            No matches match this filter — the squad has been busy elsewhere.
          </p>
        )}
      </div>
    </>
  );
};

export default MatchesList;
