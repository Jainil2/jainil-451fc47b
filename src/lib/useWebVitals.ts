import { useEffect } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import { useControlPlane } from "./useControlPlane";

/**
 * Subscribes to `web-vitals` and pushes each sample into the control-plane store.
 * Safe to mount once at the root — noops on SSR.
 */
export function useWebVitals() {
  const setVital = useControlPlane((s) => s.setVital);

  useEffect(() => {
    if (typeof window === "undefined") return;
    onLCP((m) => setVital("lcp", Math.round(m.value)));
    onINP((m) => setVital("inp", Math.round(m.value)));
    onCLS((m) => setVital("cls", Number(m.value.toFixed(3))));
    onFCP((m) => setVital("fcp", Math.round(m.value)));
    onTTFB((m) => setVital("ttfb", Math.round(m.value)));
  }, [setVital]);
}
