import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HexToRgbTool } from "@/tools/hex-to-rgb/HexToRgbTool";

const tool = getToolBySlug("hex-to-rgb")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HexToRgbPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HexToRgbTool />
      </ToolPageLayout>
    </>
  );
}
