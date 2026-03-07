import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { UnicodeLookupTool } from "@/tools/unicode-lookup/UnicodeLookupTool";

const tool = getToolBySlug("unicode-lookup")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function UnicodeLookupPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <UnicodeLookupTool />
      </ToolPageLayout>
    </>
  );
}
