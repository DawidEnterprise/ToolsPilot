import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { BmiCalculatorTool } from "@/tools/bmi-calculator/BmiCalculatorTool";

const tool = getToolBySlug("bmi-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function BmiCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <BmiCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
