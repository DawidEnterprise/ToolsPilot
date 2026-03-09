import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HeicToJpgTool } from "@/tools/heic-to-jpg/HeicToJpgTool";

const tool = getToolBySlug("heic-to-jpg")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HeicToJpgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HeicToJpgTool />
      </ToolPageLayout>
    </>
  );
}
