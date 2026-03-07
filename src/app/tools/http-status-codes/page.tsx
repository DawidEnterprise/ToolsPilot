import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { HttpStatusCodesTool } from "@/tools/http-status-codes/HttpStatusCodesTool";

const tool = getToolBySlug("http-status-codes")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function HttpStatusCodesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <HttpStatusCodesTool />
      </ToolPageLayout>
    </>
  );
}
