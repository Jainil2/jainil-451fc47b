import { SectionHeading } from "./SectionHeading";

const bullets = [
  "Cut GraphQL API latency by ~40% through query optimization, smarter data-fetching, and targeted caching.",
  "Shipped an enterprise OAuth 2.0 / OIDC platform on Ory Hydra serving 50K+ users with single sign-on and 99.9% uptime.",
  "Load-tested authentication flows at 3,600+ RPS using k6, surfacing and removing bottlenecks before production rollout.",
  "Built a cloud cost optimization platform with anomaly detection, rightsizing recommendations, and security posture monitoring across AWS accounts.",
];

export function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading id="experience" prompt="git log --oneline" title="Experience" />

      <div className="relative rounded-lg border border-border bg-card/60 p-6 sm:p-8">
        <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="font-mono text-xl font-semibold text-foreground">
              Software Engineer ·{" "}
              <span className="text-terminal">Tech Holding</span>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">Ahmedabad, India</p>
          </div>
          <p className="font-mono text-sm text-cyan-accent">Jan 2025 — Present</p>
        </div>

        <ul className="mt-5 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-terminal" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}