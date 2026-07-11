import Reveal from "./Reveal";

type Entry = {
  ts?: string;
  level: string;
  levelClass: "info" | "ok" | "warn";
  title: string;
  sub?: string[];
  note?: string;
};

const EDUCATION: Entry[] = [
  {
    ts: "2022-04 → 2026-04",
    level: "DEGREE",
    levelClass: "info",
    title: "B.E. Computer Engineering",
    sub: ["Khwopa Engineering College"],
  },
  {
    ts: "2019-07 → 2021-07",
    level: "SCHOOL",
    levelClass: "info",
    title: "Science",
    sub: ["Khwopa Secondary School — CGPA 3.43"],
  },
];

const CERTIFICATES: Entry[] = [
  { level: "CERT", levelClass: "ok", title: "Advanced Learning Algorithms" },
  {
    level: "CERT",
    levelClass: "ok",
    title: "Supervised Machine Learning: Regression and Classification",
  },
  { level: "CERT", levelClass: "ok", title: "Cloud Computing Workshop" },
];

const AWARDS: Entry[] = [
  {
    ts: "2023-02",
    level: "AWARD",
    levelClass: "warn",
    title: "1st Runner Up — Hult Prize",
    sub: ["at Khwopa Engineering College", "Hult Prize Foundation"],
  },
];

const LANGUAGES: Entry[] = [
  { level: "LANG", levelClass: "info", title: "Nepali", note: "native" },
  { level: "LANG", levelClass: "info", title: "English", note: "professional" },
];

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="entries">
      {entries.map((entry) => (
        <li className="entry" key={entry.title}>
          <div className="entry__top">
            {entry.ts && <span className="ts">{entry.ts}</span>}
            <span className={`lv lv--${entry.levelClass}`}>{entry.level}</span>
            <b className="entry__title">{entry.title}</b>
            {entry.note && <span className="entry__note">{entry.note}</span>}
          </div>
          {entry.sub?.map((line) => (
            <p className="entry__sub" key={line}>
              {line}
            </p>
          ))}
        </li>
      ))}
    </ul>
  );
}

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="wrap">
        <Reveal as="p" className="cmd">
          <span className="prompt">$</span> tail -n 20 /var/log/credentials.log
        </Reveal>
        <Reveal as="h2" delay={1} className="h2">
          Education &amp; credentials
          <span className="cursor">▊</span>
        </Reveal>

        <div className="creds">
          <Reveal delay={1} className="cred">
            <header className="cred__head">EDUCATION</header>
            <div className="cred__body">
              <EntryList entries={EDUCATION} />
            </div>
          </Reveal>

          <Reveal delay={2} className="cred">
            <header className="cred__head">CERTIFICATES</header>
            <div className="cred__body">
              <EntryList entries={CERTIFICATES} />
            </div>
          </Reveal>

          <Reveal delay={3} className="cred">
            <header className="cred__head">AWARDS</header>
            <div className="cred__body">
              <EntryList entries={AWARDS} />
            </div>
          </Reveal>

          <Reveal delay={4} className="cred">
            <header className="cred__head">LANGUAGES</header>
            <div className="cred__body">
              <EntryList entries={LANGUAGES} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
