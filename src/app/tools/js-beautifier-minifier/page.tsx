import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsBeautifierMinifierTool } from "@/tools/js-beautifier-minifier/JsBeautifierMinifierTool";

const tool = getToolBySlug("js-beautifier-minifier")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsBeautifierMinifierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsBeautifierMinifierTool />
      </ToolPageLayout>
    </>
  );
}
