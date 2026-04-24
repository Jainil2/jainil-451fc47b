import { useEffect } from "react";
import { useControlPlane, type BuildStatus } from "./useControlPlane";

/**
 * Loads /status.json (generated at build time by scripts/generate-status.mjs)
 * and pushes it into the control-plane store. Tolerant of missing/malformed JSON.
 */
export function useBuildStatus() {
  const setStatus = useControlPlane((s) => s.setStatus);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    fetch("/status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Partial<BuildStatus> | null) => {
        if (cancelled || !data) return;
        setStatus({
          commit: typeof data.commit === "string" ? data.commit : "dev",
          bundleKb: typeof data.bundleKb === "number" ? data.bundleKb : null,
          builtAt: typeof data.builtAt === "string" ? data.builtAt : null,
          tests:
            data.tests && typeof data.tests === "object"
              ? {
                  passing: Number(data.tests.passing ?? 0),
                  total: Number(data.tests.total ?? 0),
                }
              : null,
        });
      })
      .catch(() => {
        // swallow — leave defaults in place
      });
    return () => {
      cancelled = true;
    };
  }, [setStatus]);
}
