"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { company, nav } from "@/lib/content";

export function Wordmark() {
  return (
    <span className="wordmark">
      <svg viewBox="0 0 34 40" fill="none" aria-hidden="true">
        <path
          d="M17 37V15M17 24C3 25 1 14 2 8c12-1 18 4 15 16ZM17 17C16 6 22 2 31 2c1 10-4 17-14 15Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M17 24 6 12m11 5L27 6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span>
        TOCEK<small>INVESTMENTS</small>
      </span>
    </span>
  );
}
export function Navigation() {
  const path = usePathname();
  const lightPage =
    path.startsWith("/resources/") ||
    path.startsWith("/insights/") ||
    /^\/seeds\/[^/]+\/[^/]+$/.test(path);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let last = Math.max(0, window.scrollY);
    const scroll = () => {
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 40);
      if (y !== last) setHidden(y > 100 && y > last);
      last = y;
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main,footer"),
    );
    background.forEach((el) => (el.inert = true));
    const first = menu.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLElement>("a,button") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const a = els[0],
          b = els[els.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = old;
      background.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", handle);
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    setDrop(null);
  };
  return (
    <header
      className={`site-header ${scrolled || open || lightPage ? "solid" : ""} ${hidden && !open ? "hidden" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") setDrop(null);
      }}
    >
      <div className="nav-wrap">
        <Link href="/" aria-label="Tocek Investments home" onClick={close}>
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <div
              className="nav-item"
              key={item.href}
              onMouseEnter={() => setDrop(item.href)}
              onMouseLeave={() => setDrop(null)}
            >
              <Link
                aria-current={
                  (
                    item.href === "/"
                      ? path === "/"
                      : path.startsWith(item.href)
                  )
                    ? "page"
                    : undefined
                }
                href={item.href}
                onClick={close}
              >
                {item.label}
              </Link>
              {item.children && (
                <>
                  <button
                    aria-label={`Toggle ${item.label} menu`}
                    aria-expanded={drop === item.href}
                    onClick={() =>
                      setDrop(drop === item.href ? null : item.href)
                    }
                  >
                    <ChevronDown size={10} />
                  </button>
                  <div
                    className={`dropdown ${drop === item.href ? "shown" : ""}`}
                  >
                    {item.children.map(([title, url]) => (
                      <Link key={url} href={url} onClick={close}>
                        {title}
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
        <Link href="/contact" className="nav-contact">
          Get in touch <ArrowUpRight size={15} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          ref={menu}
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {nav.map((item, i) => (
            <div key={item.href}>
              <Link href={item.href} onClick={close}>
                <span className="menu-num">0{i + 1}</span>
                {item.label}
                <ArrowUpRight size={20} />
              </Link>
              {item.children && (
                <div className="mobile-sub">
                  {item.children.map(([title, url]) => (
                    <Link key={url} href={url} onClick={close}>
                      {title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" onClick={close}>
            Contact <ArrowUpRight size={20} />
          </Link>
          <small>ROOTED IN ZIMBABWE. LOOKING BEYOND.</small>
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Home">
            <Wordmark />
          </Link>
          <p>
            Growing possibilities.
            <br />
            Beyond borders.
          </p>
          <span className="agri-brand">
            Our agricultural brand{" "}
            <img
              src="/images/zadzamatura.png"
              width="99"
              height="40"
              alt="Zadzamatura"
            />
          </span>
        </div>
        <div>
          <h3>Discover</h3>
          <Link href="/about">About Tocek</Link>
          <Link href="/solutions">Our solutions</Link>
          <Link href="/seeds">Seed portfolio</Link>
          <Link href="/research">Research & innovation</Link>
        </div>
        <div>
          <h3>Connect</h3>
          <Link href="/global-presence">Global presence</Link>
          <Link href="/partnerships">Partnerships</Link>
          <Link href="/resources">Farmer resources</Link>
          <Link href="/insights">Insights & news</Link>
        </div>
        <div className="footer-address">
          <h3>Let’s grow together</h3>
          <a href={`tel:${company.phoneHref}`}>
            {company.phone}
            <ArrowUpRight size={13} />
          </a>
          <p>{company.address}</p>
          <Link href="/contact">
            Make an enquiry <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Tocek Investments (Pvt) Ltd</span>
        <Link href="/privacy">Privacy policy</Link>
        <a href="https://wa.me/263789937251" target="_blank" rel="noreferrer">
          Designed & Developed by Jaeger Media.
        </a>
      </div>
      <div className="footer-land" aria-hidden="true">
        TOCEK
      </div>
    </footer>
  );
}
