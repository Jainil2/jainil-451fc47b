import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, Beaker } from "lucide-react";
import { labRegistry } from "@/lib/labRegistry";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab — Interactive System Design Demos · Jainil Chauhan" },
      {
        name: "description",
        content:
          "Playable mini-games demonstrating distributed systems, data structures, and algorithms — Bloom filters, Raft consensus, LRU cache, sorting algorithms, and Dijkstra pathfinding.",
      },
      { property: "og:title", content: "Lab — Interactive System Design Demos" },
      {
        property: "og:description",
        content:
          "5 playable demos: Bloom Filter, LRU Cache, Raft Election, Sorting Race, Dijkstra Pathfinder.",
      },
    ],
  }),
  component: LabIndex,
});

function LabIndex() {
  const { pathname } = useLocation();

  if (pathname !== "/lab") {
    return <Outlet />;
  }

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

        <div className="mt-8 flex items-center gap-3">
          <Beaker className="size-6 text-terminal" />
          <h1 className="font-mono text-3xl font-bold">
            <span className="text-muted-foreground">~/jainil/</span>
            <span className="text-terminal">lab</span>
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Interactive demos of the system design and DSA concepts I work with daily. Each one is a
          two-minute play — click around and break things.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labRegistry.map((lab) => (
            <Link
              key={lab.slug}
              to="/lab/$slug"
              params={{ slug: lab.slug }}
              className="group rounded-lg border border-border bg-card/60 p-5 transition-all hover:border-terminal/50 hover:glow-terminal"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-accent">
                {lab.category}
              </p>
              <h2 className="mt-2 font-mono text-lg font-semibold text-foreground group-hover:text-terminal">
                {lab.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{lab.blurb}</p>
              <p className="mt-4 font-mono text-xs text-terminal/80 group-hover:text-terminal">
                ▸ try it →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}