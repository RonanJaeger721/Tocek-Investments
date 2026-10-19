import { publicRoutes, siteUrl } from "@/lib/content";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: siteUrl + route,
    changeFrequency: route.startsWith("/seeds") ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route === "/seeds" ? 0.9 : 0.6,
  }));
}
