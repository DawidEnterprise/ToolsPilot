import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageToBase64Tool } from "@/tools/image-to-base64/ImageToBase64Tool";

const tool = getToolBySlug("image-to-base64")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ImageToBase64Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ImageToBase64Tool />
      </ToolPageLayout>
    </>
  );
}
