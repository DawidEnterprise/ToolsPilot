import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ChmodCalculatorTool } from "@/tools/chmod-calculator/ChmodCalculatorTool";

const tool = getToolBySlug("chmod-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ChmodCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ChmodCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
