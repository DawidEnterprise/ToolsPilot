import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { RegexGeneratorTool } from "@/tools/regex-generator/RegexGeneratorTool";

const tool = getToolBySlug("regex-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function RegexGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <RegexGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
