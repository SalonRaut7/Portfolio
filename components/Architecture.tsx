"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { TRACE_NODES, TRACE_STEPS } from "@/lib/data";

const STEP_MS = 420;

export default function Architecture() {
  const [step, setStep] = useState(-1);
  const bodyRef = useRef<HTMLPreElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = useCallback((from = 0) => {
    clearTimers();
    setStep(from);
    for (let i = from + 1; i <= TRACE_STEPS.length; i++) {
      timers.current.push(
        setTimeout(() => setStep(i), (i - from) * STEP_MS),
      );
    }
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        play(0);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [play]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [step]);

  const visible = step < 0 ? [] : TRACE_STEPS.slice(0, step);
  const activeNode = step > 0 ? TRACE_STEPS[step - 1].node : -1;
  const finished = step >= TRACE_STEPS.length;

  let elapsed = 0;
  const withElapsed = visible.map((s) => {
    elapsed += s.ms;
    return { ...s, at: elapsed };
  });

  const nodeReached = (i: number) =>
    visible.some((s) => s.node === i) || finished;

  return (
    <section className="section" id="architecture">
      <div className="wrap">
        <Reveal as="p" className="cmd">
          <span className="prompt">$</span> trace --follow request-flow.tasktracker
        </Reveal>
        <Reveal as="h2" delay={1} className="h2">
          Live request trace
          <span className="cursor">▊</span>
        </Reveal>
        <Reveal as="p" delay={2} className="lede">
          // One write to TaskTracker, end to end. Click a service to replay from there.
        </Reveal>

        <div className="arch" ref={rootRef}>
          <div className="arch__flow">
            {TRACE_NODES.map((node, i) => {
              const firstStep = TRACE_STEPS.findIndex((s) => s.node === i);
              return (
                <div key={node.id} style={{ display: "contents" }}>
                  <button
                    className={`node${activeNode === i ? " is-hot" : ""}${
                      nodeReached(i) ? " is-done" : ""
                    }`}
                    onClick={() => play(firstStep)}
                    aria-pressed={activeNode === i}
                  >
                    <span className="node__badge">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="node__name">{node.id}</span>
                    <span className="node__tech">{node.tech}</span>
                  </button>

                  {i < TRACE_NODES.length - 1 && (
                    <span
                      className={`arrow${activeNode > i || (finished && nodeReached(i + 1)) ? " is-lit" : ""}`}
                      aria-hidden="true"
                    >
                      <i />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="trace">
            <div className="trace__bar">
              <span className="dot dot--r" />
              <span className="dot dot--y" />
              <span className="dot dot--g" />
              <span className="trace__title">trace.log</span>
              <button className="trace__replay" onClick={() => play(0)}>
                ↻ replay
              </button>
            </div>

            <pre className="trace__body" ref={bodyRef} role="log" aria-live="polite">
              {withElapsed.length === 0 ? (
                <span className="trace__idle">waiting for request…</span>
              ) : (
                withElapsed.map((s, i) => (
                  <span
                    key={i}
                    className={`trace__line${s.node === -1 ? " trace__line--done" : ""}`}
                  >
                    <span className="trace__ms">{s.at}ms</span>
                    <span className="trace__svc">
                      {s.node === -1 ? "—" : TRACE_NODES[s.node].id}
                    </span>
                    <span className="trace__msg">{s.text}</span>
                  </span>
                ))
              )}
            </pre>
          </div>

          <div className="arch__side">
            <div className="chip">
              <span className="chip__dot" />
              RabbitMQ — async queue
            </div>
            <div className="chip">
              <span className="chip__dot" />
              Redis — cache layer
            </div>
            <div className="chip">
              <span className="chip__dot" />
              PostgreSQL — EF Core
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
