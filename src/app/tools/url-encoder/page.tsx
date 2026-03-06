import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { UrlEncoderTool } from "@/tools/url-encoder/UrlEncoderTool";

const tool = getToolBySlug("url-encoder")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function UrlEncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <UrlEncoderTool />
      </ToolPageLayout>
    </>
  );
}
