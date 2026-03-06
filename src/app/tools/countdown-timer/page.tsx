import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CountdownTimerTool } from "@/tools/countdown-timer/CountdownTimerTool";

const tool = getToolBySlug("countdown-timer")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CountdownTimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CountdownTimerTool />
      </ToolPageLayout>
    </>
  );
}
