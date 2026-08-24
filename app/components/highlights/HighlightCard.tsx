"use client";

import { useState } from "react";
import type { Highlight } from "@/app/data/squad";

type HighlightCardProps = {
  item: Highlight;
  playerIgn?: string;
};

const HighlightCard = ({ item, playerIgn }: HighlightCardProps): React.JSX.Element => {
  const [playing, setPlaying] = useState(false);

  if (item.platform === "youtube" && item.videoId) {
    return (
      <div
        className="clip-notch group relative aspect-video w-full overflow-hidden bg-surface ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_0_26px_rgba(168, 85, 247,0.2)]"
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${item.title}`}
            className="group/btn absolute inset-0 h-full w-full text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover/btn:opacity-80"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent" />
            <span className="animate-pulse-glow absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-venom/90 text-background transition-transform group-hover/btn:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
        <div className="pointer-events-none absolute right-3 bottom-3 left-3">
          <p className="font-body text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {item.title}
          </p>
          {playerIgn && (
            <p className="font-body text-[10px] font-semibold tracking-[0.2em] text-venom uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {playerIgn}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <a
      href={item.url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="clip-notch group relative flex aspect-video w-full flex-col justify-end overflow-hidden bg-surface p-4 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_0_26px_rgba(217, 70, 239,0.25)]"
    >
      <span className="grid-bg absolute inset-0 opacity-50" />
      <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-black text-toxic/15 transition-transform duration-500 group-hover:scale-110">
        VV
      </span>
      <span className="clip-notch-sm absolute top-3 left-3 bg-toxic/20 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.25em] text-toxic uppercase ring-1 ring-toxic/40 backdrop-blur-sm">
        TikTok ↗
      </span>
      <p className="relative font-body text-sm font-bold text-white">{item.title}</p>
      {playerIgn && (
        <p className="relative font-body text-[10px] font-semibold tracking-[0.2em] text-toxic uppercase">
          {playerIgn}
        </p>
      )}
    </a>
  );
};

export default HighlightCard;
