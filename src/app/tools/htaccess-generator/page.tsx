import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HtaccessGeneratorTool } from "@/tools/htaccess-generator/HtaccessGeneratorTool";

const tool = getToolBySlug("htaccess-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HtaccessGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HtaccessGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
