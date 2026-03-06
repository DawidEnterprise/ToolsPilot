import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { WordCounterTool } from "@/tools/word-counter/WordCounterTool";

const tool = getToolBySlug("word-counter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function WordCounterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <WordCounterTool />
      </ToolPageLayout>
    </>
  );
}
