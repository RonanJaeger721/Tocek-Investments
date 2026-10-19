import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function ArrowLink({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`arrow-link ${light ? "light" : ""} ${className}`}
      href={href}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: ReactNode;
  outline?: boolean;
}) {
  return (
    <Link href={href} className={`button ${outline ? "outline" : ""}`}>
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export const label = (text: string) => (
  <span className="eyebrow">
    <span className="tiny-seed" aria-hidden="true" />
    {text}
  </span>
);
const illustrated = [
  "soyabeans",
  "beans",
  "millet",
  "groundnuts",
  "cowpeas",
  "finger-millet",
];
export function cropSrc(name: string) {
  return `/images/${name}.${illustrated.includes(name) ? "svg" : "webp"}`;
}
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 60vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={cropSrc(name)}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        quality={85}
      />
    </div>
  );
}
export function PageHero({
  kicker,
  title,
  italic,
  description,
  image = "wheat",
}: {
  kicker: string;
  title: string;
  italic?: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      <Photo
        name={image}
        alt={
          illustrated.includes(image)
            ? "Agricultural crop study — botanical illustration"
            : "Agricultural crop study — illustrative photography"
        }
        priority
      />
      <div className="page-hero-shade" />
      <div className="container page-hero-content">
        {label(kicker)}
        <h1>
          {title}
          {italic && (
            <>
              <br />
              <em>{italic}</em>
            </>
          )}
        </h1>
        <p>{description}</p>
      </div>
      <span className="image-caption">
        AGRICULTURAL PERSPECTIVES · ILLUSTRATIVE IMAGERY
      </span>
    </section>
  );
}
export function PartnershipCTA() {
  return (
    <section className="partnership-cta">
      <div className="container">
        <div>
          {label("The next chapter")}
          <h2>
            Good things grow
            <br />
            from <em>great partnerships.</em>
          </h2>
        </div>
        <div>
          <p>
            From your next growing season to your next market. Let’s explore
            what we can build together.
          </p>
          <ButtonLink href="/partnerships">Explore a partnership</ButtonLink>
        </div>
      </div>
    </section>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((it, i) => (
        <span key={i}>
          <ArrowRight size={11} aria-hidden="true" />
          {it.href ? (
            <Link href={it.href}>{it.label}</Link>
          ) : (
            <span aria-current="page">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
