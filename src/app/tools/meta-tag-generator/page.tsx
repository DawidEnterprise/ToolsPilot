import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { MetaTagGeneratorTool } from "@/tools/meta-tag-generator/MetaTagGeneratorTool";

const tool = getToolBySlug("meta-tag-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function MetaTagGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <MetaTagGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
