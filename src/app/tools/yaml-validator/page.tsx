import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { YamlValidatorTool } from "@/tools/yaml-validator/YamlValidatorTool";

const tool = getToolBySlug("yaml-validator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function YamlValidatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <YamlValidatorTool />
      </ToolPageLayout>
    </>
  );
}
