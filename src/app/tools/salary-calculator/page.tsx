import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SalaryCalculatorTool } from "@/tools/salary-calculator/SalaryCalculatorTool";

const tool = getToolBySlug("salary-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SalaryCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <SalaryCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
