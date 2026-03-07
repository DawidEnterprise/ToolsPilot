import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PngToWebpTool } from "@/tools/png-to-webp/PngToWebpTool";

const tool = getToolBySlug("png-to-webp")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PngToWebpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PngToWebpTool />
      </ToolPageLayout>
    </>
  );
}
