import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import Countdown from "@/app/components/schedule/Countdown";
import {
  getNextEvent,
  getPastEvents,
  getUpcomingEvents,
  type EventType,
} from "@/app/data/squad";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Venom Vanguard scrim blocks, tournament dates, training nights, and streams.",
};

const TYPE_STYLES: Record<EventType, string> = {
  Scrim: "bg-sky-500/10 text-sky-400 ring-sky-500/40",
  Tournament: "bg-venom/15 text-venom ring-venom/40",
  Training: "bg-toxic/10 text-toxic ring-toxic/40",
  Stream: "bg-orange-500/10 text-orange-400 ring-orange-500/40",
};

const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
};

export default function SchedulePage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents().slice(0, 5);
  const next = getNextEvent();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Mark Your Calendar"
        title="Schedule & Events"
        description="Scrim blocks, tournament runs, and stream nights — all times in squad local time."
      />

      {next && (
        <ScrollReveal className="mx-auto mt-12 max-w-3xl">
          <div className="clip-notch bg-surface p-8 text-center ring-1 ring-venom/30">
            <p className="font-display text-[11px] font-bold tracking-[0.3em] text-venom uppercase">
              Next Up
            </p>
            <h2 className="mt-2 font-display text-xl font-black tracking-wide uppercase sm:text-2xl">
              {next.title}
            </h2>
            <p className="mt-1 font-body text-sm text-muted">
              {new Date(`${next.date}T00:00:00`).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              · {formatTime(next.time)}
              {next.opponent ? ` · vs ${next.opponent}` : ""}
            </p>
            <div className="mt-6">
              <Countdown target={`${next.date}T${next.time}:00`} />
            </div>
          </div>
        </ScrollReveal>
      )}

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        <h2 className="font-display text-sm font-bold tracking-[0.25em] text-muted uppercase">
          Upcoming
        </h2>
        {upcoming.map((event, i) => (
          <div
            key={event.id}
            className="clip-notch animate-fade-up flex flex-wrap items-center gap-x-4 gap-y-2 bg-surface p-4 ring-1 ring-line"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="flex w-20 shrink-0 flex-col items-center border-r border-line pr-4">
              <span className="font-display text-xl font-black text-venom">
                {new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", {
                  day: "numeric",
                })}
              </span>
              <span className="font-body text-[10px] font-semibold tracking-[0.15em] text-muted uppercase">
                {new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-body text-base font-bold">{event.title}</p>
              <p className="mt-0.5 font-body text-xs text-muted">
                {formatTime(event.time)}
                {event.opponent ? ` · vs ${event.opponent}` : ""}
                {event.notes ? ` — ${event.notes}` : ""}
              </p>
            </div>
            <span
              className={`clip-notch-sm px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.18em] uppercase ring-1 ${TYPE_STYLES[event.type]}`}
            >
              {event.type}
            </span>
          </div>
        ))}
        {upcoming.length === 0 && (
          <p className="clip-notch bg-surface p-6 font-body text-sm text-muted ring-1 ring-line">
            Nothing on the calendar right now — new blocks drop every Sunday.
          </p>
        )}
      </div>

      {past.length > 0 && (
        <div className="mx-auto mt-12 max-w-3xl space-y-3 opacity-70">
          <h2 className="font-display text-sm font-bold tracking-[0.25em] text-muted uppercase">
            Recently Passed
          </h2>
          {past.map((event) => (
            <div
              key={event.id}
              className="clip-notch flex flex-wrap items-center gap-x-4 gap-y-1 bg-surface/60 p-3.5 ring-1 ring-line"
            >
              <span className="w-24 shrink-0 font-body text-xs text-muted">
                {new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="min-w-0 flex-1 truncate font-body text-sm font-semibold text-muted line-through decoration-muted/50">
                {event.title}
              </span>
              <span
                className={`clip-notch-sm px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.18em] uppercase ring-1 ${TYPE_STYLES[event.type]}`}
              >
                {event.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
