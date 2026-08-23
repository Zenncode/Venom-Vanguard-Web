import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";
import { galleryItems } from "@/app/data/squad";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Venom Vanguard media — event photos, match screenshots, and the best squad memes.",
};

export default function GalleryPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Media Vault"
        title="Gallery"
        description="Trophy shots, highlight frames, and the memes that keep the Discord alive."
      />
      <div className="mt-12">
        <GalleryGrid items={galleryItems} />
      </div>
    </section>
  );
}
