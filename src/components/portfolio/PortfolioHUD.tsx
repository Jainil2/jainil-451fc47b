import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Download, X, Cpu, Activity, Beaker } from "lucide-react";
import { useSimulationStore } from "@/lib/useSimulationStore";
import { useHudPrefs } from "@/lib/useHudPrefs";

/**
 * Floating "htop"-style status widget. Shows live sim stats, mini résumé
 * strip, quick links, and a global simulations toggle. Persisted via localStorage.
 */
export function PortfolioHUD() {
  const { visible, setVisible, hydrated } = useHudPrefs();
  const { activeNodes, tokenCount, simulationsEnabled, setSimulationsEnabled } =
    useSimulationStore();
  const [tps, setTps] = useState(0);
  const lastTokensRef = useTokenRate(tokenCount, setTps);
  void lastTokensRef;

  if (!hydrated || !visible) {
    if (hydrated && !visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          aria-label="Show portfolio HUD"
          className="fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 font-mono text-xs text-muted-foreground shadow-lg backdrop-blur-md hover:text-terminal md:inline-flex"
        >
          <Activity className="size-3.5 text-terminal" />
          hud
        </button>
      );
    }
    return null;
  }

  return (
    <aside
      role="complementary"
      aria-label="Portfolio HUD"
      className="fixed bottom-5 left-5 z-40 hidden w-[320px] rounded-lg border border-border bg-card/90 shadow-xl backdrop-blur-md md:block"
    >
      <header className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="size-1.5 animate-pulse rounded-full bg-terminal" />
          <span className="text-terminal">jc-hud</span>
          <span className="text-muted-foreground">v1.0</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Hide HUD"
          className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </header>

      <div className="space-y-3 p-3">
        <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
          <Cell label="tokens" value={String(tokenCount)} accent="terminal" />
          <Cell label="tps" value={tps.toFixed(1)} accent="cyan" />
          <Cell
            label="nodes"
            value={`${activeNodes.length}/3`}
            accent={activeNodes.length === 3 ? "terminal" : "destructive"}
          />
        </div>

        <div className="rounded-md border border-border bg-background/50 px-3 py-2 font-mono text-[11px]">
          <p className="text-muted-foreground">
            <span className="text-terminal">jainil</span>@portfolio:~$
          </p>
          <p className="mt-0.5 text-foreground/90">SWE · backend · distributed</p>
          <p className="text-muted-foreground">Nadiad, IN · 3+ yrs · node/py/aws</p>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="/jainil-chauhan-resume.pdf"
            download
            title="Resume"
            className="flex-1 rounded-md border border-terminal/40 bg-terminal/10 px-2 py-1.5 text-center font-mono text-[10px] text-terminal hover:bg-terminal/20"
          >
            <Download className="mx-auto size-3" />
          </a>
          <a
            href="https://github.com/jainil-chauhan"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="flex-1 rounded-md border border-border bg-secondary/50 px-2 py-1.5 text-center text-foreground hover:border-terminal/50"
          >
            <Github className="mx-auto size-3" />
          </a>
          <a
            href="https://www.linkedin.com/in/jainil-chauhan"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="flex-1 rounded-md border border-border bg-secondary/50 px-2 py-1.5 text-center text-foreground hover:border-terminal/50"
          >
            <Linkedin className="mx-auto size-3" />
          </a>
          <a
            href="mailto:jainil.chauhan@example.com"
            title="Email"
            className="flex-1 rounded-md border border-border bg-secondary/50 px-2 py-1.5 text-center text-foreground hover:border-terminal/50"
          >
            <Mail className="mx-auto size-3" />
          </a>
          <Link
            to="/lab"
            title="Lab"
            className="flex-1 rounded-md border border-cyan-accent/40 bg-cyan-accent/10 px-2 py-1.5 text-center text-cyan-accent hover:bg-cyan-accent/20"
          >
            <Beaker className="mx-auto size-3" />
          </Link>
        </div>

        <button
          onClick={() => setSimulationsEnabled(!simulationsEnabled)}
          className="flex w-full items-center justify-between rounded-md border border-border bg-background/50 px-3 py-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground"
        >
          <span className="flex items-center gap-2">
            <Cpu className="size-3" /> simulations
          </span>
          <span className={simulationsEnabled ? "text-terminal" : "text-destructive"}>
            {simulationsEnabled ? "ON" : "OFF"}
          </span>
        </button>
      </div>
    </aside>
  );
}

function Cell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "terminal" | "cyan" | "destructive";
}) {
  const color =
    accent === "terminal"
      ? "text-terminal"
      : accent === "cyan"
        ? "text-cyan-accent"
        : "text-destructive";
  return (
    <div className="rounded-md border border-border bg-background/50 px-2 py-1.5 text-center">
      <p className="text-muted-foreground">{label}</p>
      <p className={`text-sm ${color}`}>{value}</p>
    </div>
  );
}

/** Throttles tokens-per-second derivation to 4 Hz. */
function useTokenRate(tokens: number, setTps: (n: number) => void) {
  const [last, setLast] = useState({ t: tokens, time: Date.now() });
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      const dt = (now - last.time) / 1000;
      if (dt > 0) {
        const delta = Math.max(0, last.t - tokens);
        setTps(delta / dt);
      }
      setLast({ t: tokens, time: now });
    }, 250);
    return () => clearInterval(id);
  }, [tokens, last, setTps]);
  return last;
}