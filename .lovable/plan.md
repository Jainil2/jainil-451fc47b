

# Pass 4 — Interactive System Design Lab + Portfolio HUD

You already have three live simulations woven into the portfolio (Token Bucket in Contact, Consistent Hash Ring in Projects, LSM-Tree in Experience). This pass adds a dedicated **"Lab"** of playable system-design / DSA mini-games and a floating **Portfolio HUD** that ties it all together so it feels like a single, hand-crafted developer toolkit instead of a list of widgets.

---

## What you'll get

1. **/lab — System Design Playground** (new route)
   A grid of small interactive demos. Each one is a 2-minute "play" that demonstrates a real concept and links back to where you used it in production.

2. **5 new playable mini-games** (in addition to the 3 you already have)

   | Game | Concept | Interaction |
   |---|---|---|
   | **Bloom Filter** | Probabilistic set membership | Type a word → 3 hash functions light up bit positions → see false-positive rate climb live |
   | **LRU Cache** | Eviction policy | Click "keys" to access them; watch the doubly-linked list reorder and evict the tail when full |
   | **Raft Leader Election** | Consensus | 5-node cluster; click a node to crash it, watch followers time out, vote, and elect a new leader with animated RPCs |
   | **Sorting Race** | Algorithm comparison | Bubble vs Quick vs Merge running side-by-side on the same array, with bar-height animation and op-count |
   | **Dijkstra Pathfinder** | Graph algorithms | Click cells on a grid to add walls, click Run, watch the frontier expand and the shortest path light up |

3. **Portfolio HUD** (the "plugin")
   A small floating panel (bottom-left, dismissible, persisted in `localStorage`) showing:
   - Live "system stats": tokens/sec drained, healthy nodes, current section
   - Mini résumé strip (role · location · years · primary stack)
   - Quick links: resume, GitHub, LinkedIn, email, ⌘K
   - Toggle to show/hide simulations globally (mirrors the command palette setting)

   Looks like a `htop` / status-bar widget — reinforces the "engineer built this" vibe without being noisy.

4. **Lab entry points wired into the rest of the site**
   - Nav gets a `lab` link
   - Command palette gets a "Labs" group with each game indexed (`⌘K → "bloom"`)
   - Each Skills card with a matching concept (Distributed Systems, DSA, Data) gets a small `▸ try it` chip linking into the relevant lab demo
   - The hero adds a one-line "this site is interactive — try `⌘K` or visit `/lab`"

5. **Polish**
   - Every new sim respects `prefers-reduced-motion` and the global Simulations toggle
   - Each game has a tiny "What you're seeing" caption and a "Where I used this" link to the relevant project case-study
   - Mobile-friendly: games collapse to single-column with simplified controls
   - Per-game SEO: `/lab` and `/lab/$slug` get unique titles and descriptions for shareable deep-links

---

## File structure

```text
src/
  routes/
    lab.tsx                          # /lab — grid of game cards
    lab.$slug.tsx                    # /lab/bloom-filter, etc. — full-page game view
  components/
    system-design/
      BloomFilter.tsx                # NEW — animated bit-array + hash fns
      LRUCache.tsx                   # NEW — doubly linked list visual
      RaftCluster.tsx                # NEW — 5-node election sim
      SortingRace.tsx                # NEW — 3-way bar-chart race
      DijkstraGrid.tsx               # NEW — clickable grid + frontier
      GameCard.tsx                   # NEW — shared wrapper (title, caption, link)
    portfolio/
      PortfolioHUD.tsx               # NEW — the floating "plugin"
      Nav.tsx                        # +lab link
      CommandPalette.tsx             # +Labs group
      Skills.tsx                     # +"try it" chips on relevant cards
      Hero.tsx                       # +interactive hint line
  lib/
    labRegistry.ts                   # NEW — single source of truth: id, title, slug, blurb, component, related project
    useHudPrefs.ts                   # NEW — localStorage-backed HUD visibility
```

---

## Technical notes

- **Lab registry** (`labRegistry.ts`) drives `/lab`, `/lab/$slug`, the command palette entries, and the Skills "try it" chips — one place to add a new game.
- **Animations**: all new sims use Framer Motion (already a dep), pure SVG, no canvas, no extra libraries.
- **State**: each game owns its local state; only the global Simulations toggle reads from `useSimulationStore`. No new Zustand slices needed.
- **Performance**: heaviest sims (Raft, Sorting Race) gate their RAF loops behind `IntersectionObserver` so off-screen demos don't burn CPU. HUD updates throttled to 4 Hz.
- **Routing**: `/lab/$slug` does a static lookup in `labRegistry`; unknown slugs render the route's `notFoundComponent` with a link back to `/lab`.
- **SEO**: each `/lab/$slug` defines its own `head()` (title, description, og:title, og:description) so individual games are shareable.
- **Accessibility**: each game has keyboard controls (Tab to focus cells/nodes, Space to trigger), aria labels on all interactive SVG elements, and a "describe what's happening" live region for screen readers.
- **HUD** mounts once in `__root.tsx` (or stays in the index route if you prefer it portfolio-only — I'll default to root so it persists into `/lab`).

---

## Out of scope (saving for a later pass, ask if you want any moved in)

- Multiplayer / WebSocket-driven sims
- Saving game state to the backend
- A "leaderboard" for the Sorting Race
- Audio / sound effects
- A theme switcher (matrix-green / amber CRT / solarized)

---

Approve and I'll build it in one pass: registry + 5 games + `/lab` routes + HUD + nav/palette/skills wiring + per-game SEO.

