import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { KeywordDensityCheckerTool } from "@/tools/keyword-density-checker/KeywordDensityCheckerTool";

const tool = getToolBySlug("keyword-density-checker")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function KeywordDensityCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <KeywordDensityCheckerTool />
      </ToolPageLayout>
    </>
  );
}
