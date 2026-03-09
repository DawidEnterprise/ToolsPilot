import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { WeightConverterTool } from "@/tools/weight-converter/WeightConverterTool";

const tool = getToolBySlug("weight-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function WeightConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <WeightConverterTool />
      </ToolPageLayout>
    </>
  );
}
