import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { GpaCalculatorTool } from "@/tools/gpa-calculator/GpaCalculatorTool";

const tool = getToolBySlug("gpa-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function GpaCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <GpaCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
