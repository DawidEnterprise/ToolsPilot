import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CsvToTableTool } from "@/tools/csv-to-table/CsvToTableTool";

const tool = getToolBySlug("csv-to-table")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CsvToTablePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CsvToTableTool />
      </ToolPageLayout>
    </>
  );
}
