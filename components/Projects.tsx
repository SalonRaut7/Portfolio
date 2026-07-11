import Reveal from "./Reveal";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal as="p" className="cmd">
          <span className="prompt">$</span> kubectl get services --namespace=salon
        </Reveal>
        <Reveal as="h2" delay={1} className="h2">
          Projects
          <span className="cursor">▊</span>
        </Reveal>

        <Reveal delay={2} className="table-head">
          <span>NAME</span>
          <span>STATUS</span>
          <span>PORT</span>
          <span>ROUTE</span>
        </Reveal>

        <div className="services">
          {PROJECTS.map((project, i) => (
            <Reveal
              key={project.name}
              as="article"
              delay={(i % 3) + 1}
              className="svc"
            >
              <div className="svc__row">
                <h3 className="svc__name">{project.name}</h3>
                <span
                  className={`badge${project.status === "Running" ? " badge--running" : ""}`}
                >
                  {project.status === "Running" && <span className="pulse" />}
                  {project.status}
                </span>
                <span className="svc__port">{project.port}</span>
                <span className="svc__route">{project.route}</span>
              </div>

              <p className="svc__desc">{project.description}</p>

              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
