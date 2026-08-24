import Link from "next/link";
import HeroBanner from "@/app/components/home/HeroBanner";
import StatStrip from "@/app/components/home/StatStrip";
import PlayerCard from "@/app/components/roster/PlayerCard";
import MatchCard from "@/app/components/matches/MatchCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import GlowButton from "@/app/components/ui/GlowButton";
import {
  achievements,
  getFeaturedPlayers,
  getLatestMatches,
} from "@/app/data/squad";
import { SITE } from "@/app/constants/site";

const SOCIALS = [
  { href: SITE.discord, label: "Discord" },
  { href: SITE.facebook, label: "Facebook" },
  { href: SITE.tiktok, label: "TikTok" },
];

export default function Home() {
  const featured = getFeaturedPlayers(3);
  const latest = getLatestMatches(3);
  const trophies = [...achievements]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <>
      <HeroBanner />
      <StatStrip />

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="The Strike Team"
          title="Featured Members"
          description="The core five plus our flex — every lane locked down by players who live for the clutch."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((player, i) => (
            <ScrollReveal key={player.id} delay={i * 110}>
              <PlayerCard player={player} />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-10 text-center">
          <GlowButton href="/roster" variant="outline">
            View Full Roster
          </GlowButton>
        </ScrollReveal>
      </section>

      <section className="border-y border-line bg-surface/30 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            kicker="Recent Clashes"
            title="Latest Results"
            description="Fresh off the server — tournament runs and scrim blocks."
          />
          <div className="mt-10 space-y-3">
            {latest.map((match, i) => (
              <ScrollReveal key={match.id} delay={i * 90} direction="left">
                <MatchCard match={match} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-8">
            <GlowButton href="/matches" variant="outline">
              Full Match History
            </GlowButton>
          </ScrollReveal>
        </div>
      </section>

      <section className="overflow-hidden py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Trophy Room"
            title="Achievements"
            description="Every placement earned in official tournaments."
          />
        </div>
        <div className="relative mt-12 flex w-max animate-marquee gap-5 [animation-play-state:running] hover:[animation-play-state:paused]">
          {[...trophies, ...trophies].map((a, i) => (
            <div
              key={`${a.id}-${i}`}
              className="clip-notch flex w-[320px] shrink-0 items-center gap-4 bg-surface p-5 ring-1 ring-line"
            >
              <span
                className={`clip-notch-sm flex h-12 w-12 shrink-0 items-center justify-center font-display text-sm font-black ${
                  a.placement === "1st"
                    ? "bg-venom/15 text-venom ring-1 ring-venom/40"
                    : "bg-toxic/10 text-toxic ring-1 ring-toxic/40"
                }`}
              >
                {a.placement === "1st" ? "1st" : a.placement}
              </span>
              <div className="min-w-0">
                <p className="truncate font-body text-base font-bold text-foreground">
                  {a.title}
                </p>
                <p className="font-body text-xs tracking-wide text-muted">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="clip-notch relative overflow-hidden bg-surface p-10 text-center ring-1 ring-venom/25 sm:p-14">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(168, 85, 247,0.14), transparent), radial-gradient(ellipse 40% 60% at 85% -10%, rgba(217, 70, 239,0.12), transparent)",
              }}
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-black tracking-wide uppercase sm:text-3xl">
                Ready to <span className="text-glow text-venom">Strike With Us?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-body text-base text-muted">
                Tryouts open — any rank welcome. Join the Discord, drop your stats,
                and show us your hero pool.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clip-notch-sm bg-surface-raised px-5 py-2.5 font-display text-xs font-bold tracking-wider text-muted uppercase ring-1 ring-line transition-all hover:text-venom hover:shadow-[0_0_16px_rgba(168, 85, 247,0.3)] hover:ring-venom/50"
                  >
                    {social.label}
                  </a>
                ))}
                <Link
                  href="/recruit"
                  className="font-display text-xs font-bold tracking-[0.15em] text-venom uppercase underline decoration-venom/40 underline-offset-8 transition-colors hover:text-venom-bright"
                >
                  Or apply directly
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
