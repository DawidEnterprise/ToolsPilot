import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TextToSpeechTool } from "@/tools/text-to-speech/TextToSpeechTool";

const tool = getToolBySlug("text-to-speech")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TextToSpeechPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TextToSpeechTool />
      </ToolPageLayout>
    </>
  );
}
