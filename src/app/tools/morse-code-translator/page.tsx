import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { MorseCodeTranslatorTool } from "@/tools/morse-code-translator/MorseCodeTranslatorTool";

const tool = getToolBySlug("morse-code-translator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function MorseCodeTranslatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <MorseCodeTranslatorTool />
      </ToolPageLayout>
    </>
  );
}
