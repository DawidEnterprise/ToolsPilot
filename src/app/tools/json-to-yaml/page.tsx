import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonToYamlTool } from "@/tools/json-to-yaml/JsonToYamlTool";

const tool = getToolBySlug("json-to-yaml")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonToYamlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonToYamlTool />
      </ToolPageLayout>
    </>
  );
}
