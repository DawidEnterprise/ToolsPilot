import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TextToHexTool } from "@/tools/text-to-hex/TextToHexTool";

const tool = getToolBySlug("text-to-hex")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TextToHexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TextToHexTool />
      </ToolPageLayout>
    </>
  );
}
