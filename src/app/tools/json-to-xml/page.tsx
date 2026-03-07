import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonToXmlTool } from "@/tools/json-to-xml/JsonToXmlTool";

const tool = getToolBySlug("json-to-xml")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonToXmlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonToXmlTool />
      </ToolPageLayout>
    </>
  );
}
