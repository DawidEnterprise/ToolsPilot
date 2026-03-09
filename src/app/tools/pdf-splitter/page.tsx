import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PdfSplitterTool } from "@/tools/pdf-splitter/PdfSplitterTool";

const tool = getToolBySlug("pdf-splitter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PdfSplitterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PdfSplitterTool />
      </ToolPageLayout>
    </>
  );
}
