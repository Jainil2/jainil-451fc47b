import { useCallback, useEffect, useRef, useState } from "react";
import { useSimulationStore } from "@/lib/useSimulationStore";

const MAX_TOKENS = 10;
const DRAIN_PER_CHAR = 0.1;
const REPLENISH_PER_MS = 1 / 1000; // 1 token per second

/**
 * Token-bucket rate limiter hook using requestAnimationFrame for smooth
 * replenishment.
 *
 * Architecture decision: token math runs entirely in local refs (no Zustand
 * writes inside the rAF loop). A separate setInterval at 100 ms flushes the
 * current ref value into local React state — decoupling the 60fps animation
 * tick from React's render cycle entirely and avoiding "Maximum update depth
 * exceeded" caused by Zustand's forceStoreRerender being called synchronously
 * inside rAF.
 *
 * The global Zustand store is still used so that the CommandPalette can check
 * simulationsEnabled; token state itself lives here locally.
 */
export function useTokenBucket(requiredTokens = 1) {
  const simulationsEnabled = useSimulationStore((s) => s.simulationsEnabled);

  // Source of truth: a plain mutable ref — never triggers renders
  const tokenRef = useRef<number>(MAX_TOKENS);
  // What React actually renders — updated at most every 100ms
  const [displayTokens, setDisplayTokens] = useState(MAX_TOKENS);

  const lastTickRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // rAF loop: pure ref math, zero React / Zustand involvement
  useEffect(() => {
    if (!simulationsEnabled) return;

    function tick(timestamp: number) {
      if (lastTickRef.current !== null) {
        const delta = timestamp - lastTickRef.current;
        tokenRef.current = Math.min(MAX_TOKENS, tokenRef.current + delta * REPLENISH_PER_MS);
      }
      lastTickRef.current = timestamp;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTickRef.current = null;
    };
  }, [simulationsEnabled]);

  // Flush ref → React state at a controlled rate (no rAF interaction)
  useEffect(() => {
    if (!simulationsEnabled) return;
    const id = setInterval(() => {
      setDisplayTokens(tokenRef.current);
    }, 100);
    return () => clearInterval(id);
  }, [simulationsEnabled]);

  const onType = useCallback(
    (charsDelta: number) => {
      if (!simulationsEnabled) return;
      tokenRef.current = Math.max(0, tokenRef.current - charsDelta * DRAIN_PER_CHAR);
      // Immediate flush so the UI responds to typing without waiting 100ms
      setDisplayTokens(tokenRef.current);
    },
    [simulationsEnabled],
  );

  return {
    tokens: simulationsEnabled ? displayTokens : MAX_TOKENS,
    maxTokens: MAX_TOKENS,
    onType,
    canSubmit: !simulationsEnabled || displayTokens >= requiredTokens,
    isRateLimited: simulationsEnabled && displayTokens < requiredTokens,
  };
}
