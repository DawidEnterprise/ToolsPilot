import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { XmlFormatterTool } from "@/tools/xml-formatter/XmlFormatterTool";

const tool = getToolBySlug("xml-formatter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function XmlFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <XmlFormatterTool />
      </ToolPageLayout>
    </>
  );
}
