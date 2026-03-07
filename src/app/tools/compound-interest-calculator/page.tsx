import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CompoundInterestCalculatorTool } from "@/tools/compound-interest-calculator/CompoundInterestCalculatorTool";

const tool = getToolBySlug("compound-interest-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CompoundInterestCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CompoundInterestCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
