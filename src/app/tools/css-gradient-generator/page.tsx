import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CssGradientGeneratorTool } from "@/tools/css-gradient-generator/CssGradientGeneratorTool";

const tool = getToolBySlug("css-gradient-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CssGradientGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CssGradientGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
