import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getSortedNews, newsPosts } from "@/app/data/squad";

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/news/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return { title: post.title, description: post.excerpt };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default async function NewsArticlePage(
  props: PageProps<"/news/[slug]">,
) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = getSortedNews()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <Link
        href="/news"
        className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide text-muted transition-colors hover:text-venom"
      >
        ← All News
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="clip-notch-sm bg-venom/15 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.18em] text-venom uppercase ring-1 ring-venom/40">
            {post.tag}
          </span>
          <span className="font-body text-xs tracking-wide text-muted">
            {formatDate(post.date)}
          </span>
        </div>
        <h1 className="mt-4 font-display text-2xl font-black tracking-wide uppercase sm:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 border-l-2 border-venom/60 pl-4 font-body text-base italic leading-relaxed text-muted">
          {post.excerpt}
        </p>
      </header>

      <div className="mt-8 space-y-5">
        {post.body.map((paragraph, i) => (
          <p key={i} className="font-body text-base leading-relaxed text-muted sm:text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {others.length > 0 && (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="mb-5 font-display text-sm font-bold tracking-[0.25em] text-muted uppercase">
            More From the Den
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/news/${other.slug}`}
                className="clip-notch bg-surface p-5 ring-1 ring-line transition-shadow hover:shadow-[0_0_20px_rgba(162, 89, 255,0.12)]"
              >
                <p className="font-display text-[10px] font-bold tracking-[0.2em] text-toxic uppercase">
                  {other.tag} · {formatDate(other.date)}
                </p>
                <p className="mt-2 font-body text-base font-bold leading-snug transition-colors hover:text-venom">
                  {other.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
