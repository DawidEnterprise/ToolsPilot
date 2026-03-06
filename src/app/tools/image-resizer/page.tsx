import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageResizerTool } from "@/tools/image-resizer/ImageResizerTool";

const tool = getToolBySlug("image-resizer")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ImageResizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ImageResizerTool />
      </ToolPageLayout>
    </>
  );
}
