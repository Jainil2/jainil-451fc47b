import { SectionHeading } from "./SectionHeading";
import { FileText } from "lucide-react";

const drafts = [
  {
    title: "Cutting GraphQL latency by 40%",
    excerpt:
      "What we changed in our resolver layer, batching strategy, and cache keys — and what we'd do differently next time.",
    tag: "performance",
  },
  {
    title: "Self-hosting Ory Hydra at 50K users",
    excerpt:
      "A field guide to deploying Ory Hydra in production: SSO, scopes, key rotation, and the gotchas we hit at scale.",
    tag: "auth",
  },
  {
    title: "Reading your AWS bill like a detective",
    excerpt:
      "Anomaly detection, rightsizing, and the unglamorous savings hiding in CloudWatch metrics most teams never look at.",
    tag: "cloud",
  },
];

export function Writing() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        id="writing"
        prompt="ls ./notes"
        title="Notes from the terminal"
      />

      <p className="-mt-6 mb-8 max-w-2xl text-muted-foreground">
        Long-form notes on backend, distributed systems, and the boring details
        that make production stay boring. Coming soon.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {drafts.map((d) => (
          <article
            key={d.title}
            className="group relative flex h-full flex-col rounded-lg border border-dashed border-border bg-card/40 p-5 transition-colors hover:border-terminal/40"
          >
            <div className="flex items-center justify-between">
              <FileText className="size-4 text-muted-foreground" />
              <span className="rounded border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-accent">
                {d.tag}
              </span>
            </div>
            <h3 className="mt-4 font-mono text-base font-semibold text-foreground">
              {d.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {d.excerpt}
            </p>
            <p className="mt-auto pt-5 font-mono text-xs text-terminal/80">
              // status: draft — coming soon
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}