import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { MarkdownToHtmlTool } from "@/tools/markdown-to-html/MarkdownToHtmlTool";

const tool = getToolBySlug("markdown-to-html")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function MarkdownToHtmlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <MarkdownToHtmlTool />
      </ToolPageLayout>
    </>
  );
}
