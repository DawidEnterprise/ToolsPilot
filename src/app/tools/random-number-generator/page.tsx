import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { RandomNumberGeneratorTool } from "@/tools/random-number-generator/RandomNumberGeneratorTool";

const tool = getToolBySlug("random-number-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function RandomNumberGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <RandomNumberGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
