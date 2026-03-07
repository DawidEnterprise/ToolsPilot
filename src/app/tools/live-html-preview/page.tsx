import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { LiveHtmlPreviewTool } from "@/tools/live-html-preview/LiveHtmlPreviewTool";

const tool = getToolBySlug("live-html-preview")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function LiveHtmlPreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <LiveHtmlPreviewTool />
      </ToolPageLayout>
    </>
  );
}
