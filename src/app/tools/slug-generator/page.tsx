import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SlugGeneratorTool } from "@/tools/slug-generator/SlugGeneratorTool";

const tool = getToolBySlug("slug-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SlugGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <SlugGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
