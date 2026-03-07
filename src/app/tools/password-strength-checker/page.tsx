import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { PasswordStrengthCheckerTool } from "@/tools/password-strength-checker/PasswordStrengthCheckerTool";

const tool = getToolBySlug("password-strength-checker")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function PasswordStrengthCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <PasswordStrengthCheckerTool />
      </ToolPageLayout>
    </>
  );
}
