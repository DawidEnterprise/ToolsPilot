import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { WebpToJpgTool } from "@/tools/webp-to-jpg/WebpToJpgTool";

const tool = getToolBySlug("webp-to-jpg")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function WebpToJpgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <WebpToJpgTool />
      </ToolPageLayout>
    </>
  );
}
