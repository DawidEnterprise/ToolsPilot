import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CharacterCounterTool } from "@/tools/character-counter/CharacterCounterTool";

const tool = getToolBySlug("character-counter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CharacterCounterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CharacterCounterTool />
      </ToolPageLayout>
    </>
  );
}
