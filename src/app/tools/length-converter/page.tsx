import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { LengthConverterTool } from "@/tools/length-converter/LengthConverterTool";

const tool = getToolBySlug("length-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function LengthConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <LengthConverterTool />
      </ToolPageLayout>
    </>
  );
}
