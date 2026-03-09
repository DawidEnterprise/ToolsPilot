import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ContrastCheckerTool } from "@/tools/contrast-checker/ContrastCheckerTool";

const tool = getToolBySlug("contrast-checker")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ContrastCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <ContrastCheckerTool />
      </ToolPageLayout>
    </>
  );
}
