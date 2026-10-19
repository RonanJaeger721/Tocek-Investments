import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sprout, Fingerprint, Globe2 } from "lucide-react";
import {
  Photo,
  ArrowLink,
  ButtonLink,
  label,
  PartnershipCTA,
} from "@/components/ui";
import { ScrollCue, SeedAtlas, PresenceMap } from "@/components/experience";
import { resourceItems } from "@/lib/content";
import { SeedStory } from "@/components/seed-story";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Photo
          name="hero"
          alt="Golden evening light across a maize field — illustrative agricultural photography"
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-topline">
          <span>ROOTED IN ZIMBABWE</span>
          <span>AGRICULTURE / INNOVATION / PARTNERSHIPS</span>
        </div>
        <div className="container hero-content">
          <div className="hero-kicker">
            <span /> THE POTENTIAL IN EVERY SEED
          </div>
          <h1>
            Growing possibilities.
            <br />
            <em>Beyond borders.</em>
          </h1>
          <div className="hero-bottom">
            <div>
              <p>
                A Zimbabwean agricultural enterprise.
                <br />A shared ambition for what grows next.
              </p>
              <div className="hero-actions">
                <ButtonLink href="/seeds">Explore our seeds</ButtonLink>
                <ArrowLink href="/about" light>
                  Discover Tocek
                </ArrowLink>
              </div>
            </div>
            <Link href="/partnerships" className="hero-partner">
              <span>
                Good partnerships.
                <br />
                Greater possibilities.
              </span>
              <span className="circle-arrow">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          </div>
        </div>
        <div className="container hero-foot">
          <ScrollCue />
          <span>01 — A NEW PERSPECTIVE ON GROWTH</span>
        </div>
        <span className="hero-vertical">TOCEK INVESTMENTS / ZIMBABWE</span>
      </section>
      <section className="introduction container" id="introduction">
        <div className="intro-heading" data-reveal>
          {label("A business built around growth")}
          <h2>
            Small beginnings.
            <br />
            <em>Extraordinary potential.</em>
          </h2>
        </div>
        <div className="intro-copy" data-reveal>
          <p className="lead">
            Every growing season begins with a decision. We believe the right
            seed is a powerful place to start.
          </p>
          <p>
            Tocek Investments brings together seed production, processing and
            distribution with a focus on productive agriculture. Rooted in
            Zimbabwe, our business connects growers, agricultural enterprises
            and partners through our agricultural brand, Zadzamatura.
          </p>
          <ArrowLink href="/about">Get to know Tocek</ArrowLink>
        </div>
        <div className="intro-baseline">
          <span>
            <Sprout size={18} />
            SEED & AGRICULTURE
          </span>
          <span>
            <Fingerprint size={18} />
            ZIMBABWEAN ROOTS
          </span>
          <span>
            <Globe2 size={18} />
            INTERNATIONAL OUTLOOK
          </span>
        </div>
      </section>
      <SeedStory />
      <SeedAtlas />
      <section className="production-section">
        <div className="production-visual">
          <Photo
            name="seed-detail"
            alt="AI-generated illustrative maize seed detail, not a specific Tocek variety"
          />
          <div className="photo-note">
            THE CARE BEHIND THE CROP
            <br />
            <span>From production to possibility.</span>
          </div>
        </div>
        <div className="production-copy" data-reveal>
          {label("The work behind the seed")}
          <h2>
            More than a product.
            <br />
            <em>A considered process.</em>
          </h2>
          <p>
            Good agriculture depends on what happens before the growing season.
            Our work spans contracted seed production, processing, packing and
            distribution.
          </p>
          <div className="process-lines">
            <Link href="/solutions/seed-production">
              <span>01</span>
              <h3>Seed production</h3>
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/solutions/seed-production">
              <span>02</span>
              <h3>Processing & packing</h3>
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/research/quality">
              <span>03</span>
              <h3>A focus on quality</h3>
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <ArrowLink href="/solutions" light>
            Explore our capabilities
          </ArrowLink>
        </div>
      </section>
      <section className="research-section container">
        <div className="research-title" data-reveal>
          {label("Research & innovation")}
          <h2>
            Looking closer.
            <br />
            <em>Thinking further.</em>
          </h2>
          <p>
            Progress begins with curiosity. Field evaluation helps connect crop
            development with the realities of agriculture.
          </p>
          <ArrowLink href="/research">Inside our research approach</ArrowLink>
        </div>
        <div className="research-photo" data-reveal>
          <Photo
            name="new-growth"
            alt="AI-generated illustrative young maize plant emerging from agricultural soil"
          />
          <div className="research-caption">
            <span>THE FIELD IS OUR STARTING POINT</span>
            <span>Observation. Evaluation. Understanding.</span>
          </div>
        </div>
      </section>
      <section className="global-section">
        <div className="container">
          <div className="global-heading" data-reveal>
            <div>
              {label("An international outlook")}
              <h2>
                Local roots.
                <br />
                <em>A wider horizon.</em>
              </h2>
            </div>
            <div>
              <p>
                Our roots are in Zimbabwe. Our ambition reaches further, through
                productive relationships and conversations across borders.
              </p>
              <ArrowLink href="/global-presence" light>
                Discover our outlook
              </ArrowLink>
            </div>
          </div>
          <PresenceMap />
        </div>
      </section>
      <section className="field-feature">
        <Photo
          name="hero"
          alt="Sunlight illuminating a maize field — illustrative photography"
        />
        <div className="field-feature-content" data-reveal>
          <span className="eyebrow">THE REASON WE GROW</span>
          <h2>
            Because every field
            <br />
            holds <em>a possibility.</em>
          </h2>
          <p>
            For farmers. For communities.
            <br />
            For the seasons still to come.
          </p>
        </div>
        <span className="image-caption">
          ILLUSTRATIVE AGRICULTURAL PHOTOGRAPHY
        </span>
      </section>
      <section className="audiences container">
        <div className="audience-visual">
          <Photo
            name="crop-still-life"
            alt="AI-generated illustrative crop still life of beans, soyabeans, cowpeas and sorghum"
          />
          <div className="audience-visual-copy" data-reveal>
            {label("Grow with Tocek")}
            <h2>
              Your field.
              <br />
              Your business.
              <br />
              <em>Our next conversation.</em>
            </h2>
          </div>
        </div>
        <div className="audience-links" data-reveal>
          {[
            {
              n: "01",
              title: "For farmers",
              desc: "Explore crops, request product information and prepare for a conversation about your next season.",
              href: "/resources",
            },
            {
              n: "02",
              title: "For distributors",
              desc: "Discuss your market, supply requirements and interest in working with Tocek.",
              href: "/distribution",
            },
            {
              n: "03",
              title: "For partners",
              desc: "Start a discussion around production, technical collaboration or international business.",
              href: "/partnerships",
            },
          ].map((a) => (
            <Link href={a.href} key={a.n}>
              <span>{a.n}</span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <section className="home-resources">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              {label("Knowledge for the conversation")}
              <h2>
                A more informed
                <br />
                <em>starting point.</em>
              </h2>
            </div>
            <ArrowLink href="/resources">Visit the resource centre</ArrowLink>
          </div>
          <div className="editorial-grid">
            {resourceItems.slice(0, 2).map((r, i) => (
              <Link
                href={`/resources/${r.slug}`}
                key={r.slug}
                className={`editorial-feature feature-${i}`}
                data-reveal
              >
                <Photo name={r.image} alt="Illustrative crop photography" />
                <div>
                  <span className="eyebrow">{r.category} / ENQUIRY GUIDE</span>
                  <h3>{r.title}</h3>
                  <ArrowUpRight size={24} />
                </div>
              </Link>
            ))}
          </div>
          <div className="news-note">
            <div>
              <span className="eyebrow">FROM TOCEK</span>
              <h3>Company news & updates</h3>
              <p>Follow the next chapter of our agricultural business.</p>
            </div>
            <ArrowLink href="/insights">Visit our newsroom</ArrowLink>
          </div>
        </div>
      </section>
      <PartnershipCTA />
    </>
  );
}
