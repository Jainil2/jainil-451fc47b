import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Writing } from "@/components/portfolio/Writing";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { CommandPalette } from "@/components/portfolio/CommandPalette";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Jainil Chauhan — Software Engineer · Distributed Systems & Backend" },
      {
        name: "description",
        content:
          "Portfolio of Jainil Chauhan — Software Engineer specialising in backend, distributed systems, OAuth/OIDC, AWS, and cloud cost optimization.",
      },
      {
        property: "og:title",
        content: "Jainil Chauhan — Software Engineer",
      },
      {
        property: "og:description",
        content:
          "Building low-latency, high-trust systems that scale quietly. Backend · auth · cloud.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <CommandPalette />
      <main>
        <Hero />
        <SectionDivider label="about.md" />
        <About />
        <SectionDivider label="skills/" />
        <Skills />
        <SectionDivider label="git log" />
        <Experience />
        <SectionDivider label="projects/" />
        <Projects />
        <SectionDivider label="education.json" />
        <Education />
        <SectionDivider label="writing/" />
        <Writing />
        <SectionDivider label="contact --start" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
