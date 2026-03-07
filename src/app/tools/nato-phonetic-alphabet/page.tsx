import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { NatoPhoneticAlphabetTool } from "@/tools/nato-phonetic-alphabet/NatoPhoneticAlphabetTool";

const tool = getToolBySlug("nato-phonetic-alphabet")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function NatoPhoneticAlphabetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <NatoPhoneticAlphabetTool />
      </ToolPageLayout>
    </>
  );
}
