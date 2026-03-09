import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JpgToWebpTool } from "@/tools/jpg-to-webp/JpgToWebpTool";

const tool = getToolBySlug("jpg-to-webp")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JpgToWebpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JpgToWebpTool />
      </ToolPageLayout>
    </>
  );
}
