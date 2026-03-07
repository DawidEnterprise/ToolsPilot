import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { GradeCalculatorTool } from "@/tools/grade-calculator/GradeCalculatorTool";

const tool = getToolBySlug("grade-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function GradeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <GradeCalculatorTool />
      </ToolPageLayout>
    </>
  );
}
