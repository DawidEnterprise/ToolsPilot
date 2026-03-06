import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PercentageCalculatorTool } from "@/tools/percentage-calculator/PercentageCalculatorTool";

const tool = getToolBySlug("percentage-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PercentageCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PercentageCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
