import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { FuelCostCalculatorTool } from "@/tools/fuel-cost-calculator/FuelCostCalculatorTool";

const tool = getToolBySlug("fuel-cost-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function FuelCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <FuelCostCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
