interface Props {
  label?: string;
}

/** ASCII-style divider between sections — adds personality to the terminal vibe. */
export function SectionDivider({ label = "end of file" }: Props) {
  return (
    <div
      aria-hidden
      className="mx-auto max-w-6xl px-4 sm:px-6"
    >
      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground/60">
        <span className="h-px flex-1 bg-border" />
        <span className="whitespace-nowrap">{`// ─── ${label} ───`}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
