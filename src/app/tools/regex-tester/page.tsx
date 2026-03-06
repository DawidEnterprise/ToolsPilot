import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { RegexTesterTool } from "@/tools/regex-tester/RegexTesterTool";

const tool = getToolBySlug("regex-tester")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function RegexTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <RegexTesterTool />
      </ToolPageLayout>
    </>
  );
}
