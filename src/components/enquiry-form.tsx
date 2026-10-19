"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Copy, Phone } from "lucide-react";
import Script from "next/script";
import { company } from "@/lib/content";
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}
export function EnquiryForm({
  partnership = false,
  deliveryEnabled = false,
}: {
  partnership?: boolean;
  deliveryEnabled?: boolean;
}) {
  const [interest, setInterest] = useState(
    partnership ? "International partnerships" : "General enquiry",
  );
  const [product, setProduct] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const started = useRef(Date.now());
  const widgetId = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const i = params.get("interest");
    if (i) setInterest(i);
    setProduct(params.get("product") || "");
  }, []);
  useEffect(() => {
    if (!scriptReady || !widget.current || !siteKey || !window.turnstile)
      return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: siteKey,
      callback: (t: string) => setToken(t),
      "expired-callback": () => setToken(""),
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
  }, [scriptReady, siteKey]);
  const summary = (data: FormData) =>
    `TOCEK INVESTMENTS — ENQUIRY\nName: ${data.get("name")}\nOrganisation: ${data.get("organisation")}\nCountry: ${data.get("country")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nInterest: ${data.get("interest")}\nCrop / variety: ${data.get("product")}\n\n${data.get("message")}`;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!deliveryEnabled) return;
    const data = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          token,
          startedAt: started.current,
        }),
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(
          result.error ||
            "Your enquiry could not be delivered. Please call the team.",
        );
      setState("success");
      form.current?.reset();
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error
          ? err.message
          : "Delivery is unavailable. Please call the team.",
      );
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      setToken("");
    }
  }
  return (
    <div className="enquiry-panel">
      {state === "success" ? (
        <div className="form-success" role="status">
          <CheckCircle2 size={34} />
          <h2>Thank you for reaching out.</h2>
          <p>Your enquiry has been delivered to the Tocek team.</p>
          <button className="button" onClick={() => setState("idle")}>
            Start another enquiry <ArrowUpRight size={16} />
          </button>
        </div>
      ) : (
        <>
          <span className="eyebrow">
            {partnership
              ? "A CONVERSATION WORTH STARTING"
              : "LET’S HEAR FROM YOU"}
          </span>
          <h2>{partnership ? "Explore a partnership." : "Make an enquiry."}</h2>
          <p className="form-intro">
            Tell us what you have in mind. Include the crop, location and
            quantity where relevant.
          </p>
          {!deliveryEnabled && (
            <div className="delivery-notice">
              <Phone size={18} />
              <p>
                Online delivery is being connected. You can prepare and copy
                your enquiry below, then call{" "}
                <a href={`tel:${company.phoneHref}`}>{company.phone}</a> to
                speak to the team. Your details are not submitted.
              </p>
            </div>
          )}
          <form ref={form} onSubmit={submit}>
            <div className="form-grid">
              <label>
                Full name <span>*</span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Organisation{partnership && <span> *</span>}
                <input
                  name="organisation"
                  autoComplete="organization"
                  required={partnership}
                  maxLength={160}
                />
              </label>
              <label>
                Country <span>*</span>
                <input
                  name="country"
                  autoComplete="country-name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Business email <span>*</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                />
              </label>
              <label>
                {partnership ? "Partnership interest" : "Enquiry type"}{" "}
                <span>*</span>
                <select
                  name="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  required
                >
                  {[
                    "General enquiry",
                    "Seed products",
                    "Bulk orders",
                    "Distributors",
                    "International partnerships",
                    "Seed production",
                    "Research collaboration",
                    "Media enquiries",
                  ].map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Crop / variety, if known
              <input
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                maxLength={150}
              />
            </label>
            <label>
              Your message <span>*</span>
              <textarea
                name="message"
                rows={5}
                required
                minLength={15}
                maxLength={5000}
              />
            </label>
            <div className="honey" aria-hidden="true">
              <label>
                Leave this blank
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="consent">
              <input name="consent" type="checkbox" required />
              <span>
                I agree that Tocek may use these details to respond to my
                enquiry, as described in the{" "}
                <a href="/privacy">privacy policy</a>.
              </span>
            </label>
            {siteKey && deliveryEnabled && (
              <>
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  onReady={() => setScriptReady(true)}
                />
                <div ref={widget} />
              </>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="form-actions">
              {deliveryEnabled ? (
                <button
                  className="button"
                  type="submit"
                  disabled={state === "sending" || (!!siteKey && !token)}
                >
                  {state === "sending"
                    ? "Sending your enquiry…"
                    : "Send enquiry"}
                  <ArrowUpRight size={16} />
                </button>
              ) : (
                <button
                  className="button"
                  type="button"
                  onClick={async () => {
                    if (!form.current?.reportValidity()) return;
                    try {
                      await navigator.clipboard.writeText(
                        summary(new FormData(form.current)),
                      );
                      setCopied(true);
                    } catch {
                      setError(
                        "Copy is unavailable in this browser. Please call the team directly.",
                      );
                    }
                  }}
                >
                  {copied ? "Enquiry copied" : "Copy your enquiry"}
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              )}
              <span>
                {deliveryEnabled
                  ? "Secure enquiry · No online payment"
                  : "No enquiry is sent from this form yet"}
              </span>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
