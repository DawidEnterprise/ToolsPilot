import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TextToBinaryTool } from "@/tools/text-to-binary/TextToBinaryTool";

const tool = getToolBySlug("text-to-binary")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TextToBinaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TextToBinaryTool />
      </ToolPageLayout>
    </>
  );
}
