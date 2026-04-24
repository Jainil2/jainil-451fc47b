import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  X,
  Cpu,
  Activity,
  Beaker,
  AlertTriangle,
  TerminalSquare,
} from "lucide-react";
import { useSimulationStore } from "@/lib/useSimulationStore";
import { useHudPrefs } from "@/lib/useHudPrefs";
import { useControlPlane, type EnvMode } from "@/lib/useControlPlane";

/**
 * Floating "htop"-style status widget. Now doubles as the SRE control-plane:
 * real web-vitals, commit SHA, env switcher (prod/staging/chaos), incidents,
 * and a live TPS sparkline. Persisted via localStorage.
 */
export function PortfolioHUD() {
  const { visible, setVisible, hydrated } = useHudPrefs();
  const { activeNodes, tokenCount, simulationsEnabled, setSimulationsEnabled } =
    useSimulationStore();
  const env = useControlPlane((s) => s.env);
  const setEnv = useControlPlane((s) => s.setEnv);
  const vitals = useControlPlane((s) => s.vitals);
  const status = useControlPlane((s) => s.status);
  const tpsHistory = useControlPlane((s) => s.tpsHistory);
  const pushTps = useControlPlane((s) => s.pushTps);
  const incidents = useControlPlane((s) => s.incidents);
  const ackIncident = useControlPlane((s) => s.ackIncident);

  const [tps, setTps] = useState(0);
  useTokenRate(tokenCount, setTps, pushTps);

  if (!hydrated) return null;

  if (!visible) {
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

  const openIncidents = incidents.filter((i) => !i.ack);

  return (
    <aside
      role="complementary"
      aria-label="Portfolio HUD"
      className="fixed bottom-5 left-5 z-40 hidden w-[336px] rounded-lg border border-border bg-card/90 shadow-xl backdrop-blur-md md:block"
    >
      <header className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="size-1.5 animate-pulse rounded-full bg-terminal" />
          <span className="text-terminal">jc-hud</span>
          <span className="text-muted-foreground">v1.1</span>
          <span className="text-muted-foreground/60">
            · <span className="text-cyan-accent">{shortSha(status.commit)}</span>
          </span>
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
        <EnvSwitcher value={env} onChange={setEnv} />

        <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
          <Cell label="tokens" value={String(tokenCount)} accent="terminal" />
          <Cell label="tps" value={tps.toFixed(1)} accent="cyan" />
          <Cell
            label="nodes"
            value={`${activeNodes.length}/3`}
            accent={activeNodes.length === 3 ? "terminal" : "destructive"}
          />
        </div>

        <Sparkline series={tpsHistory} />

        <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
          <Cell
            label="lcp"
            value={vitals.lcp === null ? "…" : `${vitals.lcp}ms`}
            accent={vitalTone(vitals.lcp, [2500, 4000])}
          />
          <Cell
            label="inp"
            value={vitals.inp === null ? "…" : `${vitals.inp}ms`}
            accent={vitalTone(vitals.inp, [200, 500])}
          />
          <Cell
            label="cls"
            value={vitals.cls === null ? "…" : String(vitals.cls)}
            accent={vitalTone(vitals.cls !== null ? vitals.cls * 1000 : null, [100, 250])}
          />
        </div>

        <div className="rounded-md border border-border bg-background/50 px-3 py-2 font-mono text-[11px]">
          <p className="text-muted-foreground">
            <span className="text-terminal">jainil</span>@portfolio:~$
          </p>
          <p className="mt-0.5 text-foreground/90">SWE · backend · distributed</p>
          <p className="text-muted-foreground">
            Nadiad, IN · bundle{" "}
            <span className="text-foreground">
              {status.bundleKb !== null ? `${status.bundleKb}kb` : "—"}
            </span>
          </p>
        </div>

        {openIncidents.length > 0 && (
          <ul className="space-y-1.5">
            {openIncidents.map((i) => (
              <li
                key={i.id}
                className="flex items-start justify-between gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-2 py-1.5 font-mono text-[10px]"
              >
                <div className="flex flex-1 items-start gap-1.5">
                  <AlertTriangle className="mt-0.5 size-3 text-destructive" />
                  <div>
                    <p className="text-destructive">{i.title}</p>
                    <p className="text-muted-foreground">{i.detail}</p>
                  </div>
                </div>
                <button
                  onClick={() => ackIncident(i.id)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Acknowledge incident"
                >
                  ack
                </button>
              </li>
            ))}
          </ul>
        )}

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

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSimulationsEnabled(!simulationsEnabled)}
            className="flex flex-1 items-center justify-between rounded-md border border-border bg-background/50 px-3 py-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground"
          >
            <span className="flex items-center gap-2">
              <Cpu className="size-3" /> simulations
            </span>
            <span className={simulationsEnabled ? "text-terminal" : "text-destructive"}>
              {simulationsEnabled ? "ON" : "OFF"}
            </span>
          </button>
          <button
            onClick={openShell}
            title="Open shell (⌘J)"
            aria-label="Open shell"
            className="rounded-md border border-border bg-background/50 px-2 py-1.5 font-mono text-[10px] text-muted-foreground hover:text-terminal"
          >
            <TerminalSquare className="size-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function openShell() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "j",
      metaKey: true,
    }),
  );
}

function EnvSwitcher({ value, onChange }: { value: EnvMode; onChange: (e: EnvMode) => void }) {
  const items: { k: EnvMode; label: string; cls: string }[] = [
    {
      k: "prod",
      label: "prod",
      cls: "text-terminal border-terminal/40 bg-terminal/10",
    },
    {
      k: "staging",
      label: "staging",
      cls: "text-cyan-accent border-cyan-accent/40 bg-cyan-accent/10",
    },
    {
      k: "chaos",
      label: "chaos",
      cls: "text-destructive border-destructive/40 bg-destructive/10",
    },
  ];
  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-background/50 p-0.5 font-mono text-[10px]">
      {items.map((it) => {
        const active = value === it.k;
        return (
          <button
            key={it.k}
            onClick={() => onChange(it.k)}
            aria-pressed={active}
            className={`flex-1 rounded px-2 py-1 transition-colors ${
              active
                ? it.cls + " border"
                : "border border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function Sparkline({ series }: { series: number[] }) {
  const max = Math.max(1, ...series);
  const w = 304;
  const h = 24;
  const step = w / Math.max(1, series.length - 1);
  const pts = series
    .map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * (h - 2) - 1).toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-6 w-full"
      aria-label="TPS sparkline (last 30 samples)"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="var(--cyan-accent)"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Cell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "terminal" | "cyan" | "destructive" | "muted";
}) {
  const color =
    accent === "terminal"
      ? "text-terminal"
      : accent === "cyan"
        ? "text-cyan-accent"
        : accent === "destructive"
          ? "text-destructive"
          : "text-muted-foreground";
  return (
    <div className="rounded-md border border-border bg-background/50 px-2 py-1.5 text-center">
      <p className="text-muted-foreground">{label}</p>
      <p className={`text-sm ${color}`}>{value}</p>
    </div>
  );
}

function vitalTone(
  n: number | null,
  thresholds: [number, number],
): "terminal" | "cyan" | "destructive" | "muted" {
  if (n === null) return "muted";
  if (n <= thresholds[0]) return "terminal";
  if (n <= thresholds[1]) return "cyan";
  return "destructive";
}

function shortSha(commit: string): string {
  if (!commit || commit === "dev") return "dev";
  return commit.slice(0, 7);
}

/** Throttles tokens-per-second derivation to 4 Hz; also pushes samples into the control-plane. */
function useTokenRate(tokens: number, setTps: (n: number) => void, pushTps: (n: number) => void) {
  const [last, setLast] = useState({ t: tokens, time: Date.now() });
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      const dt = (now - last.time) / 1000;
      if (dt > 0) {
        const delta = Math.max(0, last.t - tokens);
        const rate = delta / dt;
        setTps(rate);
        pushTps(rate);
      }
      setLast({ t: tokens, time: now });
    }, 250);
    return () => clearInterval(id);
  }, [tokens, last, setTps, pushTps]);
}
