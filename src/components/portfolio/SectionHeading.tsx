interface Props {
  prompt: string;
  title: string;
  id: string;
}

export function SectionHeading({ prompt, title, id }: Props) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <p className="font-mono text-sm text-terminal">
        <span className="text-muted-foreground">~/jainil $</span> {prompt}
      </p>
      <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <div className="mt-3 h-px w-12 bg-terminal" />
    </div>
  );
}