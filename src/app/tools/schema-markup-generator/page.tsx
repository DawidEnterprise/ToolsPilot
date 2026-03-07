import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SchemaMarkupGeneratorTool } from "@/tools/schema-markup-generator/SchemaMarkupGeneratorTool";

const tool = getToolBySlug("schema-markup-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SchemaMarkupGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <SchemaMarkupGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
