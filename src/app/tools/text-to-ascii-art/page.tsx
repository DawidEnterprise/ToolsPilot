import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TextToAsciiArtTool } from "@/tools/text-to-ascii-art/TextToAsciiArtTool";

const tool = getToolBySlug("text-to-ascii-art")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TextToAsciiArtPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TextToAsciiArtTool />
      </ToolPageLayout>
    </>
  );
}
