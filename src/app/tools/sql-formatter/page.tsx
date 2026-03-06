import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SqlFormatterTool } from "@/tools/sql-formatter/SqlFormatterTool";

const tool = getToolBySlug("sql-formatter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SqlFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <SqlFormatterTool />
      </ToolPageLayout>
    </>
  );
}
