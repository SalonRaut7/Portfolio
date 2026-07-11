"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { CONTACT } from "@/lib/data";

type Status = { kind: "idle" | "ok" | "err"; text: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const replyTo = String(data.get("reply_to") ?? "").trim();
    const body = String(data.get("body") ?? "").trim();

    if (!name || !replyTo || !body) {
      setStatus({ kind: "err", text: "400 Bad Request — all fields are required." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
      setStatus({ kind: "err", text: "422 Unprocessable — reply_to is not a valid email." });
      return;
    }

    setSending(true);
    setStatus({ kind: "idle", text: "› POST api/contact — sending…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, reply_to: replyTo, body }),
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: "" }));
        setStatus({
          kind: "err",
          text: `${response.status} — ${error || "message could not be sent."}`,
        });
        return;
      }

      setStatus({ kind: "ok", text: "200 OK — message delivered. I'll reply soon." });
      form.reset();
    } catch {
      setStatus({
        kind: "err",
        text: "503 Service Unavailable — network error. Email me directly instead.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal as="p" className="cmd">
          <span className="prompt">$</span> curl -X POST api/contact
        </Reveal>
        <Reveal as="h2" delay={1} className="h2">
          Get in touch
          <span className="cursor">▊</span>
        </Reveal>

        <div className="contact">
          <Reveal delay={2}>
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="form__brace">{"{"}</div>

              <label className="field">
                <span className="field__key">&quot;name&quot;:</span>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  autoComplete="name"
                  placeholder='"Ada Lovelace"'
                />
              </label>

              <label className="field">
                <span className="field__key">&quot;reply_to&quot;:</span>
                <input
                  type="email"
                  name="reply_to"
                  maxLength={254}
                  autoComplete="email"
                  placeholder='"ada@example.com"'
                />
              </label>

              <label className="field field--area">
                <span className="field__key">&quot;body&quot;:</span>
                <textarea
                  name="body"
                  rows={5}
                  maxLength={5000}
                  placeholder='"Hi Salon — we&apos;re hiring a .NET backend engineer…"'
                />
              </label>

              <div className="form__brace">{"}"}</div>

              <button
                type="submit"
                className="btn btn--primary btn--send"
                disabled={sending}
              >
                {sending ? "$ sending…" : "$ send --message"}
              </button>

              <p className={`form__out ${status.kind}`} role="status" aria-live="polite">
                {status.text}
              </p>
            </form>
          </Reveal>

          <Reveal as="aside" delay={3} className="direct">
            <header className="direct__head">// direct channels</header>

            <a className="direct__row" href={`mailto:${CONTACT.email}`}>
              <span className="direct__key">email</span>
              <span className="direct__val">{CONTACT.email}</span>
            </a>

            <a className="direct__row" href={`tel:${CONTACT.phoneHref}`}>
              <span className="direct__key">phone</span>
              <span className="direct__val">{CONTACT.phone}</span>
            </a>

            <div className="direct__row direct__row--static">
              <span className="direct__key">location</span>
              <span className="direct__val">{CONTACT.location}</span>
            </div>

            <a
              className="direct__row"
              href={CONTACT.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="direct__key">github</span>
              <span className="direct__val">{CONTACT.github} ↗</span>
            </a>

            <a
              className="direct__row"
              href={CONTACT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="direct__key">linkedin</span>
              <span className="direct__val">{CONTACT.linkedin} ↗</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
