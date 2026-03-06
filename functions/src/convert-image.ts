import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import sharp from "sharp";

/**
 * Server-side image conversion for heavy formats.
 * POST /api/convert-image
 * Body: multipart/form-data with "file" field
 * Query: ?format=jpeg&quality=85
 */
app.http("convert-image", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const formData = await req.formData();
      const fileEntry = formData.get("file");

      if (!fileEntry || !(fileEntry instanceof Blob)) {
        return { status: 400, jsonBody: { error: "No file provided" } };
      }

      // 20 MB limit
      if (fileEntry.size > 20 * 1024 * 1024) {
        return { status: 413, jsonBody: { error: "File too large (max 20 MB)" } };
      }

      const format = (req.query.get("format") || "jpeg") as keyof sharp.FormatEnum;
      const quality = Math.min(100, Math.max(1, parseInt(req.query.get("quality") || "85", 10)));

      const buffer = Buffer.from(await fileEntry.arrayBuffer());
      const outputBuffer = await sharp(buffer)
        .toFormat(format, { quality })
        .toBuffer();

      ctx.log(`Converted image: ${fileEntry.size} → ${outputBuffer.length} bytes (${format})`);

      return {
        status: 200,
        headers: {
          "Content-Type": `image/${format}`,
          "Content-Disposition": `attachment; filename="converted.${format}"`,
        },
        body: outputBuffer,
      };
    } catch (err) {
      ctx.error("Image conversion failed", err);
      return { status: 500, jsonBody: { error: "Conversion failed" } };
    }
  },
});
