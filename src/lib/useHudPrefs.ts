import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-hud-visible";

/** Persisted boolean for whether the floating HUD is shown. Default: true. */
export function useHudPrefs() {
  const [visible, setVisible] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) setVisible(raw === "1");
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, visible ? "1" : "0");
    } catch {
      // ignore
    }
  }, [visible, hydrated]);

  return { visible, setVisible, hydrated };
}