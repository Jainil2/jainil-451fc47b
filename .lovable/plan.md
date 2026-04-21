
# Jainil Chauhan — Personal Portfolio

A single-page, dark "developer terminal" themed portfolio built from your resume. Smooth-scroll navigation, recruiter-friendly content, and ready for sharing.

## Visual Direction

- **Theme:** Deep near-black background (`#0A0F0A`) with subtle terminal-green accents (`#39FF7A`-ish via OKLCH), soft cyan secondary accents, and warm off-white text.
- **Typography:** JetBrains Mono for headings, code snippets, and accents; Inter for body copy — gives the engineer-coded feel without sacrificing readability.
- **Motifs:** Faint terminal prompt (`~/jainil $`) markers before section titles, blinking caret on the hero, monospace tags for tech stack, subtle scanline/grid background, hover-glow on cards.
- **Layout:** Centered max-width container, generous spacing, sticky translucent top nav with anchor links, mobile-first responsive.

## Page Sections (single page, smooth-scroll anchors)

### 1. Sticky Top Nav
Logo `JC.` on the left, anchor links on the right: About · Skills · Experience · Projects · Writing · Contact, plus a "Resume" download button. Collapses to a hamburger on mobile.

### 2. Hero
- Terminal-style intro: `> hello, world.`
- **Name:** Jainil Chauhan
- **Title:** Software Engineer — Distributed Systems & Backend
- **Tagline:** *"Building low-latency, high-trust systems that scale quietly."*
- Short value-prop sentence emphasizing backend, auth, cloud cost optimization.
- Two CTAs: "View Projects" (scrolls) and "Get in touch" (scrolls).
- Side meta: location (Nadiad, India), availability status dot, quick links (LinkedIn, GitHub, Email).

### 3. About Me
2–3 short paragraphs rewritten from the resume summary — focused on what he cares about (scalable systems, performance, secure auth), how he approaches problems, and what he's looking for next. Adds the personality the resume lacks.

### 4. Skills (categorized grid)
Four columns of monospace chips:
- **Languages** — Python, JavaScript, TypeScript, SQL
- **Backend & APIs** — Node.js, FastAPI, Express, GraphQL, REST
- **Frontend** — React, Next.js
- **Data** — MongoDB, PostgreSQL, Redis, DynamoDB
- **Cloud & DevOps** — AWS (EC2, Lambda, S3, CloudWatch), Docker, CI/CD, Kubernetes
- **Security** — OAuth 2.0, OIDC, JWT, Ory Hydra, Zero-Trust
- **Concepts** — Distributed Systems, Microservices, System Design, DSA

### 5. Experience
Single timeline card for **Tech Holding — Software Engineer (Jan 2025 – Present, Ahmedabad)** with rewritten, impact-led bullets:
- Cut GraphQL API latency 40% via query and data-fetching optimization.
- Shipped enterprise OAuth 2.0 / OIDC platform on Ory Hydra serving 50K+ users with SSO and 99.9% uptime.
- Load-tested auth flows at 3,600+ RPS with k6, eliminating bottlenecks.
- Built a cloud cost optimization platform with anomaly detection, rightsizing, and security posture monitoring.

### 6. Projects (2 feature cards)
Each card: title, one-line summary, outcome metrics, tech tag row, links placeholder.
- **Distributed NGO Volunteer Management Platform** — 10K+ concurrent users, sub-200ms responses, 85% test coverage. Stack: React, Node, MongoDB, Redis, S3, Docker.
- **Healthcare Records Management System** — 60% infra cost reduction via serverless, 98+ Lighthouse, 100% accessibility. Stack: TypeScript, Next.js, PostgreSQL, JWT, Lambda, Docker.

### 7. Education
Card: B.Tech in Computer Engineering, Dharmsinh Desai University (2021–2025), GPA 8.2/10, relevant coursework chips.

### 8. Achievements & Certifications
Two-column list with icons:
- LeetCode 600+ solved (Top 7%)
- CodeChef 3-Star (1600+)
- AWS Certified Cloud Practitioner (in progress)
- Deep Learning Specialization — Coursera
- System Design Fundamentals

### 9. Writing (placeholder)
"Notes from the terminal" — a 3-card grid of `coming soon` placeholders styled like a blog index, ready to be filled with technical articles later.

### 10. Contact
- Headline: *"Have a problem worth solving? Let's talk."*
- Working contact form (name, email, message) with zod validation, length limits, and friendly toast feedback. Submissions go to a server route that logs/echoes back (no DB) — easy to wire to email later.
- Direct links: email, LinkedIn, GitHub.
- "Download Resume" button (PDF copied into the project).

### 11. Footer
Mono-styled: `© 2026 Jainil Chauhan — built with care.` plus social icons.

## Content & Copywriting

All resume bullets will be rewritten into confident, recruiter-facing prose — leading with outcomes and metrics, dropping jargon-for-jargon's-sake, and adding a real personal summary and tagline. Tone: precise, calm, technical, no fluff.

## Suggested Resume Improvements (called out in chat, not on the site)

- Add a one-line personal positioning above the summary.
- Quantify the cloud cost optimization platform impact (% saved, $ saved, or # resources monitored).
- Mention team size / collaboration on the Tech Holding role.
- Add live links / GitHub repos for both projects so reviewers can verify.

## Tech Notes

- Single route (`/`) with section components and smooth-scroll anchor navigation.
- Resume PDF copied to `public/` for direct download.
- Contact form posts to a TanStack server route with zod validation; safe to extend with email later.
- Per-page SEO meta (title, description, og tags) tuned for "Jainil Chauhan — Software Engineer".
- Fully responsive, accessible (semantic landmarks, focus rings, sufficient contrast on the dark theme).
