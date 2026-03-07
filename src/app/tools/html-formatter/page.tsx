import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HtmlFormatterTool } from "@/tools/html-formatter/HtmlFormatterTool";

const tool = getToolBySlug("html-formatter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HtmlFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HtmlFormatterTool />
      </ToolPageLayout>
    </>
  );
}
