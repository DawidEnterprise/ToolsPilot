import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { AspectRatioCalculatorTool } from "@/tools/aspect-ratio-calculator/AspectRatioCalculatorTool";

const tool = getToolBySlug("aspect-ratio-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function AspectRatioCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <AspectRatioCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
