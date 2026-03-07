import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SvgToPngTool } from "@/tools/svg-to-png/SvgToPngTool";

const tool = getToolBySlug("svg-to-png")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SvgToPngPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <SvgToPngTool />
      </ToolPageLayout>
    </>
  );
}
