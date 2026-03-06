import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CsvJsonTool } from "@/tools/csv-json-converter/CsvJsonTool";

const tool = getToolBySlug("csv-json-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CsvJsonConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CsvJsonTool />
      </ToolPageLayout>
    </>
  );
}
