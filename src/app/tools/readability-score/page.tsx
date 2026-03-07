import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ReadabilityScoreTool } from "@/tools/readability-score/ReadabilityScoreTool";

const tool = getToolBySlug("readability-score")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ReadabilityScorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ReadabilityScoreTool />
      </ToolPageLayout>
    </>
  );
}
