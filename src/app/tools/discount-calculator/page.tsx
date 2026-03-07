import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { DiscountCalculatorTool } from "@/tools/discount-calculator/DiscountCalculatorTool";

const tool = getToolBySlug("discount-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function DiscountCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <DiscountCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
