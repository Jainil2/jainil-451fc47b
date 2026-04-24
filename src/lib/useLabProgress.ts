import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "lab-progress-v1";

function loadSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr: unknown = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

function persist(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

/**
 * Tracks which lab demos the visitor has "completed" (meaningfully interacted with).
 * Pure localStorage — no backend dependency. Hydration-safe.
 */
export function useLabProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(loadSet());
    setHydrated(true);
  }, []);

  const markCompleted = useCallback((slug: string) => {
    setCompleted((prev) => {
      if (prev.has(slug)) return prev;
      const next = new Set(prev);
      next.add(slug);
      persist(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback((slug: string) => completed.has(slug), [completed]);

  const reset = useCallback(() => {
    setCompleted(new Set());
    persist(new Set());
  }, []);

  return { completed, hydrated, markCompleted, isCompleted, reset };
}
