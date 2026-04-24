import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { PortfolioHUD } from "@/components/portfolio/PortfolioHUD";
import { TerminalShell } from "@/components/portfolio/TerminalShell";
import { ChaosOverlay } from "@/components/portfolio/ChaosOverlay";
import { useWebVitals } from "@/lib/useWebVitals";
import { useBuildStatus } from "@/lib/useBuildStatus";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-mono">
      <div className="max-w-md text-center">
        <p className="text-terminal text-sm">~/jainil $ cd /unknown</p>
        <h1 className="mt-4 text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">route not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-terminal px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            cd ~/
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Jainil Chauhan" },
      {
        name: "description",
        content:
          "Jainil Chauhan — Software Engineer building low-latency, high-trust distributed systems. Backend, OAuth/OIDC, AWS, and cloud cost optimization.",
      },
      { name: "author", content: "Jainil Chauhan" },
      { property: "og:title", content: "Jainil Chauhan" },
      {
        property: "og:description",
        content:
          "Backend & distributed systems engineer. Building low-latency, high-trust systems that scale quietly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Jainil Chauhan" },
      {
        name: "twitter:description",
        content:
          "Backend & distributed systems engineer. Building low-latency, high-trust systems that scale quietly.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useWebVitals();
  useBuildStatus();
  return (
    <>
      <Outlet />
      <PortfolioHUD />
      <TerminalShell />
      <ChaosOverlay />
    </>
  );
}
