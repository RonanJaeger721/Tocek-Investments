import { ContentPage } from "@/components/pages";
import {
  crops,
  varieties,
  resourceItems,
  pageInfo,
  publicRoutes,
  siteUrl,
  news,
} from "@/lib/content";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const info =
    pageInfo[path] ||
    (() => {
      if (slug[0] === "seeds") {
        const crop = crops.find((c) => c.slug === slug[1]);
        const variety = varieties.find(
          (v) => v.slug === slug[2] && v.crop === slug[1],
        );
        if (variety)
          return {
            title: `${variety.name} ${crop?.name}`,
            description: variety.description,
          };
        if (crop && slug.length === 2)
          return { title: `${crop.name} seed`, description: crop.description };
      }
      const article = news.find((a) => path === `/insights/${a.slug}`);
      if (article)
        return { title: article.title, description: article.summary };
      const r = resourceItems.find((r) => path === `/resources/${r.slug}`);
      if (r) return { title: r.title, description: r.summary };
      return {
        title: "Page not found",
        description: "Explore Tocek Investments.",
      };
    })();
  return {
    title: info.title,
    description: info.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${info.title} | Tocek Investments`,
      description: info.description,
      url: siteUrl + path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      siteName: "Tocek Investments",
      type: "website",
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <ContentPage path={"/" + slug.join("/")} />;
}
