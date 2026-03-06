import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { OpenGraphPreviewTool } from "@/tools/open-graph-preview/OpenGraphPreviewTool";

const tool = getToolBySlug("open-graph-preview")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function OpenGraphPreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <OpenGraphPreviewTool />
      </ToolPageLayout>
    </>
  );
}
