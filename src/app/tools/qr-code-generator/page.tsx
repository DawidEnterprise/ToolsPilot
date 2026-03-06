import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { QrCodeGeneratorTool } from "@/tools/qr-code-generator/QrCodeGeneratorTool";

const tool = getToolBySlug("qr-code-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function QrCodeGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <QrCodeGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
