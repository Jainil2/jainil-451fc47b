import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const projects = [
  {
    title: "Distributed NGO Volunteer Management Platform",
    summary:
      "Real-time coordination platform that scales to thousands of concurrent volunteers without breaking a sweat.",
    metrics: [
      "10K+ concurrent users",
      "Sub-200ms response times",
      "85% test coverage",
    ],
    stack: ["React", "Node.js", "MongoDB", "Redis", "S3", "Docker"],
  },
  {
    title: "Healthcare Records Management System",
    summary:
      "Serverless, accessible-first platform for managing patient records with strong auth and audit trails.",
    metrics: [
      "60% lower infra cost via serverless",
      "Lighthouse 98+ across the board",
      "100% accessibility score",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "JWT", "AWS Lambda", "Docker"],
  },
];

export function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading id="projects" prompt="ls -la ./projects" title="Projects" />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article
              className="group flex h-full flex-col rounded-lg border border-border bg-card/60 p-6 transition-all hover:-translate-y-0.5 hover:border-terminal/50 hover:shadow-lg hover:shadow-terminal/10"
            >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-terminal">
                {p.title}
              </h3>
              <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terminal" />
            </div>

            <p className="mt-3 leading-relaxed text-muted-foreground">{p.summary}</p>

            <ul className="mt-4 space-y-1.5 font-mono text-sm">
              {p.metrics.map((m) => (
                <li key={m} className="flex items-center gap-2 text-foreground">
                  <span className="text-terminal">▹</span> {m}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-5">
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-border bg-secondary/50 px-2 py-1 font-mono text-xs text-cyan-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}