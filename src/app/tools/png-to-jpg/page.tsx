import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PngToJpgTool } from "@/tools/png-to-jpg/PngToJpgTool";

const tool = getToolBySlug("png-to-jpg")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PngToJpgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PngToJpgTool />
      </ToolPageLayout>
    </>
  );
}
