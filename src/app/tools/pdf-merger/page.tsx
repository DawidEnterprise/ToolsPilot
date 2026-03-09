import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PdfMergerTool } from "@/tools/pdf-merger/PdfMergerTool";

const tool = getToolBySlug("pdf-merger")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PdfMergerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PdfMergerTool />
      </ToolPageLayout>
    </>
  );
}
