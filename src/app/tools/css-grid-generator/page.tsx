import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CssGridGeneratorTool } from "@/tools/css-grid-generator/CssGridGeneratorTool";

const tool = getToolBySlug("css-grid-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CssGridGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CssGridGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
