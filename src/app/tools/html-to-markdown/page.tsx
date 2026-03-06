import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HtmlToMarkdownTool } from "@/tools/html-to-markdown/HtmlToMarkdownTool";

const tool = getToolBySlug("html-to-markdown")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HtmlToMarkdownPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HtmlToMarkdownTool />
      </ToolPageLayout>
    </>
  );
}
