import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonPathTesterTool } from "@/tools/json-path-tester/JsonPathTesterTool";

const tool = getToolBySlug("json-path-tester")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonPathTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonPathTesterTool />
      </ToolPageLayout>
    </>
  );
}
