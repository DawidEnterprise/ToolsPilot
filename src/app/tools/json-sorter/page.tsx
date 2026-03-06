import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonSorterTool } from "@/tools/json-sorter/JsonSorterTool";

const tool = getToolBySlug("json-sorter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonSorterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonSorterTool />
      </ToolPageLayout>
    </>
  );
}
