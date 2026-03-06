import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { UuidGeneratorTool } from "@/tools/uuid-generator/UuidGeneratorTool";

const tool = getToolBySlug("uuid-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function UuidGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <UuidGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
