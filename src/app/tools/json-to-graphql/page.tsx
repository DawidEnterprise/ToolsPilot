import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonToGraphqlTool } from "@/tools/json-to-graphql/JsonToGraphqlTool";

const tool = getToolBySlug("json-to-graphql")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function JsonToGraphqlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <JsonToGraphqlTool />
      </ToolPageLayout>
    </>
  );
}
