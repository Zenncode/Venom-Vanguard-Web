"use client";

import type { JSX } from "react";
import Link from "next/link";
import TiltCard from "@/app/components/ui/TiltCard";
import RoleBadge from "@/app/components/ui/RoleBadge";
import type { Player } from "@/app/data/squad";

type PlayerCardProps = {
  player: Player;
};

const PlayerCard = ({ player }: PlayerCardProps): JSX.Element => {
  const initials = player.ign.slice(0, 2).toUpperCase();

  return (
    <TiltCard className="h-full">
      <Link
        href={`/roster/${player.id}`}
        className="clip-notch group flex h-full flex-col gap-4 bg-surface p-5 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(168, 85, 247,0.15)]"
      >
        <div className="flex items-start justify-between">
          <div
            className="clip-notch flex h-16 w-16 items-center justify-center font-display text-lg font-black"
            style={{
              color: player.captain ? "#a855f7" : "#f1ecfb",
              background: `linear-gradient(135deg, ${player.role === "Jungler" ? "#f43f5e22" : "#d946ef22"}, #14101f)`,
              boxShadow: `inset 0 0 0 1px rgba(168, 85, 247,0.25)`,
            }}
          >
            {initials}
          </div>
          {player.captain && (
            <span className="clip-notch-sm bg-venom/15 px-2 py-0.5 font-display text-[10px] font-bold tracking-widest text-venom uppercase ring-1 ring-venom/40">
              Captain
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display text-lg font-bold tracking-wide uppercase transition-colors group-hover:text-venom">
            {player.ign}
          </h3>
          <p className="font-body text-xs tracking-wide text-muted">{player.rank}</p>
        </div>

        <RoleBadge role={player.role} />

        <div>
          <div className="mb-1.5 flex items-baseline justify-between font-body text-xs text-muted">
            <span>Win Rate</span>
            <span className="font-display text-sm font-bold text-venom">
              {player.winRate}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden bg-background">
            <div
              className="h-full bg-gradient-to-r from-venom/60 to-venom shadow-[0_0_8px_rgba(168, 85, 247,0.6)]"
              style={{ width: `${player.winRate}%` }}
            />
          </div>
        </div>

        <div className="mt-auto border-t border-line pt-3">
          <p className="mb-2 font-body text-[10px] tracking-[0.2em] text-muted uppercase">
            Signature Heroes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {player.signatureHeroes.slice(0, 3).map((hero) => (
              <span
                key={hero.name}
                className="bg-surface-raised px-2 py-0.5 font-body text-[11px] font-semibold text-foreground/80"
              >
                {hero.name}
              </span>
            ))}
            {player.signatureHeroes.length > 3 && (
              <span className="px-1 py-0.5 font-body text-[11px] text-muted">
                +{player.signatureHeroes.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
};

export default PlayerCard;
