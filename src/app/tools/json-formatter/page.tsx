import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonFormatterTool } from "@/tools/json-formatter/JsonFormatterTool";

const tool = getToolBySlug("json-formatter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonFormatterTool />
      </ToolPageLayout>
    </>
  );
}
