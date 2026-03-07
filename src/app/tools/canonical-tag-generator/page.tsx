import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CanonicalTagGeneratorTool } from "@/tools/canonical-tag-generator/CanonicalTagGeneratorTool";

const tool = getToolBySlug("canonical-tag-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CanonicalTagGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CanonicalTagGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
