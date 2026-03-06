import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HtmlEncoderTool } from "@/tools/html-encoder/HtmlEncoderTool";

const tool = getToolBySlug("html-encoder")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HtmlEncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HtmlEncoderTool />
      </ToolPageLayout>
    </>
  );
}
