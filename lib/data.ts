export type Project = {
  name: string;
  status: "Running" | "Idle";
  port: string;
  route: string;
  description: string;
  tags: string[];
};

export type LogLine = {
  ts: string;
  level: "EVENT" | "INFO";
  message: string;
};

export type Role = {
  tag: string;
  title: string;
  period: string;
  location: string;
  lines: LogLine[];
};

export type SkillGroup = {
  file: string;
  items: string[];
};

export const NAV_LINKS = [
  { href: "#home", label: "/home" },
  { href: "#projects", label: "/projects" },
  { href: "#experience", label: "/experience" },
  { href: "#contact", label: "/contact" },
] as const;

export const CONTACT = {
  email: "rautsalon@gmail.com",
  phone: "+977 9843310229",
  phoneHref: "+9779843310229",
  location: "Bhaktapur, Nepal",
  github: "SalonRaut7",
  githubUrl: "https://github.com/SalonRaut7",
  linkedin: "salon-raut",
  linkedinUrl: "https://linkedin.com/in/salon-raut",
} as const;

export const AMBIENT_LOGS: string[] = [
  "INFO  Kestrel listening on http://0.0.0.0:5001",
  "INFO  MediatR pipeline registered — 42 handlers",
  "DEBUG EF Core: SELECT t.* FROM Tasks AS t WHERE t.SprintId = @p0",
  "INFO  Redis cache HIT key=org:12:projects ttl=280s",
  "INFO  RabbitMQ: published task.created → notifications.queue",
  "INFO  SignalR: client connected — hub=/hubs/notifications",
  "WARN  Rate limit: 98/100 requests in window — client 10.0.0.14",
  "INFO  JWT validated — sub=usr_8812 roles=[Admin]",
  "DEBUG FluentValidation: CreateTaskCommand passed 6 rules",
  "INFO  Serilog sink flushed — 128 events",
  "INFO  Cloudinary: uploaded attachment 2.4MB → cdn",
  "INFO  Redis cache MISS key=user:8812:feed — repopulating",
  "INFO  SignalR: broadcast mention → 3 subscribers",
  "INFO  RabbitMQ: consumer ack — email.queue depth=0",
  "DEBUG CQRS: GetSprintBoardQuery handled in 18ms",
  "INFO  Health check /healthz → Healthy (db, redis, mq)",
  "INFO  EF Core migration applied — 20260415_AddEpics",
  "INFO  SMTP: verification mail queued → usr_9034",
];

export const PROJECTS: Project[] = [
  {
    name: "task-tracker",
    status: "Running",
    port: ":5001",
    route: "/api/tasks",
    description:
      "Enterprise task-management platform — Clean Architecture and CQRS with MediatR, real-time collaboration across Organizations, Projects, Epics, Sprints and Tasks.",
    tags: ["ASP.NET Core 9", "React + TS", "PostgreSQL", "RabbitMQ", "Redis", "SignalR"],
  },
  {
    name: "welltrack",
    status: "Running",
    port: ":5002",
    route: "/api/wellness",
    description:
      "Full-stack wellness platform tracking mood, sleep, steps, hydration and habits, with analytics, admin tooling and AI-assisted recommendations via a FastAPI microservice.",
    tags: ["ASP.NET Core 9", "React + TS", "PostgreSQL", "FastAPI", "SignalR"],
  },
  {
    name: "social-media-microservices",
    status: "Running",
    port: ":4000",
    route: "/api/gateway",
    description:
      "Modular social platform on a microservices architecture — independent user, post and search services communicating over a message broker.",
    tags: ["Node.js", "Express", "MongoDB", "RabbitMQ", "Docker"],
  },
  {
    name: "data-viz-tool",
    status: "Idle",
    port: ":8501",
    route: "/viz",
    description:
      "Dynamic data-visualization workbench — waveform generation, equation solving, function plotting and dataset analysis in a single interface.",
    tags: ["Streamlit", "Pandas", "NumPy", "Matplotlib", "SciPy"],
  },
  {
    name: "manema",
    status: "Idle",
    port: ":8000",
    route: "/booking",
    description:
      "Online movie-ticket booking system — user authentication, live TMDB-backed movie data and booking confirmations, replacing a manual counter workflow.",
    tags: ["Django", "PHP", "React", "SQLite", "TMDB API"],
  },
  {
    name: "blogify",
    status: "Idle",
    port: ":3000",
    route: "/posts",
    description:
      "Dynamic blogging application — user verification, role-based admin/user access and a full post creation, editing and deletion lifecycle.",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
  },
  {
    name: "employee-management",
    status: "Idle",
    port: ":8502",
    route: "/employees",
    description:
      "Web-based employee management system — role-separated interfaces for administrators and employees over a PostgreSQL store.",
    tags: ["Streamlit", "PostgreSQL", "Python"],
  },
];

export const ROLES: Role[] = [
  {
    tag: "spiralogics",
    title: "ASP.NET Developer (Internship)",
    period: "2026-03 — 2026-06",
    location: "Sankhamul Tower, Baneshwor",
    lines: [
      { ts: "2026-03-01", level: "EVENT", message: "process started — ASP.NET Developer @ Spiralogics Inc." },
      { ts: "2026-03-15", level: "INFO", message: "shipped: TaskTracker — Clean Architecture, CQRS, MediatR" },
      { ts: "2026-04-10", level: "INFO", message: "implemented: JWT auth, RBAC, FluentValidation, rate limiting" },
      { ts: "2026-04-25", level: "INFO", message: "integrated: RabbitMQ async processing, Redis caching layer" },
      { ts: "2026-05-15", level: "INFO", message: "built: real-time collaboration via SignalR — live sync, mentions" },
      { ts: "2026-06-01", level: "EVENT", message: "process exited 0 — internship complete" },
    ],
  },
  {
    tag: "verisk-nepal",
    title: "ASP.NET Developer (Mentorship)",
    period: "2025-10 — 2026-01",
    location: "Pulchowk, Lalitpur",
    lines: [
      { ts: "2025-10-01", level: "EVENT", message: "process started — Mentorship Program @ Verisk Nepal" },
      { ts: "2025-10-20", level: "INFO", message: "shipped: WellTrack — full-stack wellness platform" },
      { ts: "2025-11-15", level: "INFO", message: "implemented: JWT + email OTP auth, role-based authorization" },
      { ts: "2025-12-10", level: "INFO", message: "integrated: USDA food API, AI microservice (FastAPI) for recs" },
      { ts: "2026-01-31", level: "EVENT", message: "process exited 0 — mentorship complete" },
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  { file: "frontend.config", items: ["HTML", "CSS", "JavaScript", "ReactJS", "TypeScript"] },
  { file: "backend.config", items: [".NET Core", "C#", "Python", "Node.js", "RESTful API Design"] },
  { file: "databases.config", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { file: "machine-learning.config", items: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"] },
  { file: "tools.config", items: ["Docker", "RabbitMQ", "Git", "Linux"] },
  { file: "soft-skills.config", items: ["Teamwork", "Communication", "Problem Solving", "Leadership"] },
];

export const TRACE_NODES = [
  { id: "api-gateway", tech: "ASP.NET Core" },
  { id: "auth", tech: "JWT · RBAC" },
  { id: "task-service", tech: "CQRS · MediatR" },
  { id: "notification-hub", tech: "SignalR" },
] as const;

export const TRACE_STEPS: { node: number; text: string; ms: number }[] = [
  { node: 0, text: "POST /api/tasks — request received", ms: 3 },
  { node: 0, text: "rate-limit: 12/100 in window — pass", ms: 1 },
  { node: 1, text: "JWT validated — sub=usr_8812 roles=[Member]", ms: 6 },
  { node: 1, text: "RBAC: org:12 → write:tasks granted", ms: 2 },
  { node: 2, text: "FluentValidation: CreateTaskCommand ok", ms: 4 },
  { node: 2, text: "MediatR → CreateTaskCommandHandler", ms: 2 },
  { node: 2, text: "EF Core: INSERT INTO Tasks — 1 row", ms: 14 },
  { node: 2, text: "Redis: invalidate key=org:12:board", ms: 2 },
  { node: 2, text: "RabbitMQ: publish task.created → notifications.q", ms: 5 },
  { node: 3, text: "consumer ack — fan-out to 3 subscribers", ms: 7 },
  { node: 3, text: "SignalR: broadcast TaskCreated → live board", ms: 4 },
  { node: -1, text: "201 Created — total 50ms", ms: 0 },
];
