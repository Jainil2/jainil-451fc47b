import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 Jainil Chauhan — built with care.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="mailto:jainil.chauhan@example.com"
            aria-label="Email"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-terminal"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/jainil-chauhan"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-terminal"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="https://github.com/jainil-chauhan"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-terminal"
          >
            <Github className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}