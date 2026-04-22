import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#writing", label: "writing" },
  { href: "#contact", label: "contact" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-lg font-bold text-foreground">
          <span className="text-terminal">JC</span>
          <span className="text-muted-foreground">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                className={`relative rounded-md px-3 py-2 font-mono text-sm transition-colors hover:bg-secondary hover:text-foreground ${
                  active === l.href.slice(1)
                    ? "text-terminal"
                    : "text-muted-foreground"
                }`}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-px bg-terminal"
                  />
                )}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/jainil-chauhan-resume.pdf"
              download
              className="ml-2 inline-flex items-center gap-2 rounded-md border border-terminal/40 bg-terminal/10 px-3 py-2 font-mono text-sm text-terminal transition-all hover:bg-terminal/20 hover:glow-terminal"
            >
              <Download className="size-3.5" />
              resume
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground hover:bg-secondary md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 font-mono text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/jainil-chauhan-resume.pdf"
                download
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-md border border-terminal/40 bg-terminal/10 px-3 py-2 font-mono text-sm text-terminal"
              >
                <Download className="size-3.5" />
                download resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}