import Link from "next/link";
import type { ToolDefinition } from "@/lib/types";

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  if (tool.comingSoon) return null;

  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card group block">
      <div className="flex items-start gap-3">
        <span className="text-lg mt-0.5">
          {tool.icon === "image" && "🖼️"}
          {tool.icon === "code" && "🛠️"}
          {tool.icon === "type" && "📝"}
          {tool.icon === "file" && "📁"}
          {tool.icon === "misc" && "🔑"}
          {!["image", "code", "type", "file", "misc"].includes(tool.icon) && "🧰"}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors dark:text-gray-100 dark:group-hover:text-brand-400">
            {tool.name}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">{tool.description}</p>
        </div>
      </div>
    </Link>
  );
}
