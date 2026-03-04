import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { createElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LazyMotion, domAnimation } from "framer-motion";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";

/**
 * Pre-render function used by vite-prerender-plugin at build time.
 * Generates static HTML for key routes so AI/search crawlers
 * receive fully-rendered content from SPAs.
 */
export async function prerender() {
  const routes = [
    "/",
    "/student-stories",
    "/terms",
    "/privacy-policy",
  ];

  const pages = routes.map((url) => {
    const queryClient = new QueryClient();

    const App = createElement(
      QueryClientProvider,
      { client: queryClient },
      createElement(
        LazyMotion,
        { features: domAnimation },
        createElement(
          TooltipProvider,
          null,
          createElement(
            StaticRouter,
            { location: url },
            createElement(
              Routes,
              null,
              createElement(Route, { path: "/", element: createElement(Index) }),
              // Other routes will fall back to the shell HTML
            )
          )
        )
      )
    );

    let html: string;
    try {
      html = renderToString(App);
    } catch {
      // If SSR fails for a route, return empty — the SPA shell handles it
      html = "";
    }

    return { url, html };
  });

  return pages;
}
