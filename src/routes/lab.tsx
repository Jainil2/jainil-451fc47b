import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, Beaker, CheckCircle2 } from "lucide-react";
import { labRegistry } from "@/lib/labRegistry";
import { useLabProgress } from "@/lib/useLabProgress";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab — Interactive System Design Demos · Jainil Chauhan" },
      {
        name: "description",
        content:
          "Playable mini-games demonstrating distributed systems, data structures, algorithms, and security — Bloom filters, Raft consensus, LRU cache, sorting algorithms, Dijkstra pathfinding, and the OAuth 2.0 / OIDC flow.",
      },
      { property: "og:title", content: "Lab — Interactive System Design Demos" },
      {
        property: "og:description",
        content:
          "Playable demos: Bloom Filter, LRU Cache, Raft Election, Sorting Race, Dijkstra Pathfinder, OAuth 2.0 / OIDC flow.",
      },
    ],
  }),
  component: LabIndex,
});

function LabIndex() {
  const { pathname } = useLocation();
  const { isCompleted, completed, hydrated, reset } = useLabProgress();

  if (pathname !== "/lab") {
    return <Outlet />;
  }

  const completedCount = hydrated ? completed.size : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-terminal"
        >
          <ArrowLeft className="size-3" />
          ~/jainil $ cd ..
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <Beaker className="size-6 text-terminal" />
            <h1 className="font-mono text-3xl font-bold">
              <span className="text-muted-foreground">~/jainil/</span>
              <span className="text-terminal">lab</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>
              progress:{" "}
              <span className="text-terminal">
                {completedCount}/{labRegistry.length}
              </span>{" "}
              completed
            </span>
            {completedCount > 0 && (
              <button
                onClick={reset}
                className="rounded border border-border px-2 py-0.5 hover:text-foreground"
              >
                reset
              </button>
            )}
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Interactive demos of the system design, DSA, and security concepts I work with daily. Each
          one is a two-minute play — click around and break things.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labRegistry.map((lab) => {
            const done = hydrated && isCompleted(lab.slug);
            return (
              <Link
                key={lab.slug}
                to="/lab/$slug"
                params={{ slug: lab.slug }}
                className={`group relative rounded-lg border p-5 transition-all ${
                  done
                    ? "border-terminal/40 bg-terminal/5 hover:border-terminal/70"
                    : "border-border bg-card/60 hover:border-terminal/50 hover:glow-terminal"
                }`}
              >
                {done && (
                  <CheckCircle2
                    className="absolute right-3 top-3 size-4 text-terminal"
                    aria-label="completed"
                  />
                )}
                <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-accent">
                  {lab.category}
                </p>
                <h2 className="mt-2 font-mono text-lg font-semibold text-foreground group-hover:text-terminal">
                  {lab.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{lab.blurb}</p>
                <p className="mt-4 font-mono text-xs text-terminal/80 group-hover:text-terminal">
                  {done ? "✓ replay →" : "▸ try it →"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
