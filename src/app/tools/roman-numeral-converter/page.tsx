import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { RomanNumeralConverterTool } from "@/tools/roman-numeral-converter/RomanNumeralConverterTool";

const tool = getToolBySlug("roman-numeral-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function RomanNumeralConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <RomanNumeralConverterTool />
      </ToolPageLayout>
    </>
  );
}
