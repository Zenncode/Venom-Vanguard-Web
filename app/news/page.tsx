import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import { getSortedNews, type NewsPost } from "@/app/data/squad";

export const metadata: Metadata = {
  title: "News",
  description:
    "Venom Vanguard announcements, tournament recaps, and roster updates.",
};

const TAG_STYLES: Record<NewsPost["tag"], string> = {
  Announcement: "bg-venom/15 text-venom ring-venom/40",
  Tournament: "bg-toxic/10 text-toxic ring-toxic/40",
  Roster: "bg-sky-500/10 text-sky-400 ring-sky-500/40",
  Recap: "bg-orange-500/10 text-orange-400 ring-orange-500/40",
};

export default function NewsPage() {
  const posts = getSortedNews();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Squad Feed"
        title="News & Announcements"
        description="Tournament recaps, roster moves, and everything happening in the den."
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-5">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 80}>
            <Link
              href={`/news/${post.slug}`}
              className="clip-notch group block bg-surface p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(124,252,0,0.14)] sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`clip-notch-sm px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.18em] uppercase ring-1 ${TAG_STYLES[post.tag]}`}
                >
                  {post.tag}
                </span>
                <span className="font-body text-xs tracking-wide text-muted">
                  {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="mt-3 font-display text-lg font-bold tracking-wide transition-colors group-hover:text-venom sm:text-xl">
                {post.title}
              </h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                {post.excerpt}
              </p>
              <p className="mt-4 font-display text-[11px] font-bold tracking-[0.2em] text-venom uppercase">
                Read Article →
              </p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
