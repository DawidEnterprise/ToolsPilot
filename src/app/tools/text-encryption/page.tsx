import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TextEncryptionTool } from "@/tools/text-encryption/TextEncryptionTool";

const tool = getToolBySlug("text-encryption")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TextEncryptionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TextEncryptionTool />
      </ToolPageLayout>
    </>
  );
}
