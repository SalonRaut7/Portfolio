import Reveal from "./Reveal";
import { SKILL_GROUPS } from "@/lib/data";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <Reveal as="p" className="cmd">
          <span className="prompt">$</span> cat ./config/*.config
        </Reveal>
        <Reveal as="h2" delay={1} className="h2">
          Skills
          <span className="cursor">▊</span>
        </Reveal>

        <div className="configs">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal
              key={group.file}
              as="article"
              delay={(i % 3) + 1}
              className="config"
            >
              <header className="config__head">{group.file}</header>
              <ul className="tags tags--lg">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
