import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JwtDecoderTool } from "@/tools/jwt-decoder/JwtDecoderTool";

const tool = getToolBySlug("jwt-decoder")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JwtDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JwtDecoderTool />
      </ToolPageLayout>
    </>
  );
}
