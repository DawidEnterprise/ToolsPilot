import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CssFlexboxGeneratorTool } from "@/tools/css-flexbox-generator/CssFlexboxGeneratorTool";

const tool = getToolBySlug("css-flexbox-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CssFlexboxGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CssFlexboxGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
