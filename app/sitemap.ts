import type { MetadataRoute } from "next";
import { SITE } from "@/app/constants/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/roster",
    "/matches",
    "/schedule",
    "/news",
    "/stats",
    "/highlights",
    "/gallery",
    "/about",
    "/contact",
    "/recruit",
  ];
  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
