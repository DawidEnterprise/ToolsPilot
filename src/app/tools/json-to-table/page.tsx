import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonToTableTool } from "@/tools/json-to-table/JsonToTableTool";

const tool = getToolBySlug("json-to-table")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonToTablePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonToTableTool />
      </ToolPageLayout>
    </>
  );
}
