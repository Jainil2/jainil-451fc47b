
# Portfolio Enhancement Ideas

Here are concrete improvements we can make to elevate the portfolio. Pick any combination and I'll implement.

## 1. Hero impact
- **Animated terminal boot sequence**: Type out `> whoami`, `> role`, `> stack` lines on load (typewriter effect) instead of a single static line.
- **Live "uptime" counter**: Small mono badge showing days since Jan 2025 (current role) — reinforces the engineer aesthetic.
- **Subtle parallax / mouse-tracked glow** on the terminal card.

## 2. Section polish
- **Scroll-spy nav**: Active section highlights in the top nav as you scroll.
- **Framer Motion reveal**: Fade/slide-in for sections and cards as they enter the viewport.
- **Animated metric counters**: Numbers in Experience/Projects (40%, 50K+, 3,600 RPS) count up when scrolled into view.
- **Section dividers**: Faint ASCII separators (`// ─── end of file ───`) between sections for personality.

## 3. Projects deep-dive
- **Expandable project cards**: Click a card to open a modal/drawer with problem → approach → outcome → architecture diagram.
- **Live GitHub stats**: Pull stars/last-commit via GitHub API for each repo (server function, cached).
- **Architecture mini-diagrams**: Small SVG system diagrams per project (client → API → cache → DB).

## 4. New sections
- **Now / Currently**: A short "what I'm working on / reading / learning" block — humanizes the page.
- **Tech stack visualization**: Replace chip grid with a weighted bubble/heatmap showing proficiency.
- **Testimonials placeholder**: Quote cards from managers/peers (ready to fill later).
- **Open-source contributions**: Auto-pulled from GitHub.

## 5. Writing section upgrade
- Wire it to **MDX-based posts** in `src/content/posts/` so you can drop in real articles later. Each post gets its own route, SEO meta, and reading-time estimate.

## 6. Contact + trust
- **Honeypot + simple time-trap** anti-spam on the contact form (no external service needed).
- **Calendly/Cal.com embed** option for a "book a 20-min chat" CTA.
- **Email integration**: Wire the server function to Resend so messages actually reach your inbox (requires Resend API key).

## 7. SEO & sharing
- **Custom OG image**: Generate a branded `og-image.png` (terminal frame + name + tagline) for link previews on LinkedIn/Twitter.
- **JSON-LD `Person` schema**: Structured data for richer Google results.
- **`sitemap.xml` + `robots.txt`** in `public/`.

## 8. Performance & a11y
- **Prefers-reduced-motion** respect for all animations.
- **Keyboard shortcut palette** (`⌘K`) to jump between sections — fits the terminal theme perfectly.
- **Lighthouse pass**: Audit and fix any contrast/landmark/focus issues.

## 9. Theming extras
- **Light-mode toggle** (warm paper variant) — optional, but recruiters sometimes prefer it.
- **Theme switcher**: Multiple terminal palettes (matrix green, amber CRT, solarized).

## 10. Analytics & feedback
- Add **Plausible/Umami-style privacy-friendly analytics** to see which sections recruiters spend time on.

---

**My top 5 recommendations** for biggest impact with least scope creep:
1. Scroll-spy nav + Framer Motion reveals (instantly feels premium)
2. Animated metric counters in Experience/Projects
3. Custom OG image + JSON-LD Person schema (better link previews & SEO)
4. ⌘K command palette (on-brand, delightful)
5. Wire contact form to Resend so messages actually arrive

Tell me which ones you want and I'll build them in the next pass.
