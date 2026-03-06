import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PomodoroTimerTool } from "@/tools/pomodoro-timer/PomodoroTimerTool";

const tool = getToolBySlug("pomodoro-timer")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PomodoroTimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PomodoroTimerTool />
      </ToolPageLayout>
    </>
  );
}
