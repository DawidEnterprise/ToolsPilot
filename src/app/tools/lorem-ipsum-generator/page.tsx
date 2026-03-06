import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { LoremIpsumTool } from "@/tools/lorem-ipsum-generator/LoremIpsumTool";

const tool = getToolBySlug("lorem-ipsum-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function LoremIpsumGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <LoremIpsumTool />
      </ToolPageLayout>
    </>
  );
}
