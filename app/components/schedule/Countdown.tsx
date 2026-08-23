"use client";

import { useEffect, useState } from "react";

const parts = (ms: number) => ({
  days: Math.floor(ms / 86_400_000),
  hours: Math.floor((ms % 86_400_000) / 3_600_000),
  minutes: Math.floor((ms % 3_600_000) / 60_000),
  seconds: Math.floor((ms % 60_000) / 1000),
});

type CountdownProps = {
  target: string;
};

const Countdown = ({ target }: CountdownProps): React.JSX.Element => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNow(Date.now()));
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, []);

  if (now === null) {
    return (
      <div className="flex justify-center gap-2" aria-hidden>
        {["--", "--", "--", "--"].map((v, i) => (
          <div
            key={i}
            className="clip-notch-sm flex h-16 w-16 flex-col items-center justify-center bg-surface ring-1 ring-line"
          >
            <span className="font-display text-xl font-black text-muted">{v}</span>
            <span className="font-body text-[9px] tracking-[0.2em] text-muted uppercase">
              &nbsp;
            </span>
          </div>
        ))}
      </div>
    );
  }

  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return <></>;

  const { days, hours, minutes, seconds } = parts(diff);
  const units = [
    { label: "Days", value: days },
    { label: "Hrs", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];

  return (
    <div className="flex justify-center gap-2" role="timer" aria-label="Countdown to next event">
      {units.map((u) => (
        <div
          key={u.label}
          className="clip-notch-sm flex h-16 w-16 flex-col items-center justify-center bg-surface ring-1 ring-venom/30 sm:h-[4.5rem] sm:w-[4.5rem]"
        >
          <span className="font-display text-xl font-black text-venom tabular-nums sm:text-2xl">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="font-body text-[9px] font-semibold tracking-[0.2em] text-muted uppercase">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
