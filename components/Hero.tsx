"use client";

import Reveal from "./Reveal";
import HeroTerminal from "./HeroTerminal";
import HeroArt from "./HeroArt";
import { AMBIENT_LOGS } from "@/lib/data";

const AMBIENT = [...AMBIENT_LOGS, ...AMBIENT_LOGS].map((text, i) => {
  const total = 9 * 3600 + i * 137;
  const hh = String(Math.floor(total / 3600) % 24).padStart(2, "0");
  const mm = String(Math.floor(total / 60) % 60).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return { ts: `${hh}:${mm}:${ss}`, text };
});

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__logs" aria-hidden="true">
        <div className="hero__logs-inner">
          {AMBIENT.map((log, i) => (
            <div key={i}>
              <span className="hero__log-ts">{log.ts}</span>
              {log.text}
            </div>
          ))}
        </div>
      </div>
      <div className="hero__grid" aria-hidden="true" />

      <div className="wrap hero__content">
        <Reveal as="p" className="comment">
          // Salon Raut — ASP.NET Core Developer
        </Reveal>

        <Reveal as="h1" delay={1} className="hero__title">
          Salon Raut
          <span className="cursor cursor--lg">▊</span>
        </Reveal>

        <Reveal delay={2} className="hero__sub">
          <p className="hero__sub-line">
            <span className="hero__slash">//</span>
            <span>
              Building scalable backend systems with{" "}
              <em>Clean Architecture</em>, <em>CQRS</em> and{" "}
              <em>real-time features</em>.
            </span>
          </p>
          <p className="hero__sub-line">
            <span className="hero__slash">//</span>
            <span>Aspiring computer engineer.</span>
          </p>
        </Reveal>

        <div className="hero__row">
          <Reveal delay={3} className="hero__term">
            <HeroTerminal />
          </Reveal>
          <Reveal delay={4} className="hero__art">
            <HeroArt />
          </Reveal>
        </div>

        <Reveal delay={4} className="hero__cta">
          <a href="#projects" className="btn btn--primary">
            $ ls ./projects
          </a>
          <a href="#contact" className="btn">
            $ ping --contact
          </a>
        </Reveal>
      </div>

      <a href="#metrics" className="hero__scroll" aria-label="Scroll to metrics">
        <span>scroll</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}
