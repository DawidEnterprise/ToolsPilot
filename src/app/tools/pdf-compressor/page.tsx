import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PdfCompressorTool } from "@/tools/pdf-compressor/PdfCompressorTool";

const tool = getToolBySlug("pdf-compressor")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PdfCompressorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PdfCompressorTool />
      </ToolPageLayout>
    </>
  );
}
