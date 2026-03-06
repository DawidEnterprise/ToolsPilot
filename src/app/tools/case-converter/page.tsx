import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CaseConverterTool } from "@/tools/case-converter/CaseConverterTool";

const tool = getToolBySlug("case-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CaseConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CaseConverterTool />
      </ToolPageLayout>
    </>
  );
}
