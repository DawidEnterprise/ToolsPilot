import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { RobotsTxtGeneratorTool } from "@/tools/robots-txt-generator/RobotsTxtGeneratorTool";

const tool = getToolBySlug("robots-txt-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function RobotsTxtGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <RobotsTxtGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
