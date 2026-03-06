import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TextRepeaterTool } from "@/tools/text-repeater/TextRepeaterTool";

const tool = getToolBySlug("text-repeater")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TextRepeaterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TextRepeaterTool />
      </ToolPageLayout>
    </>
  );
}
