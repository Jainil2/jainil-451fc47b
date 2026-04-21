import { MapPin, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-4 pt-24 sm:px-6"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-mono text-sm text-terminal">
            <span className="text-muted-foreground">~/jainil $</span>{" "}
            <span className="caret-blink">echo &quot;hello, world.&quot;</span>
          </p>

          <h1 className="mt-6 font-mono text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Jainil <span className="text-terminal">Chauhan</span>
          </h1>

          <p className="mt-4 font-mono text-base text-cyan-accent sm:text-lg">
            Software Engineer · Distributed Systems &amp; Backend
          </p>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            I build <span className="text-foreground">low-latency, high-trust systems that scale quietly</span> —
            backend services, secure auth platforms, and cloud infrastructure that
            stay calm under load.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md bg-terminal px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:glow-terminal"
            >
              view projects →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-border bg-secondary/40 px-5 py-2.5 font-mono text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              get in touch
            </a>
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-card/60 p-5 font-mono text-sm shadow-lg backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <span className="size-3 rounded-full bg-destructive/80" />
            <span className="size-3 rounded-full bg-yellow-500/80" />
            <span className="size-3 rounded-full bg-terminal" />
            <span className="ml-2 text-xs text-muted-foreground">~/jainil/whoami</span>
          </div>

          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-terminal" />
              <span>Nadiad, India</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="relative flex size-3 items-center justify-center">
                <span className="absolute inline-flex size-3 animate-ping rounded-full bg-terminal opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-terminal" />
              </span>
              <span>
                <span className="text-foreground">available</span> for new roles
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-terminal" />
              <a
                href="mailto:jainil.chauhan@example.com"
                className="hover:text-foreground"
              >
                jainil.chauhan@example.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Linkedin className="size-4 text-terminal" />
              <a
                href="https://www.linkedin.com/in/jainil-chauhan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                linkedin.com/in/jainil-chauhan
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Github className="size-4 text-terminal" />
              <a
                href="https://github.com/jainil-chauhan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                github.com/jainil-chauhan
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}