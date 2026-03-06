import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JpgToPngTool } from "@/tools/jpg-to-png/JpgToPngTool";

const tool = getToolBySlug("jpg-to-png")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JpgToPngPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JpgToPngTool />
      </ToolPageLayout>
    </>
  );
}
