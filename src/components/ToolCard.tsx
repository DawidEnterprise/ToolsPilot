import Link from "next/link";
import type { ToolDefinition } from "@/lib/types";

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card group block">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 text-lg group-hover:bg-brand-100 transition-colors dark:bg-brand-950 dark:text-brand-400 dark:group-hover:bg-brand-900">
          {tool.icon === "image" && "🖼️"}
          {tool.icon === "code" && "🛠️"}
          {tool.icon === "type" && "📝"}
          {tool.icon === "file" && "📁"}
          {tool.icon === "misc" && "🔑"}
          {!["image", "code", "type", "file", "misc"].includes(tool.icon) && "🧰"}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors dark:text-gray-100 dark:group-hover:text-brand-400">
            {tool.name}
            {tool.comingSoon && (
              <span className="ml-2 inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/30">
                Soon
              </span>
            )}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">{tool.description}</p>
        </div>
      </div>
    </Link>
  );
}
