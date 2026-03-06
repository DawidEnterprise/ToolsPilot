import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { Base64Tool } from "@/tools/base64-encoder/Base64Tool";

const tool = getToolBySlug("base64-encoder")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function Base64EncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <Base64Tool />
      </ToolPageLayout>
    </>
  );
}
