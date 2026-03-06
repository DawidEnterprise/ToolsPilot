import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PxToRemConverterTool } from "@/tools/px-to-rem-converter/PxToRemConverterTool";

const tool = getToolBySlug("px-to-rem-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PxToRemConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PxToRemConverterTool />
      </ToolPageLayout>
    </>
  );
}
