import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { DataSizeConverterTool } from "@/tools/data-size-converter/DataSizeConverterTool";

const tool = getToolBySlug("data-size-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function DataSizeConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <DataSizeConverterTool />
      </ToolPageLayout>
    </>
  );
}
