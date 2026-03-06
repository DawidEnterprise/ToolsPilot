import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { BinaryTranslatorTool } from "@/tools/binary-translator/BinaryTranslatorTool";

const tool = getToolBySlug("binary-translator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function BinaryTranslatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <BinaryTranslatorTool />
      </ToolPageLayout>
    </>
  );
}
