"use client";

import type { JSX } from "react";
import { useState } from "react";
import PlayerCard from "./PlayerCard";
import type { Player, Role } from "@/app/data/squad";

const FILTERS: ("All" | Role)[] = ["All", "Jungler", "Mid", "EXP", "Gold", "Roam"];

type RosterGridProps = {
  players: Player[];
};

const RosterGrid = ({ players }: RosterGridProps): JSX.Element => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered =
    filter === "All" ? players : players.filter((p) => p.role === filter);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`clip-notch-sm px-4 py-2 font-display text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 ${
              filter === f
                ? "bg-venom text-background shadow-[0_0_18px_rgba(124,252,0,0.4)]"
                : "bg-surface text-muted ring-1 ring-line hover:text-foreground hover:ring-venom/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((player, i) => (
          <div
            key={`${filter}-${player.id}`}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <PlayerCard player={player} />
          </div>
        ))}
      </div>
    </>
  );
};

export default RosterGrid;
