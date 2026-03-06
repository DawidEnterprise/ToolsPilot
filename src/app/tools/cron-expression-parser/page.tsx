import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/components/ToolSeo";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CronExpressionParserTool } from "@/tools/cron-expression-parser/CronExpressionParserTool";

const tool = getToolBySlug("cron-expression-parser")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CronExpressionParserPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolJsonLd(tool)) }}
      />
      <ToolPageLayout tool={tool}>
        <CronExpressionParserTool />
      </ToolPageLayout>
    </>
  );
}
