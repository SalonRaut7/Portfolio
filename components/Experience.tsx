import Reveal from "./Reveal";
import { ROLES } from "@/lib/data";

function renderMessage(message: string) {
  const match = message.match(/^(shipped: )([^\s—]+)(.*)$/);
  if (!match) return message;
  return (
    <>
      {match[1]}
      <b>{match[2]}</b>
      {match[3]}
    </>
  );
}

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Reveal as="p" className="cmd">
          <span className="prompt">$</span> cat career.log | sort -rk1
        </Reveal>
        <Reveal as="h2" delay={1} className="h2">
          Experience
          <span className="cursor">▊</span>
        </Reveal>

        {ROLES.map((role, i) => (
          <Reveal key={role.tag} delay={i + 2} className="logblock">
            <div className="logblock__head">
              <span className="logblock__tag">──[{role.tag}]</span>
              <span className="logblock__role">{role.title}</span>
              <span className="logblock__date">{role.period}</span>
              <span className="logblock__loc">{role.location}</span>
            </div>

            <div className="logblock__body">
              {role.lines.map((line) => (
                <div className="line" key={line.ts + line.message}>
                  <span className="ts">{line.ts}</span>
                  <span
                    className={`lv lv--${line.level === "EVENT" ? "event" : "info"}`}
                  >
                    {line.level}
                  </span>
                  <span className="msg">{renderMessage(line.message)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
