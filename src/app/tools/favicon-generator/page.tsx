import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { FaviconGeneratorTool } from "@/tools/favicon-generator/FaviconGeneratorTool";

const tool = getToolBySlug("favicon-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function FaviconGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <FaviconGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
