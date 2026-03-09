import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TemperatureConverterTool } from "@/tools/temperature-converter/TemperatureConverterTool";

const tool = getToolBySlug("temperature-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TemperatureConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TemperatureConverterTool />
      </ToolPageLayout>
    </>
  );
}
