import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TimestampConverterTool } from "@/tools/timestamp-converter/TimestampConverterTool";

const tool = getToolBySlug("timestamp-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TimestampConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <TimestampConverterTool />
      </ToolPageLayout>
    </>
  );
}
