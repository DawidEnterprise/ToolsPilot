import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { MortgageCalculatorTool } from "@/tools/mortgage-calculator/MortgageCalculatorTool";

const tool = getToolBySlug("mortgage-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function MortgageCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <MortgageCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
