import { useEffect, useRef } from "react";
import { useControlPlane } from "@/lib/useControlPlane";

const CHAOS_INCIDENTS: { title: string; detail: string }[] = [
  { title: "p99 latency breach", detail: "auth.svc > 300ms for 60s. check PKCE verifier cache." },
  { title: "cache miss storm", detail: "bloom fp rate spiked; consider re-sizing bit array." },
  { title: "replica lag", detail: "hash-ring slot 2 drifted; investigate replication window." },
  { title: "rate limit 429", detail: "token bucket hit floor. backoff engaged." },
  { title: "leader flap", detail: "raft term bumped 3× in 10s; verify follower heartbeats." },
];

/**
 * Mounted once at the root. In `chaos` env it injects occasional fake incidents
 * into the HUD and applies a subtle global jitter filter. No-op in prod/staging.
 */
export function ChaosOverlay() {
  const env = useControlPlane((s) => s.env);
  const raise = useControlPlane((s) => s.raiseIncident);
  const clear = useControlPlane((s) => s.clearIncidents);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.dataset.env = env;
    if (env === "chaos") {
      root.classList.add("env-chaos");
    } else {
      root.classList.remove("env-chaos");
    }
    return () => {
      root.classList.remove("env-chaos");
    };
  }, [env]);

  useEffect(() => {
    if (env !== "chaos") {
      if (timerRef.current) clearTimeout(timerRef.current);
      clear();
      return;
    }
    const tick = () => {
      const pick = CHAOS_INCIDENTS[Math.floor(Math.random() * CHAOS_INCIDENTS.length)];
      raise({
        severity: "warn",
        title: pick.title,
        detail: pick.detail,
      });
      // 15–45s between events so it doesn't overwhelm
      timerRef.current = setTimeout(tick, 15_000 + Math.random() * 30_000);
    };
    timerRef.current = setTimeout(tick, 4_000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [env, raise, clear]);

  if (env !== "chaos") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 mix-blend-soft-light"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0, transparent 3px, oklch(0.65 0.22 27 / 6%) 3px, oklch(0.65 0.22 27 / 6%) 4px)",
      }}
    />
  );
}
