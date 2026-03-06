import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PasswordGeneratorTool } from "@/tools/password-generator/PasswordGeneratorTool";

const tool = getToolBySlug("password-generator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PasswordGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PasswordGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
