import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ColorPaletteGeneratorTool } from "@/tools/color-palette-generator/ColorPaletteGeneratorTool";

const tool = getToolBySlug("color-palette-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ColorPaletteGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ColorPaletteGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
