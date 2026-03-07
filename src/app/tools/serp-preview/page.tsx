import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SerpPreviewTool } from "@/tools/serp-preview/SerpPreviewTool";

const tool = getToolBySlug("serp-preview")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SerpPreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <SerpPreviewTool />
      </ToolPageLayout>
    </>
  );
}
