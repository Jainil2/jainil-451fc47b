import { useEffect } from "react";
import { create } from "zustand";

/** prod = polished default, staging = debug overlays, chaos = injected jitter + incidents. */
export type EnvMode = "prod" | "staging" | "chaos";

export interface WebVitals {
  lcp: number | null;
  inp: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

export interface BuildStatus {
  commit: string;
  bundleKb: number | null;
  builtAt: string | null;
  tests: { passing: number; total: number } | null;
}

export interface Incident {
  id: string;
  severity: "info" | "warn" | "page";
  title: string;
  detail: string;
  at: number;
  ack: boolean;
}

interface ControlPlaneState {
  env: EnvMode;
  setEnv: (e: EnvMode) => void;

  vitals: WebVitals;
  setVital: (k: keyof WebVitals, v: number) => void;

  status: BuildStatus;
  setStatus: (s: Partial<BuildStatus>) => void;

  /** Rolling 30-sample series used for sparklines in the HUD. */
  tpsHistory: number[];
  pushTps: (n: number) => void;

  incidents: Incident[];
  raiseIncident: (i: Omit<Incident, "id" | "at" | "ack">) => void;
  ackIncident: (id: string) => void;
  clearIncidents: () => void;
}

const ENV_STORAGE_KEY = "control-plane-env";

function loadInitialEnv(): EnvMode {
  if (typeof window === "undefined") return "prod";
  try {
    const raw = window.localStorage.getItem(ENV_STORAGE_KEY);
    if (raw === "prod" || raw === "staging" || raw === "chaos") return raw;
  } catch {
    // ignore
  }
  return "prod";
}

export const useControlPlane = create<ControlPlaneState>((set) => ({
  env: "prod",
  setEnv: (e) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ENV_STORAGE_KEY, e);
      }
    } catch {
      // ignore
    }
    set({ env: e });
  },

  vitals: { lcp: null, inp: null, cls: null, fcp: null, ttfb: null },
  setVital: (k, v) =>
    set((state) => ({
      vitals: { ...state.vitals, [k]: v },
    })),

  status: { commit: "dev", bundleKb: null, builtAt: null, tests: null },
  setStatus: (s) =>
    set((state) => ({
      status: { ...state.status, ...s },
    })),

  tpsHistory: Array(30).fill(0),
  pushTps: (n) =>
    set((state) => {
      const next = state.tpsHistory.slice(1);
      next.push(n);
      return { tpsHistory: next };
    }),

  incidents: [],
  raiseIncident: (i) =>
    set((state) => ({
      incidents: [
        ...state.incidents,
        {
          ...i,
          id: `inc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          at: Date.now(),
          ack: false,
        },
      ].slice(-5),
    })),
  ackIncident: (id) =>
    set((state) => ({
      incidents: state.incidents.map((i) => (i.id === id ? { ...i, ack: true } : i)),
    })),
  clearIncidents: () => set({ incidents: [] }),
}));

/** Hydrates window-scoped state that zustand can't read during SSR. */
export function useHydrateControlPlane() {
  const setEnv = useControlPlane((s) => s.setEnv);
  useEffect(() => {
    const initial = loadInitialEnv();
    if (initial !== useControlPlane.getState().env) {
      setEnv(initial);
    }
  }, [setEnv]);
}
