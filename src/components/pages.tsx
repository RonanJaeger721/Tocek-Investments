import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  Globe2,
  Sprout,
  ScanLine,
  FlaskConical,
  FileText,
  ArrowRight,
  Download,
} from "lucide-react";
import { notFound } from "next/navigation";
import {
  company,
  crops,
  varieties,
  resourceItems,
  pageInfo,
  news,
  siteUrl,
} from "@/lib/content";
import {
  PageHero,
  Photo,
  label,
  ArrowLink,
  ButtonLink,
  PartnershipCTA,
  Breadcrumb,
} from "./ui";
import {
  Catalogue,
  PresenceMap,
  ResourceBrowser,
  ShareButton,
} from "./experience";
import { EnquiryForm } from "./enquiry-form";

const deliveryEnabled = () =>
  !!(
    process.env.RESEND_API_KEY &&
    process.env.ENQUIRY_FROM &&
    process.env.ENQUIRY_TO &&
    process.env.TURNSTILE_SECRET_KEY &&
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  );
function Intro({
  kicker,
  title,
  children,
  image = "seed-detail",
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
  image?: string;
}) {
  return (
    <section className="container interior-intro">
      <div data-reveal>
        {label(kicker)}
        <h2>{title}</h2>
        <Photo
          name={image}
          alt="Illustrative agricultural seed and crop imagery"
          className="interior-intro-photo"
          sizes="(max-width:760px) 90vw, 42vw"
        />
      </div>
      <div className="reading-copy" data-reveal>
        {children}
      </div>
    </section>
  );
}
function ContactDetails() {
  return (
    <aside className="contact-details">
      <span className="eyebrow">ROOTED IN ZIMBABWE</span>
      <h2>
        A direct conversation.
        <br />
        <em>A good beginning.</em>
      </h2>
      <p>
        For product information, commercial supply or a partnership discussion,
        connect with Tocek.
      </p>
      <div>
        <Phone size={19} />
        <div>
          <span>TELEPHONE</span>
          <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
        </div>
      </div>
      <div>
        <MapPin size={19} />
        <div>
          <span>FIND US</span>
          <p>{company.address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Plot K Observatory Farm Glenara Road Mount Hampden Harare Zimbabwe")}`}
            target="_blank"
            rel="noreferrer"
          >
            Open location search <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div>
        <Globe2 size={19} />
        <div>
          <span>INTERNATIONAL ENQUIRIES</span>
          <p>
            Tell us your country, organisation and area of interest so we can
            discuss your requirements.
          </p>
        </div>
      </div>
      <figure className="contact-detail-image">
        <Photo
          name="new-growth"
          alt="AI-generated illustrative crop seedling, not a Tocek farm photograph"
        />
      </figure>
    </aside>
  );
}
function About() {
  return (
    <>
      <PageHero
        kicker="About Zadzamatura"
        title="Rooted in the land."
        italic="Focused on what’s next."
        description="A Zimbabwean agricultural business with seed at its heart and partnership in its outlook."
      />
      <Intro kicker="Who we are" title="The potential in every beginning.">
        <p className="lead">
          Tocek Investments is a Zimbabwean seed business involved in
          production, processing, packing and distribution.
        </p>
        <p>
          Our agricultural brand, Zadzamatura, brings our work closer to growers
          and agricultural customers. Our portfolio spans maize, small grains,
          legumes and other field crops, alongside agrochemical enquiries.
        </p>
        <p>
          We work with contracted seed growers. That connection between
          agricultural production and seed supply is central to our business.
        </p>
        <ArrowLink href="/about/our-story">Explore our story</ArrowLink>
      </Intro>
      <section className="purpose-band">
        <div className="container">
          {label("Our purpose")}
          <h2>
            Supporting productive agriculture
            <br />
            through{" "}
            <em>
              quality seed and
              <br />
              productive relationships.
            </em>
          </h2>
          <p>
            Our company profile sets out a focus on food security and balanced
            nutrition through staple cereal and legume crops.
          </p>
        </div>
      </section>
      <section className="about-pair container">
        <Photo name="sorghum" alt="Sorghum field — illustrative photography" />
        <div data-reveal>
          {label("The way we work")}
          <h2>
            Experience in the field.
            <br />
            <em>Care in the detail.</em>
          </h2>
          <p>
            Production, research, processing and distribution each contribute to
            the work behind the seed. Explore the activities that shape our
            business.
          </p>
          <ArrowLink href="/solutions">Our solutions</ArrowLink>
          <ArrowLink href="/about/our-values">Our values</ArrowLink>
        </div>
      </section>
      <PartnershipCTA />
    </>
  );
}
function Story() {
  return (
    <>
      <PageHero
        kicker="Our story"
        title="A Zimbabwean beginning."
        italic="A growing perspective."
        description="The roots of a business focused on seed, agriculture and productive relationships."
        image="hero"
      />
      <section className="container story-section">
        <div>
          {label("Our journey")}
          <h2>Grounded in agriculture.</h2>
          <p>
            Our story is shaped by the link between seed production and the
            people who grow it.
          </p>
        </div>
        <div className="timeline">
          {company.milestones.map((m) => (
            <article key={m.year}>
              <span>{m.year}</span>
              <div>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </div>
            </article>
          ))}
          <article className="timeline-present">
            <span>Our focus</span>
            <div>
              <h3>From seed to supply.</h3>
              <p>
                The company’s activities include contracted seed production,
                field evaluation, processing, packing and distribution.
              </p>
            </div>
          </article>
        </div>
      </section>
      <Intro
        kicker="The next chapter"
        title="Relationships that create possibility."
        image="crop-still-life"
      >
        <p className="lead">
          Tocek is developing international relationships while remaining rooted
          in Zimbabwe.
        </p>
        <p>
          We welcome conversations with distributors, growers and agricultural
          organisations interested in exploring a productive working
          relationship.
        </p>
        <ArrowLink href="/global-presence">
          Explore our international outlook
        </ArrowLink>
      </Intro>
      <PartnershipCTA />
    </>
  );
}
function Values() {
  return (
    <>
      <PageHero
        kicker="Our values"
        title="What we put in."
        italic="What we stand for."
        description="A considered approach to agriculture, product information and working relationships."
        image="sorghum"
      />
      <section className="container values-list">
        {[
          {
            title: "Care for the seed.",
            text: "Seed production and processing demand attention. Our agricultural work connects production, field evaluation, packing and supply.",
          },
          {
            title: "Respect for the grower.",
            text: "Farming decisions deserve useful information. We encourage customers to request current product details and discuss their individual requirements.",
          },
          {
            title: "Progress through learning.",
            text: "Observation and field evaluation are part of understanding crop performance and developing the seed business.",
          },
          {
            title: "Productive relationships.",
            text: "Our business connects seed growers, agricultural customers and commercial partners through clear conversations and shared requirements.",
          },
        ].map((v, i) => (
          <article key={v.title} data-reveal>
            <span>0{i + 1}</span>
            <h2>{v.title}</h2>
            <p>{v.text}</p>
            {i % 2 === 0 && (
              <Photo
                name={i === 0 ? "seed-detail" : "new-growth"}
                alt="Illustrative agricultural seed and growth imagery"
                className="values-row-photo"
              />
            )}
          </article>
        ))}
      </section>
      <PartnershipCTA />
    </>
  );
}
function Solutions() {
  return (
    <>
      <PageHero
        kicker="Our solutions"
        title="From the seed."
        italic="To the season ahead."
        description="Seed production, processing and agricultural supply, connected through one business."
        image="sorghum"
      />
      <section className="container solutions-editorial">
        {[
          {
            n: "01",
            title: "Seed portfolio",
            desc: "Explore our crop categories and featured varieties. Request current availability and product information.",
            image: "hero",
            href: "/seeds",
          },
          {
            n: "02",
            title: "Seed production & processing",
            desc: "A business spanning contracted growers, seed processing, packing and distribution. Discuss production or toll processing requirements.",
            image: "sorghum",
            href: "/solutions/seed-production",
          },
          {
            n: "03",
            title: "Agricultural products",
            desc: "Alongside seed, Tocek’s business includes agrochemicals. Speak to the team about current products and official product information.",
            image: "wheat",
            href: "/solutions/agricultural-products",
          },
        ].map((s) => (
          <article key={s.n}>
            <Photo name={s.image} alt="Illustrative crop photography" />
            <div data-reveal>
              <span className="eyebrow">CAPABILITY / {s.n}</span>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              <ArrowLink href={s.href}>Explore the solution</ArrowLink>
            </div>
          </article>
        ))}
      </section>
      <PartnershipCTA />
    </>
  );
}
function Production() {
  return (
    <>
      <PageHero
        kicker="Seed production & processing"
        title="The work before"
        italic="the growing season."
        description="Connecting contracted seed production, processing, packing and distribution."
        image="sorghum"
      />
      <Intro kicker="A connected seed business" title="Care at each stage.">
        <p className="lead">
          Tocek’s operations span seed production through contracted growers,
          followed by processing, packing and distribution.
        </p>
        <p>
          Tocek also undertakes toll processing for other seed businesses. Speak
          to the team about the scope, timing and requirements of a potential
          production or processing arrangement.
        </p>
        <p>
          Each commercial requirement is discussed directly, with scope and
          timing agreed for the specific enquiry.
        </p>
      </Intro>
      <section className="process-editorial container">
        {[
          {
            title: "Production with growers",
            copy: "Tocek contracts seed growers to produce seed crops. Enquire about grower requirements and current production opportunities.",
          },
          {
            title: "Processing & packing",
            copy: "Our seed activities include processing and packing. Discuss the service required, crop and intended timeframe.",
          },
          {
            title: "Distribution & supply",
            copy: "Connect with Tocek to discuss seed supply, quantities and delivery requirements. Commercial terms are confirmed on enquiry.",
          },
        ].map((s, i) => (
          <article key={s.title}>
            <span>0{i + 1}</span>
            <h2>{s.title}</h2>
            <p>{s.copy}</p>
          </article>
        ))}
      </section>
      <section className="container simple-callout">
        <h2>Looking for a production or processing partner?</h2>
        <ButtonLink href="/contact?interest=Seed%20production">
          Discuss your requirements
        </ButtonLink>
      </section>
      <PartnershipCTA />
    </>
  );
}
function Agricultural() {
  return (
    <>
      <PageHero
        kicker="Agricultural products"
        title="The right conversation."
        italic="For your requirements."
        description="Enquire about seed products and agrochemical information from the Tocek team."
        image="wheat"
      />
      <Intro
        kicker="Product enquiries"
        title="Start with the details."
        image="crop-still-life"
      >
        <p className="lead">
          Tocek’s portfolio includes agricultural seed and agrochemicals.
        </p>
        <p>
          For seed, explore the crop collection and request current variety
          information. For agrochemicals, contact the team for the current
          product list, registration details and official labels.
        </p>
        <p>
          Request the official label and product information from the team.
          Product use should follow the relevant label and local requirements.
        </p>
        <div className="inline-actions">
          <ButtonLink href="/seeds">Explore our seeds</ButtonLink>
          <ArrowLink href="/contact?interest=Seed%20products">
            Ask about agricultural products
          </ArrowLink>
        </div>
      </Intro>
      <PartnershipCTA />
    </>
  );
}
function Research({ quality = false }: { quality?: boolean }) {
  return (
    <>
      <PageHero
        kicker={quality ? "Quality approach" : "Research & innovation"}
        title={quality ? "The detail matters." : "Progress begins"}
        italic={quality ? "At every stage." : "with a closer look."}
        description={
          quality
            ? "Understanding the work behind production, processing and product information."
            : "Field evaluation connects crop development with the practical questions of agriculture."
        }
        image={quality ? "hero" : "wheat"}
      />
      <Intro
        kicker={
          quality
            ? "A considered approach"
            : "From observation to understanding"
        }
        title={
          quality
            ? "Quality starts with the work."
            : "The field asks better questions."
        }
        image={quality ? "seed-detail" : "new-growth"}
      >
        <p className="lead">
          {quality
            ? "Seed production, processing and packing are connected parts of the Tocek business."
            : "Our research and demonstration work includes crop evaluation, variety comparisons, examination of crop traits and population trials."}
        </p>
        <p>
          {quality
            ? "Our operations connect contracted growers with seed processing and distribution. Customers can request current product information and discuss the technical details relevant to their requirements."
            : "These activities provide a practical setting for observing crops and understanding their characteristics. They are part of the company’s wider seed production and development work."}
        </p>
        <p>
          {quality
            ? "Ask for official technical sheets and product-specific quality information. Published performance characteristics, where available, should be considered in the context in which they were measured."
            : "We welcome discussions around research and technical collaboration. Specific projects, technologies and current trial programmes are confirmed directly by the team."}
        </p>
        <ArrowLink
          href={
            quality
              ? "/contact?interest=Seed%20products"
              : "/contact?interest=Research%20collaboration"
          }
        >
          {quality
            ? "Request product information"
            : "Discuss technical collaboration"}
        </ArrowLink>
      </Intro>
      <section className="research-topics container">
        {[
          {
            icon: Sprout,
            title: "Crop evaluation",
            text: "Observing crop characteristics and comparing varieties in the field.",
          },
          {
            icon: ScanLine,
            title: "Seed production",
            text: "Connecting production requirements with contracted growers and processing.",
          },
          {
            icon: FlaskConical,
            title: "Technical information",
            text: "A direct conversation about current products, trials and collaboration.",
          },
        ].map((t) => (
          <article key={t.title}>
            <t.icon size={27} strokeWidth={1} />
            <h2>{t.title}</h2>
            <p>{t.text}</p>
          </article>
        ))}
      </section>
      <section className="research-panoramic">
        <Photo
          name="sorghum"
          alt="Sorghum field study — illustrative photography"
        />
        <div>
          <h2>
            Understanding today.
            <br />
            <em>Growing tomorrow.</em>
          </h2>
        </div>
      </section>
      <PartnershipCTA />
    </>
  );
}
function Global() {
  return (
    <>
      <PageHero
        kicker="Global presence"
        title="Zimbabwean roots."
        italic="An international outlook."
        description="Developing agricultural relationships beyond borders, with a clear starting point in Zimbabwe."
        image="hero"
      />
      <section className="global-page">
        <div className="container">
          {label("Our presence")}
          <h2>
            One confirmed base.
            <br />
            <em>Open to wider conversations.</em>
          </h2>
          <PresenceMap />
        </div>
      </section>
      <Intro
        kicker="Connect across borders"
        title="Let’s understand your market."
        image="hero"
      >
        <p className="lead">
          Tocek is developing its international business relationships and
          partnerships.
        </p>
        <p>
          To explore a relationship with Tocek, share your country,
          organisation, crop interests and proposed scope. Operating presence,
          distribution arrangements and partner locations are confirmed
          individually.
        </p>
        <p>
          International enquiries do not imply that Tocek has an office or
          registered company in your country. Supply and partnerships are
          subject to direct discussion and applicable requirements.
        </p>
        <ArrowLink href="/partnerships">Explore a partnership</ArrowLink>
      </Intro>
      <PartnershipCTA />
    </>
  );
}
function Partnerships({ distribution = false }: { distribution?: boolean }) {
  return (
    <>
      <PageHero
        kicker={distribution ? "Distribution enquiries" : "Partnerships"}
        title={distribution ? "Bring your market." : "Shared ambition."}
        italic={
          distribution ? "Let’s talk supply." : "Productive possibilities."
        }
        description={
          distribution
            ? "A conversation for distributors, agricultural retailers and commercial supply organisations."
            : "A starting point for agricultural businesses, distributors, growers and technical collaborators."
        }
        image={distribution ? "wheat" : "sorghum"}
      />
      <section className="partnership-paths container">
        <div>
          {label("Ways to work together")}
          <h2>
            Growth is
            <br />
            <em>a shared endeavour.</em>
          </h2>
          <Photo
            name="crop-still-life"
            alt="AI-generated illustrative seed collection, not specific supplied products"
            className="partnership-seed-photo"
          />
        </div>
        <div>
          {(distribution
            ? [
                "Agricultural distributors",
                "Commercial agricultural supply",
                "Institutional requirements",
              ]
            : [
                "Distribution & market relationships",
                "Seed production & processing",
                "Research & technical collaboration",
                "International agricultural business",
              ]
          ).map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      </section>
      <section className="contact-layout container">
        <ContactDetails />
        <EnquiryForm partnership deliveryEnabled={deliveryEnabled()} />
      </section>
    </>
  );
}
function Contact() {
  return (
    <>
      <PageHero
        kicker="Contact Zadzamatura"
        title="The next season."
        italic="Starts with a conversation."
        description="Seed enquiries, commercial requirements and international partnerships. Let’s connect."
        image="hero"
      />
      <section className="contact-layout container">
        <ContactDetails />
        <EnquiryForm deliveryEnabled={deliveryEnabled()} />
      </section>
      <section className="container contact-faq">
        {label("A little more information")}
        <h2>Before we speak.</h2>
        {[
          {
            q: "Can I request a bulk supply quotation?",
            a: "Yes. Choose “Bulk orders” in your enquiry and include the crop, variety if known, quantity, delivery location and timeline. Prices and availability are confirmed directly.",
          },
          {
            q: "Do you handle international enquiries?",
            a: "We welcome international business conversations. Share your country and organisation so the team can discuss your specific requirements. Enquiry availability does not imply an overseas office or confirmed supply arrangement.",
          },
          {
            q: "Where can I get technical seed information?",
            a: "Browse the seed portfolio and request the current technical sheet for the crop or variety you are considering. Technical recommendations should be discussed with the team and a qualified agronomist.",
          },
        ].map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <span>+</span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
function Seeds() {
  return (
    <>
      <PageHero
        kicker="Seed portfolio"
        title="Every crop."
        italic="A new possibility."
        description="Explore the collection. Find a crop. Start an informed conversation about the right seed for your requirements."
        image="hero"
      />
      <Catalogue />
      <PartnershipCTA />
    </>
  );
}
function CropPage({ slug }: { slug: string }) {
  const c = crops.find((c) => c.slug === slug);
  if (!c) return notFound();
  const vs = varieties.filter((v) => v.crop === c.slug);
  return (
    <>
      <PageHero
        kicker={`Seed portfolio / ${c.group}`}
        title={c.name + "."}
        italic="Explore the possibilities."
        description={c.description}
        image={c.image}
      />
      <div className="container">
        <Breadcrumb
          items={[
            { label: "Seed portfolio", href: "/seeds" },
            { label: c.name },
          ]}
        />
      </div>
      <section className="container crop-detail">
        <div>
          {label(c.group)}
          <h2>
            A closer look
            <br />
            at <em>{c.name.toLowerCase()}.</em>
          </h2>
          <p className="botanical">{c.botanical}</p>
        </div>
        <div>
          <p className="lead">Tell us about your crop requirements.</p>
          <p>
            Request current availability, technical information and packaging
            options from Tocek. Share your location, intended season and
            quantity so the team can understand your enquiry.
          </p>
          <ButtonLink
            href={`/contact?interest=Seed%20products&product=${encodeURIComponent(c.name)}`}
          >
            Enquire about {c.name.toLowerCase()}
          </ButtonLink>
        </div>
      </section>
      {vs.length > 0 && (
        <section className="container featured-varieties">
          {label("Featured varieties")}
          <h2>Explore the variety.</h2>
          {vs.map((v) => (
            <Link key={v.slug} href={`/seeds/${c.slug}/${v.slug}`}>
              <span>{c.name}</span>
              <h3>{v.name}</h3>
              <p>Request the current technical information and availability.</p>
              <ArrowUpRight size={24} />
            </Link>
          ))}
        </section>
      )}
      <section className="container product-questions">
        <h2>Information for your decision.</h2>
        <p>
          Ask the team for the exact variety’s current technical sheet, regional
          suitability, maturity information and commercial terms. The team can
          help you identify which information is relevant to your production
          context.
        </p>
        <ArrowLink href="/resources/seed-enquiry-checklist">
          Prepare your enquiry
        </ArrowLink>
      </section>
      <section className="container related-crops">
        {label("Continue exploring")}
        <div>
          {crops
            .filter((x) => x.group === c.group && x.slug !== c.slug)
            .slice(0, 3)
            .map((x) => (
              <ArrowLink key={x.slug} href={`/seeds/${x.slug}`}>
                {x.name}
              </ArrowLink>
            ))}
          <ArrowLink href="/seeds">All crops</ArrowLink>
        </div>
      </section>
      <PartnershipCTA />
    </>
  );
}
function VarietyPage({ crop, slug }: { crop: string; slug: string }) {
  const v = varieties.find((v) => v.slug === slug && v.crop === crop),
    c = crops.find((c) => c.slug === crop);
  if (!v || !c) return notFound();
  const specs = [
    ["Seed type", v.seedType],
    ["Maturity", v.maturity],
    ["Suitable regions", v.regions],
    ["Yield potential", v.yieldPotential],
    ["Packaging", v.packaging],
  ].filter(([, value]) => value);
  return (
    <>
      <section className="variety-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Seed portfolio", href: "/seeds" },
              { label: c.name, href: `/seeds/${c.slug}` },
              { label: v.name },
            ]}
          />
          <div className="variety-layout">
            <div className="variety-art">
              <Photo
                name={c.image}
                alt={`${c.name} crop illustration; not a photograph of the named variety`}
              />
              <span>ILLUSTRATIVE CROP IMAGE · {c.botanical.toUpperCase()}</span>
            </div>
            <div>
              <span className="eyebrow">{c.name} / ZADZAMATURA</span>
              <h1>{v.name}</h1>
              <p className="lead">{v.description}</p>
              <p>
                This variety has been featured by the agricultural brand.
                Current specifications, packaging and availability are confirmed
                directly by Tocek.
              </p>
              {specs.length > 0 && (
                <dl>
                  {specs.map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <ButtonLink
                href={`/contact?interest=Seed%20products&product=${v.name}`}
              >
                Request product information
              </ButtonLink>
              {v.technicalPdf && (
                <a className="arrow-link" href={v.technicalPdf} download>
                  Download technical sheet <Download size={17} />
                </a>
              )}
              <a
                className="source-link"
                href={v.source}
                target="_blank"
                rel="noreferrer"
              >
                View brand reference <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="container product-questions">
        <h2>Make an informed selection.</h2>
        <p>
          Share your growing location and intended season with the team. Request
          the official technical sheet before making a final seed selection. Use
          product-specific information to guide the conversation.
        </p>
        <ArrowLink href="/resources/understanding-technical-sheets">
          What to ask about a variety
        </ArrowLink>
      </section>
      <PartnershipCTA />
    </>
  );
}
function Resources() {
  return (
    <>
      <PageHero
        kicker="Farmer resources"
        title="Better questions."
        italic="Informed beginnings."
        description="Useful checklists to prepare your seed and supply conversations, with routes to trusted agricultural information."
        image="wheat"
      />
      <section className="container resource-section">
        <ResourceBrowser />
      </section>
      <section className="trusted-resources container">
        <div>
          {label("Further reading")}
          <h2>Go to the source.</h2>
          <p>
            For crop management guidance, use credible technical resources and a
            qualified local agronomist.
          </p>
        </div>
        <div>
          <a
            href="https://www.fao.org/seeds/en/"
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={20} />
            <div>
              <h3>FAO · Seeds</h3>
              <p>Seed systems and related agricultural information.</p>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a
            href="https://zimseedassociation.org.zw/"
            target="_blank"
            rel="noreferrer"
          >
            <Sprout size={20} />
            <div>
              <h3>Zimbabwe Seed Association</h3>
              <p>Zimbabwe’s seed sector and member information.</p>
            </div>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <PartnershipCTA />
    </>
  );
}
function ResourceArticle({ slug }: { slug: string }) {
  const r = resourceItems.find((r) => r.slug === slug);
  if (!r) return notFound();
  return (
    <>
      <div className="article-top container">
        <Breadcrumb
          items={[
            { label: "Farmer resources", href: "/resources" },
            { label: r.title },
          ]}
        />
        <div className="article-heading">
          <span className="eyebrow">{r.category} / ENQUIRY GUIDE</span>
          <h1>{r.title}</h1>
          <p>{r.summary}</p>
          <div className="article-byline">
            <span>ZADZAMATURA · CUSTOMER ENQUIRY RESOURCES</span>
            <ShareButton />
          </div>
        </div>
        <Photo
          name={r.image}
          alt="Illustrative agricultural crop photography"
        />
      </div>
      <article className="reading-article">
        <p className="article-note">
          An enquiry preparation guide. This is not crop management or treatment
          advice.
        </p>
        {r.body.map((p, i) => (
          <section key={i}>
            <span className="eyebrow">0{i + 1}</span>
            <p>{p}</p>
          </section>
        ))}
        <ArrowLink href="/contact?interest=Seed%20products">
          Put your enquiry together
        </ArrowLink>
      </article>
      <section className="container related-articles">
        {label("Continue reading")}
        <h2>More useful starting points.</h2>
        {resourceItems
          .filter((x) => x.slug !== r.slug)
          .map((x) => (
            <ArrowLink key={x.slug} href={`/resources/${x.slug}`}>
              {x.title}
            </ArrowLink>
          ))}
      </section>
    </>
  );
}
function Insights() {
  return (
    <>
      <PageHero
        kicker="Insights & news"
        title="The agricultural"
        italic="conversation continues."
        description="Company perspectives, resources and the next chapter of Tocek Investments."
        image="sorghum"
      />
      {news.length > 0 && (
        <section className="container resource-section">
          <div className="resource-grid">
            {news.map((a) => (
              <article key={a.slug}>
                <Link href={`/insights/${a.slug}`}>
                  <Photo name={a.image} alt={a.imageAlt} />
                  <time className="eyebrow" dateTime={a.publishedAt}>
                    {new Date(a.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                  <h2>{a.title}</h2>
                  <p>{a.summary}</p>
                  <span className="text-arrow">
                    Read the announcement <ArrowUpRight size={16} />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="container newsroom">
        <div>
          {label("The Zadzamatura newsroom")}
          <h2>
            News from
            <br />
            <em>the business.</em>
          </h2>
          <p>
            Company announcements, product introductions, field events and
            partnership updates will be published here as they are released by
            Tocek.
          </p>
          <p>
            For current company or media information, contact the team directly.
          </p>
          <ArrowLink href="/contact?interest=Media%20enquiries">
            Media & company enquiries
          </ArrowLink>
        </div>
        <div className="newsroom-feature">
          <Photo name="wheat" alt="Illustrative wheat crop photography" />
          <span className="eyebrow">EXPLORE THE BUSINESS</span>
          <h3>Discover the work behind the seed.</h3>
          <ArrowLink href="/research">Research & innovation</ArrowLink>
        </div>
      </section>
      <section className="container insight-guides">
        {label("From the resource centre")}
        <h2>Useful perspectives.</h2>
        {resourceItems.map((r) => (
          <Link href={`/resources/${r.slug}`} key={r.slug}>
            <span>{r.category}</span>
            <h3>{r.title}</h3>
            <ArrowUpRight size={20} />
          </Link>
        ))}
      </section>
      <PartnershipCTA />
    </>
  );
}
function NewsArticlePage({ slug }: { slug: string }) {
  const a = news.find((a) => a.slug === slug);
  if (!a) return notFound();
  return (
    <>
      <div className="article-top container">
        <Breadcrumb
          items={[{ label: "Insights", href: "/insights" }, { label: a.title }]}
        />
        <div className="article-heading">
          <span className="eyebrow">ZADZAMATURA / COMPANY NEWS</span>
          <h1>{a.title}</h1>
          <p>{a.summary}</p>
          <div className="article-byline">
            <span>
              <time dateTime={a.publishedAt}>
                {new Date(a.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>{" "}
              · {a.author || "Tocek Investments"}
            </span>
            <ShareButton />
          </div>
        </div>
        <Photo name={a.image} alt={a.imageAlt} />
      </div>
      <article className="reading-article">
        {a.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {a.source && (
          <a
            className="source-link"
            href={a.source}
            target="_blank"
            rel="noreferrer"
          >
            Source <ArrowUpRight size={12} />
          </a>
        )}
      </article>
      <section className="container related-articles">
        {label("More from Zadzamatura")}
        {news
          .filter((x) => x.slug !== a.slug)
          .slice(0, 3)
          .map((x) => (
            <ArrowLink key={x.slug} href={`/insights/${x.slug}`}>
              {x.title}
            </ArrowLink>
          ))}
        <ArrowLink href="/insights">Back to insights</ArrowLink>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: a.title,
            datePublished: a.publishedAt,
            author: {
              "@type": a.author ? "Person" : "Organization",
              name: a.author || "Tocek Investments",
            },
            url: siteUrl + "/insights/" + a.slug,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
function Privacy() {
  return (
    <>
      <PageHero
        kicker="Privacy"
        title="Your enquiry."
        italic="Handled with care."
        description="Information about the details you choose to share with Tocek Investments."
        image="wheat"
      />
      <article className="reading-article privacy">
        <h2>Information you provide</h2>
        <p>
          The enquiry form requests your name, organisation, country, email,
          phone number, area of interest and message. Required fields are
          marked. Please do not include sensitive personal or financial
          information.
        </p>
        <h2>How enquiries are used</h2>
        <p>
          Details submitted through an active enquiry form are used to respond
          to your request and discuss relevant products or business
          requirements. Submitting an enquiry does not subscribe you to a
          marketing list.
        </p>
        <h2>Form delivery</h2>
        <p>
          When online delivery is enabled, form information is processed through
          the configured email delivery service, Resend. Cloudflare Turnstile is
          used for spam protection. Their processing may occur outside Zimbabwe.
          If the form states that delivery is unavailable, it does not submit
          your details. The copy-enquiry option only copies information to your
          device clipboard.
        </p>
        <h2>External services</h2>
        <p>
          Links to maps and external resources take you to third-party websites
          with their own privacy practices. Share controls use your device’s
          native share function or copy the page link. This site does not use
          advertising trackers or non-essential analytics cookies.
        </p>
        <h2>Your choices</h2>
        <p>
          You can contact Tocek to ask about an enquiry, request correction or
          deletion of your submitted details, or withdraw permission for further
          follow-up. Contact the team on{" "}
          <a href={`tel:${company.phoneHref}`}>{company.phone}</a>. Enquiry
          records should be kept only as long as necessary for their purpose and
          applicable requirements.
        </p>
        <h2>Company contact</h2>
        <p>
          {company.legalName}
          <br />
          {company.address}
        </p>
      </article>
    </>
  );
}
export function ContentPage({ path }: { path: string }) {
  if (path === "/about") return <About />;
  if (path === "/about/our-story") return <Story />;
  if (path === "/about/our-values") return <Values />;
  if (path === "/solutions") return <Solutions />;
  if (path === "/solutions/seed-production") return <Production />;
  if (path === "/solutions/agricultural-products") return <Agricultural />;
  if (path === "/research" || path === "/research/quality")
    return <Research quality={path.endsWith("quality")} />;
  if (path === "/global-presence") return <Global />;
  if (path === "/partnerships" || path === "/distribution")
    return <Partnerships distribution={path === "/distribution"} />;
  if (path === "/contact") return <Contact />;
  if (path === "/seeds") return <Seeds />;
  if (path === "/resources") return <Resources />;
  if (path === "/insights") return <Insights />;
  if (path === "/privacy") return <Privacy />;
  const s = path.split("/").filter(Boolean);
  if (s[0] === "seeds" && s.length === 2) return <CropPage slug={s[1]} />;
  if (s[0] === "seeds" && s.length === 3)
    return <VarietyPage crop={s[1]} slug={s[2]} />;
  if (s[0] === "resources" && s.length === 2)
    return <ResourceArticle slug={s[1]} />;
  if (s[0] === "insights" && s.length === 2)
    return <NewsArticlePage slug={s[1]} />;
  return notFound();
}
