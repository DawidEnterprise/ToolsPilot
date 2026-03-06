import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { LineSorterTool } from "@/tools/line-sorter/LineSorterTool";

const tool = getToolBySlug("line-sorter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function LineSorterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <LineSorterTool />
      </ToolPageLayout>
    </>
  );
}
