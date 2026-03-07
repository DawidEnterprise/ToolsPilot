import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Roadmap",
  description: `See what's coming next for ${siteConfig.name} — new tools, features, and milestones on our journey to build the best free online toolbox.`,
};

const phases = [
  {
    phase: "Phase 1 — Launch",
    status: "completed" as const,
    date: "March 2026",
    items: [
      { text: "28 free browser-based tools", done: true },
      { text: "Dark mode support", done: true },
      { text: "Mobile-responsive design", done: true },
      { text: "SEO-optimized pages with FAQ schema", done: true },
      { text: "Privacy-first — no data leaves your browser", done: true },
      { text: "Custom domain (toolspilot.dev)", done: true },
      { text: "Google Search Console verified", done: true },
      { text: "Open source on GitHub", done: true },
    ],
  },
  {
    phase: "Phase 2 — Growth",
    status: "in-progress" as const,
    date: "Q1–Q2 2026",
    items: [
      { text: "Google AdSense monetization", done: false },
      { text: "Google Analytics integration", done: false },
      { text: "Microsoft Clarity heatmaps", done: false },
      { text: "Submit to 10+ tool directories", done: false },
      { text: "Reach 1,000 monthly visitors", done: false },
      { text: "Get indexed on Google for all 28 tools", done: false },
    ],
  },
  {
    phase: "Phase 3 — Expand",
    status: "planned" as const,
    date: "Q2–Q3 2026",
    items: [
      { text: "Add 20+ new tools (50 total)", done: false },
      { text: "QR code generator", done: false },
      { text: "Image compressor (WASM-based)", done: false },
      { text: "PDF tools (merge, split, compress)", done: false },
      { text: "Cron expression parser", done: false },
      { text: "SQL formatter", done: false },
      { text: "Reach 10,000 monthly visitors", done: false },
      { text: "Blog with tutorials and how-to guides", done: false },
    ],
  },
  {
    phase: "Phase 4 — Scale",
    status: "planned" as const,
    date: "Q3–Q4 2026",
    items: [
      { text: "75+ tools across all categories", done: false },
      { text: "API access for developers", done: false },
      { text: "Browser extension for quick access", done: false },
      { text: "PWA (installable app)", done: false },
      { text: "Reach 50,000 monthly visitors", done: false },
      { text: "Community feature requests", done: false },
    ],
  },
  {
    phase: "Phase 5 — Dominate",
    status: "planned" as const,
    date: "2027",
    items: [
      { text: "100+ tools", done: false },
      { text: "Premium tier with advanced features", done: false },
      { text: "Multi-language support", done: false },
      { text: "Reach 100,000+ monthly visitors", done: false },
      { text: "Sustainable passive income", done: false },
    ],
  },
];

const statusStyles = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  planned: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          Roadmap
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Our plan to build the best free online toolbox. Follow along as we grow from 28 tools to 100+.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        {phases.map((phase, idx) => (
          <div key={phase.phase}>
            <div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {phase.phase}
              </h2>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-medium ${statusStyles[phase.status]}`}
              >
                {statusLabels[phase.status]}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {phase.date}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {phase.items.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  {item.done ? (
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  )}
                  <span
                    className={
                      item.done
                        ? "text-gray-500 line-through dark:text-gray-400"
                        : "text-gray-700 dark:text-gray-300"
                    }
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {idx === 1 && <AdSlot position="in-content" className="mt-6" />}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
          Have a tool request?
        </h2>
        <p className="mt-2 text-blue-800 dark:text-blue-400">
          We&apos;re always looking for ideas. Open an issue on our{" "}
          <a
            href="https://github.com/DawidEnterprise/ToolsPilot/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:no-underline"
          >
            GitHub repository
          </a>{" "}
          and we&apos;ll consider adding it to the roadmap.
        </p>
      </div>

      <AdSlot position="tool-bottom" className="mt-8" />
    </div>
  );
}
