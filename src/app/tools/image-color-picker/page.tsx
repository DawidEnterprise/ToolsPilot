import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageColorPickerTool } from "@/tools/image-color-picker/ImageColorPickerTool";

const tool = getToolBySlug("image-color-picker")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ImageColorPickerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ImageColorPickerTool />
      </ToolPageLayout>
    </>
  );
}
