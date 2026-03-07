import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { InvisibleCharacterDetectorTool } from "@/tools/invisible-character-detector/InvisibleCharacterDetectorTool";

const tool = getToolBySlug("invisible-character-detector")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function InvisibleCharacterDetectorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <InvisibleCharacterDetectorTool />
      </ToolPageLayout>
    </>
  );
}
