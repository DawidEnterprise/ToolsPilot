import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ElectricityCostCalculatorTool } from "@/tools/electricity-cost-calculator/ElectricityCostCalculatorTool";

const tool = getToolBySlug("electricity-cost-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ElectricityCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ElectricityCostCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
