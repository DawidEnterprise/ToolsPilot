import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { WebpToPngTool } from "@/tools/webp-to-png/WebpToPngTool";

const tool = getToolBySlug("webp-to-png")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function WebpToPngPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <WebpToPngTool />
      </ToolPageLayout>
    </>
  );
}
