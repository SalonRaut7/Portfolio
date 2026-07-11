const STACK: { key: string; values: string[] }[] = [
  { key: "languages", values: ["C#", "TypeScript", "Python", "JavaScript"] },
  { key: "frameworks", values: ["ASP.NET Core", "React", "Node.js", "FastAPI"] },
  { key: "databases", values: ["PostgreSQL", "MongoDB", "Redis"] },
  { key: "messaging", values: ["RabbitMQ", "SignalR"] },
  { key: "infra", values: ["Docker", "Linux", "Git"] },
];

const STATUS = [
  { label: "Loaded", value: "loaded (/etc/systemd/system/portfolio.service)" },
  { label: "Active", value: "active (running) since Apr 2022" },
  { label: "Location", value: "Bhaktapur, Nepal" },
];

export default function HeroTerminal() {
  let line = 0;
  const step = () => ({ animationDelay: `${420 + line++ * 85}ms` });

  return (
    <div className="term">
      <div className="term__bar">
        <span className="term__dot term__dot--r" />
        <span className="term__dot term__dot--y" />
        <span className="term__dot term__dot--g" />
        <span className="term__title">salon@portfolio:~</span>
      </div>

      <div className="term__body">
        <p className="term__line" style={step()}>
          <span className="prompt">$</span> cat /etc/stack.conf
        </p>

        {STACK.map((entry) => (
          <p className="term__line term__out" key={entry.key} style={step()}>
            <span className="term__key">{entry.key}</span>
            <span className="term__eq">=</span>
            <span className="term__val">
              [
              {entry.values.map((value, i) => (
                <span key={value}>
                  {value}
                  {i < entry.values.length - 1 && <span className="term__sep">, </span>}
                </span>
              ))}
              ]
            </span>
          </p>
        ))}

        <p className="term__line term__gap" style={step()}>
          <span className="prompt">$</span> systemctl status portfolio.service
        </p>

        <p className="term__line term__out" style={step()}>
          <span className="term__ok">●</span>
          <span>
            <b>portfolio.service</b> — Salon Raut, ASP.NET Core Developer
          </span>
        </p>

        {STATUS.map((row) => (
          <p className="term__line term__out" key={row.label} style={step()}>
            <span className="term__label">{row.label}:</span>
            <span className="term__val">{row.value}</span>
          </p>
        ))}

        <p className="term__line term__gap" style={step()}>
          <span className="prompt">$</span>
          <span className="cursor">▊</span>
        </p>
      </div>
    </div>
  );
}
