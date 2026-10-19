"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Search,
  Share2,
  X,
} from "lucide-react";
import { crops, varieties, resourceItems } from "@/lib/content";
import { Photo, label, ArrowLink, cropSrc } from "./ui";
import Image from "next/image";

export function ScrollEffects() {
  const path = usePathname();
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tracked = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          // Different entry/exit thresholds prevent edge flicker during slow scroll.
          if (entry.isIntersecting && entry.intersectionRatio >= 0.16) {
            element.classList.add("is-visible");
          } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.08) {
            element.dataset.enterFrom =
              entry.boundingClientRect.top < 0 ? "above" : "below";
            element.classList.remove("is-visible");
          }
        }
      },
      { threshold: [0, 0.08, 0.16], rootMargin: "-48px 0px -48px 0px" },
    );
    const register = () => {
      if (reducedMotion.matches) return;
      main.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        if (element.closest(".atlas-image")) return;
        if (tracked.has(element)) return;
        const box = element.getBoundingClientRect();
        const visible =
          Math.min(box.bottom, innerHeight - 48) - Math.max(box.top, 48);
        element.dataset.enterFrom = box.bottom < 0 ? "above" : "below";
        element.style.setProperty(
          "--reveal-delay",
          `${(tracked.size % 3) * 65}ms`,
        );
        element.classList.toggle(
          "is-visible",
          visible >= Math.min(box.height * 0.16, 90),
        );
        element.classList.add("reveal-ready");
        tracked.add(element);
        observer.observe(element);
      });
      for (const element of tracked) {
        if (!element.isConnected) {
          observer.unobserve(element);
          tracked.delete(element);
        }
      }
    };
    const reset = () => {
      observer.disconnect();
      tracked.forEach((element) => {
        element.classList.remove("reveal-ready", "is-visible");
        element.style.removeProperty("--reveal-delay");
        delete element.dataset.enterFrom;
      });
      tracked.clear();
      register();
    };
    register();
    // Also register crop filters, gallery selections and streamed route content.
    const changes = new MutationObserver(register);
    changes.observe(main, { childList: true, subtree: true });
    reducedMotion.addEventListener("change", reset);
    return () => {
      changes.disconnect();
      observer.disconnect();
      reducedMotion.removeEventListener("change", reset);
      tracked.forEach((element) => {
        element.classList.remove("reveal-ready", "is-visible");
        element.style.removeProperty("--reveal-delay");
        delete element.dataset.enterFrom;
      });
    };
  }, [path]);
  return null;
}
export function ScrollCue() {
  return (
    <a href="#introduction" className="scroll-cue">
      <span>Discover what grows ahead</span>
      <ArrowDown size={16} />
    </a>
  );
}
export function SeedAtlas() {
  const ids = ["maize", "sorghum", "sunflower", "wheat"];
  const [active, setActive] = useState(0);
  const crop = crops.find((c) => c.slug === ids[active])!;
  return (
    <section className="atlas-section" id="seed-atlas">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            {label("The seed collection")}
            <h2>
              Different crops.
              <br />
              <em>Shared possibilities.</em>
            </h2>
          </div>
          <div>
            <p>
              Find your starting point. Explore the crops at the heart of our
              agricultural business.
            </p>
            <ArrowLink href="/seeds">Explore the full portfolio</ArrowLink>
          </div>
        </div>
        <div className="atlas">
          <div className="atlas-image">
            <Photo
              key={crop.slug}
              name={crop.image}
              alt={`${crop.name} field — illustrative crop photography`}
            />
            <span className="atlas-image-label">
              FIELD STUDY / {crop.botanical.toUpperCase()}
            </span>
            <div className="atlas-count">
              0{active + 1}
              <span> / 04</span>
            </div>
          </div>
          <div className="atlas-info">
            <span className="eyebrow">EXPLORE BY CROP</span>
            <div role="tablist" aria-label="Explore crops">
              {ids.map((id, i) => (
                <button
                  key={id}
                  id={`tab-${id}`}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="crop-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (
                      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                    ) {
                      e.preventDefault();
                      const next =
                        e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? 3
                            : (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                      setActive(next);
                      document.getElementById(`tab-${ids[next]}`)?.focus();
                    }
                  }}
                >
                  <span className="atlas-tab-num">0{i + 1}</span>
                  {crops.find((c) => c.slug === id)!.name}
                  <ArrowUpRight size={19} />
                </button>
              ))}
            </div>
            <div
              className="atlas-note"
              id="crop-panel"
              role="tabpanel"
              aria-labelledby={`tab-${crop.slug}`}
              key={crop.slug}
            >
              <span className="eyebrow">
                {crop.group} · {crop.botanical}
              </span>
              <p>{crop.description}</p>
              <ArrowLink href={`/seeds/${crop.slug}`}>
                Discover {crop.name.toLowerCase()}
              </ArrowLink>
            </div>
            <div className="atlas-controls">
              <button
                aria-label="Previous crop"
                onClick={() => setActive((active + 3) % 4)}
              >
                <ArrowLeft size={17} />
              </button>
              <span>SELECT A CROP TO EXPLORE</span>
              <button
                aria-label="Next crop"
                onClick={() => setActive((active + 1) % 4)}
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Catalogue() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All crops");
  const q = query.toLowerCase().trim();
  const results = crops.filter(
    (c) =>
      (filter === "All crops" || c.group === filter) &&
      (!q ||
        `${c.name} ${c.botanical} ${c.group}`.toLowerCase().includes(q) ||
        varieties.some(
          (v) => v.crop === c.slug && v.name.toLowerCase().includes(q),
        )),
  );
  return (
    <section className="container catalogue">
      <div className="catalogue-tools">
        <div
          className="filter-pills"
          role="group"
          aria-label="Filter crop categories"
        >
          {["All crops", "Cereals", "Legumes", "Oilseeds"].map((f) => (
            <button
              aria-pressed={filter === f}
              key={f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="searchbox">
          <Search size={17} />
          <span className="sr-only">Search crops or varieties</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crops or varieties"
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              <X size={16} />
            </button>
          )}
        </label>
      </div>
      <div className="result-count" aria-live="polite">
        {results.length} crop {results.length === 1 ? "category" : "categories"}
        {q && ` matching “${query}”`}
      </div>
      <div className="crop-grid">
        {results.map((c) => (
          <article key={c.slug} className="crop-card">
            <Link href={`/seeds/${c.slug}`} className="crop-image-link">
              <Photo
                name={c.image}
                alt={`${c.name} — ${["soyabeans", "beans", "millet", "groundnuts", "cowpeas", "finger-millet"].includes(c.image) ? "botanical illustration" : "illustrative crop photography"}`}
                sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span className="circle-arrow">
                <ArrowUpRight size={20} />
              </span>
            </Link>
            <div className="crop-meta">
              <span>{c.group}</span>
              <i>{c.botanical}</i>
            </div>
            <h2>
              <Link href={`/seeds/${c.slug}`}>{c.name}</Link>
            </h2>
            <p>{c.description}</p>
            {varieties
              .filter(
                (v) =>
                  v.crop === c.slug &&
                  (!q ||
                    v.name.toLowerCase().includes(q) ||
                    c.name.toLowerCase().includes(q)),
              )
              .map((v) => (
                <Link
                  className="variety-tag"
                  key={v.slug}
                  href={`/seeds/${v.crop}/${v.slug}`}
                >
                  {v.name}
                  <ArrowUpRight size={12} />
                </Link>
              ))}
          </article>
        ))}
      </div>
      {!results.length && (
        <div className="empty-state">
          <h2>Let’s try a different search.</h2>
          <p>Search by crop name or a featured variety, such as ZS265.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setFilter("All crops");
            }}
          >
            Reset filters <ArrowRight size={16} />
          </button>
        </div>
      )}
      <div className="catalogue-footnote">
        <p>
          Crop imagery and botanical illustrations are illustrative. Product
          availability and technical specifications are confirmed on enquiry.
        </p>
        <ArrowLink href="/contact?interest=Seed%20products">
          Need help choosing?
        </ArrowLink>
      </div>
    </section>
  );
}
export function ResourceBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const list = resourceItems.filter(
    (r) =>
      (filter === "All" || r.category === filter) &&
      `${r.title} ${r.summary}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div>
      <div className="catalogue-tools">
        <div className="filter-pills">
          {["All", "Planning", "Seed selection", "Business"].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="searchbox">
          <Search size={17} />
          <span className="sr-only">Search resources</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the resource centre"
          />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {list.length} resources
      </p>
      <div className="resource-grid">
        {list.map((r) => (
          <article key={r.slug}>
            <Link href={`/resources/${r.slug}`}>
              <Photo
                name={r.image}
                alt="Illustrative agricultural crop photography"
              />
              <span className="eyebrow">{r.category} / ENQUIRY GUIDE</span>
              <h2>{r.title}</h2>
              <p>{r.summary}</p>
              <span className="text-arrow">
                Read the guide <ArrowUpRight size={17} />
              </span>
            </Link>
          </article>
        ))}
      </div>
      {!list.length && (
        <div className="empty-state">
          <h2>No matching resources.</h2>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Reset search
          </button>
        </div>
      )}
    </div>
  );
}
export function ShareButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="share-button"
      onClick={async () => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: document.title,
              url: location.href,
            });
          } else {
            await navigator.clipboard.writeText(location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}{" "}
      {copied ? "Link copied" : "Share this guide"}
    </button>
  );
}
export function PresenceMap() {
  const [focus, setFocus] = useState(false);
  return (
    <div className="presence-map">
      <div className={`world-map ${focus ? "focused" : ""}`}>
        <Image
          src="/images/world.svg"
          width={1000}
          height={500}
          alt="World map highlighting Zimbabwe as Tocek’s confirmed operating base"
        />
        <button
          className="map-pin"
          aria-label="Explore our Zimbabwe base"
          aria-pressed={focus}
          onClick={() => setFocus(!focus)}
        >
          <span />
          <b>Zimbabwe</b>
        </button>
      </div>
      <div className="map-toolbar">
        <span>
          <i /> CONFIRMED OPERATING BASE
        </span>
        <button onClick={() => setFocus(!focus)}>
          {focus ? "View the world" : "Focus on Zimbabwe"}
          <ArrowUpRight size={14} />
        </button>
      </div>
      <div className="map-location" aria-live="polite">
        <span className="eyebrow">01 / ZIMBABWE</span>
        <h3>Rooted in Harare.</h3>
        <p>
          Mount Hampden is home to Tocek’s Zimbabwean seed business. For
          cross-border supply and partnership discussions, connect with our
          team.
        </p>
        <ArrowLink href="/contact?interest=International%20partnerships">
          International enquiries
        </ArrowLink>
      </div>
    </div>
  );
}
