import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { GitCommandGeneratorTool } from "@/tools/git-command-generator/GitCommandGeneratorTool";

const tool = getToolBySlug("git-command-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function GitCommandGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <GitCommandGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
