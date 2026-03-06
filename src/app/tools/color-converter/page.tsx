import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ColorConverterTool } from "@/tools/color-converter/ColorConverterTool";

const tool = getToolBySlug("color-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ColorConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ColorConverterTool />
      </ToolPageLayout>
    </>
  );
}
