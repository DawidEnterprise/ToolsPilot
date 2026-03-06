import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { RemoveLineBreaksTool } from "@/tools/remove-line-breaks/RemoveLineBreaksTool";

const tool = getToolBySlug("remove-line-breaks")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function RemoveLineBreaksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <RemoveLineBreaksTool />
      </ToolPageLayout>
    </>
  );
}
