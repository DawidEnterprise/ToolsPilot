import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { RgbToHexTool } from "@/tools/rgb-to-hex/RgbToHexTool";

const tool = getToolBySlug("rgb-to-hex")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function RgbToHexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <RgbToHexTool />
      </ToolPageLayout>
    </>
  );
}
