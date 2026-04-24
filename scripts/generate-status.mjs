#!/usr/bin/env node
// Writes public/status.json with the current git commit, build timestamp, and
// (when available) the built bundle size. Run pre-build and post-build.
import { execSync } from "node:child_process";
import { statSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const publicDir = join(repoRoot, "public");

function safeExec(cmd) {
  try {
    return execSync(cmd, { cwd: repoRoot, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

function commitSha() {
  return safeExec("git rev-parse --short HEAD") ?? "dev";
}

function walkSize(dir) {
  if (!existsSync(dir)) return 0;
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) total += walkSize(p);
    else total += statSync(p).size;
  }
  return total;
}

function bundleKb() {
  const candidates = [
    join(repoRoot, ".output", "public", "_build", "assets"),
    join(repoRoot, "dist", "assets"),
    join(repoRoot, ".output", "public", "assets"),
  ];
  for (const c of candidates) {
    const bytes = walkSize(c);
    if (bytes > 0) return Math.round(bytes / 1024);
  }
  return null;
}

function main() {
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
  const status = {
    commit: commitSha(),
    builtAt: new Date().toISOString(),
    bundleKb: bundleKb(),
    tests: null,
  };
  const out = join(publicDir, "status.json");
  writeFileSync(out, JSON.stringify(status, null, 2) + "\n", "utf8");
  console.log(`[status] wrote ${out}:`, status);
}

main();
