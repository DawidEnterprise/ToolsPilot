import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CalorieCalculatorTool } from "@/tools/calorie-calculator/CalorieCalculatorTool";

const tool = getToolBySlug("calorie-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CalorieCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CalorieCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
