import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TipCalculatorTool } from "@/tools/tip-calculator/TipCalculatorTool";

const tool = getToolBySlug("tip-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TipCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TipCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
