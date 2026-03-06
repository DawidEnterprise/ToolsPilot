import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HashGeneratorTool } from "@/tools/hash-generator/HashGeneratorTool";

const tool = getToolBySlug("hash-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HashGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HashGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
