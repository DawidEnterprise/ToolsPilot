import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

/**
 * Health-check endpoint for the Azure Functions app.
 */
app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (_req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> => {
    return {
      status: 200,
      jsonBody: { status: "ok", timestamp: new Date().toISOString() },
    };
  },
});
