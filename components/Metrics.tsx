"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / 900, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * target));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return { value, ref };
}

function Counter({ to }: { to: number }) {
  const { value, ref } = useCountUp(to);
  return <span ref={ref}>{value}</span>;
}

export default function Metrics() {
  return (
    <section className="section section--tight" id="metrics">
      <div className="wrap">
        <Reveal as="p" className="cmd">
          <span className="prompt">$</span> cat /proc/salon/metrics
        </Reveal>

        <div className="metrics">
          <Reveal as="article" delay={1} className="metric">
            <span className="metric__key">projects_shipped</span>
            <span className="metric__val">
              <Counter to={7} />
            </span>
            <span className="metric__meta">public repositories</span>
          </Reveal>

          <Reveal as="article" delay={2} className="metric">
            <span className="metric__key">experience</span>
            <span className="metric__val">
              <Counter to={2} /> <em>internships</em>
            </span>
            <span className="metric__meta">Spiralogics Inc. · Verisk Nepal</span>
          </Reveal>

          <Reveal as="article" delay={3} className="metric">
            <span className="metric__key">core_stack</span>
            <span className="metric__val metric__val--sm">
              ASP.NET Core <i>·</i> React <i>·</i> PostgreSQL
            </span>
            <span className="metric__meta">+ RabbitMQ · Redis · SignalR</span>
          </Reveal>

          <Reveal as="article" delay={4} className="metric">
            <span className="metric__key">status</span>
            <span className="metric__val metric__val--sm ok">
              <span className="pulse" /> open to opportunities
            </span>
            <span className="metric__meta">Bhaktapur, Nepal · remote friendly</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
