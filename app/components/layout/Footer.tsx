import type { JSX } from "react";
import Link from "next/link";
import Logo from "@/app/components/ui/Logo";
import { SITE } from "@/app/constants/site";

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97H15.83c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
    </svg>
  );
}

const SOCIALS = [
  { href: SITE.discord, label: "Discord", icon: <DiscordIcon /> },
  { href: SITE.facebook, label: "Facebook", icon: <FacebookIcon /> },
  { href: SITE.tiktok, label: "TikTok", icon: <TikTokIcon /> },
];

const FOOTER_LINKS = [
  { href: "/roster", label: "Roster" },
  { href: "/matches", label: "Matches" },
  { href: "/schedule", label: "Schedule" },
  { href: "/news", label: "News" },
  { href: "/stats", label: "Stats" },
  { href: "/highlights", label: "Highlights" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Footer = (): JSX.Element => {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm font-body text-sm text-muted">
            {SITE.tagline} An elite Mobile Legends: Bang Bang squad grinding from
            scrims to championships.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="clip-notch-sm flex h-10 w-10 items-center justify-center bg-surface text-muted ring-1 ring-line transition-all hover:text-venom hover:shadow-[0_0_16px_rgba(124,252,0,0.35)] hover:ring-venom/50"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xs font-bold tracking-[0.2em] text-venom uppercase">
            Navigate
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xs font-bold tracking-[0.2em] text-venom uppercase">
            Recruitment
          </h3>
          <p className="font-body text-sm text-muted">
            Think you have what it takes to carry the venom?
          </p>
          <Link
            href="/recruit"
            className="mt-3 inline-block clip-notch-sm bg-venom px-4 py-2 font-display text-xs font-bold tracking-wider text-background uppercase transition-all hover:shadow-[0_0_22px_rgba(124,252,0,0.55)]"
          >
            Try Out
          </Link>
        </div>
      </div>

      <div className="border-t border-line py-5">
        <p className="text-center font-body text-xs tracking-wide text-muted">
          © {new Date().getFullYear()} {SITE.name}. Not affiliated with Moonton.
          Mobile Legends: Bang Bang is a trademark of its respective owner.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
