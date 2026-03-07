import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageCropperTool } from "@/tools/image-cropper/ImageCropperTool";

const tool = getToolBySlug("image-cropper")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ImageCropperPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ImageCropperTool />
      </ToolPageLayout>
    </>
  );
}
