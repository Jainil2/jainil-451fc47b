import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  User,
  Sparkles,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Pencil,
  MessageSquare,
  Clock,
} from "lucide-react";

type Action = () => void;

function scrollTo(id: string): Action {
  return () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

function openLink(url: string, target: "_self" | "_blank" = "_blank"): Action {
  return () => {
    window.open(url, target, target === "_blank" ? "noopener,noreferrer" : undefined);
  };
}

/**
 * ⌘K command palette — jump between sections, copy email, open socials.
 * Always mounted; toggled with ⌘K / Ctrl+K or Esc.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function run(action: Action) {
    setOpen(false);
    // Defer to allow the dialog to close before scrolling.
    requestAnimationFrame(action);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 font-mono text-xs text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:border-terminal/50 hover:text-foreground md:inline-flex"
      >
        <span className="rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px]">
          ⌘K
        </span>
        <span>jump anywhere</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="type a command or section..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Sections">
            <CommandItem onSelect={() => run(scrollTo("top"))}>
              <Sparkles className="size-4" /> Hero
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("about"))}>
              <User className="size-4" /> About
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("skills"))}>
              <Sparkles className="size-4" /> Skills
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("experience"))}>
              <Briefcase className="size-4" /> Experience
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("projects"))}>
              <FolderGit2 className="size-4" /> Projects
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("now"))}>
              <Clock className="size-4" /> Now
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("education"))}>
              <GraduationCap className="size-4" /> Education
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("writing"))}>
              <Pencil className="size-4" /> Writing
            </CommandItem>
            <CommandItem onSelect={() => run(scrollTo("contact"))}>
              <MessageSquare className="size-4" /> Contact
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick actions">
            <CommandItem
              onSelect={() => run(openLink("/jainil-chauhan-resume.pdf", "_self"))}
            >
              <Download className="size-4" /> Download resume.pdf
            </CommandItem>
            <CommandItem
              onSelect={() => run(openLink("mailto:jainil.chauhan@example.com", "_self"))}
            >
              <Mail className="size-4" /> Email me
            </CommandItem>
            <CommandItem
              onSelect={() => run(openLink("https://github.com/jainil-chauhan"))}
            >
              <Github className="size-4" /> GitHub
            </CommandItem>
            <CommandItem
              onSelect={() => run(openLink("https://www.linkedin.com/in/jainil-chauhan"))}
            >
              <Linkedin className="size-4" /> LinkedIn
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
