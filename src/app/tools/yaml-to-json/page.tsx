import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { YamlToJsonTool } from "@/tools/yaml-to-json/YamlToJsonTool";

const tool = getToolBySlug("yaml-to-json")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function YamlToJsonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <YamlToJsonTool />
      </ToolPageLayout>
    </>
  );
}
