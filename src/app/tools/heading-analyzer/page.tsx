import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HeadingAnalyzerTool } from "@/tools/heading-analyzer/HeadingAnalyzerTool";

const tool = getToolBySlug("heading-analyzer")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HeadingAnalyzerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HeadingAnalyzerTool />
      </ToolPageLayout>
    </>
  );
}
