import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonToTypescriptTool } from "@/tools/json-to-typescript/JsonToTypescriptTool";

const tool = getToolBySlug("json-to-typescript")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonToTypescriptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonToTypescriptTool />
      </ToolPageLayout>
    </>
  );
}
