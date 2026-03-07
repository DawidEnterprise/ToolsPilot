import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TailwindToCssTool } from "@/tools/tailwind-to-css/TailwindToCssTool";

const tool = getToolBySlug("tailwind-to-css")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TailwindToCssPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TailwindToCssTool />
      </ToolPageLayout>
    </>
  );
}
