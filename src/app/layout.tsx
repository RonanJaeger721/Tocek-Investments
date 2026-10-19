import type { Metadata } from "next";
import { Manrope, DM_Serif_Display } from "next/font/google";
import { Navigation, Footer } from "@/components/navigation";
import { ScrollEffects } from "@/components/experience";
import { company, siteUrl } from "@/lib/content";
import "./globals.css";
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tocek Investments | Growing Possibilities. Beyond Borders.",
    template: "%s | Tocek Investments",
  },
  description: company.description,
  openGraph: {
    type: "website",
    siteName: "Tocek Investments",
    locale: "en_ZW",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tocek Investments — Growing possibilities. Beyond borders.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <ScrollEffects />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: company.legalName,
              url: siteUrl,
              description: company.description,
              telephone: company.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Plot K, Observatory Farm, Glenara Road, Mount Hampden",
                addressLocality: "Harare",
                addressCountry: "ZW",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
