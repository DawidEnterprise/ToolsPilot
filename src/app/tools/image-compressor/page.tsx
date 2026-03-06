import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageCompressorTool } from "@/tools/image-compressor/ImageCompressorTool";

const tool = getToolBySlug("image-compressor")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ImageCompressorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ImageCompressorTool />
      </ToolPageLayout>
    </>
  );
}
