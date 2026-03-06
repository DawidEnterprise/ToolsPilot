# Architecture — ToolPilot

## System Overview

ToolPilot is a statically-generated Next.js application where each tool is a self-contained module. The system is designed around two principles:

1. **Adding a tool should never require touching framework code** — only add a registry entry and a tool folder.
2. **Most tools run entirely client-side** — server infrastructure exists only for heavy processing (PDFs, AI features).

---

## Module Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Tool Registry                       │
│              src/lib/registry.ts                         │
│   Single array of ToolDefinition objects — every tool    │
│   must be registered here for routing, SEO, sitemap.     │
└────────────────┬────────────────────────────────────────┘
                 │
    ┌────────────┼────────────────┐
    │            │                │
    ▼            ▼                ▼
┌────────┐ ┌──────────┐   ┌─────────────┐
│ Sitemap│ │ Category │   │  Tool Pages  │
│ .xml   │ │  Pages   │   │             │
└────────┘ └──────────┘   └──────┬──────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
              ┌─────▼────┐ ┌─────▼────┐  ┌─────▼────┐
              │ToolPage  │ │ToolPage  │  │ToolPage  │
              │ Layout   │ │ Layout   │  │ Layout   │
              │(shared)  │ │(shared)  │  │(shared)  │
              └─────┬────┘ └─────┬────┘  └─────┬────┘
                    │            │             │
              ┌─────▼────┐ ┌─────▼────┐  ┌─────▼────┐
              │  Tool UI  │ │  Tool UI │  │  Tool UI │
              │ (client)  │ │ (client) │  │ (client) │
              └─────┬────┘ └─────┬────┘  └─────┬────┘
                    │            │             │
              ┌─────▼────┐ ┌─────▼────┐  ┌─────▼────┐
              │  logic.ts │ │ logic.ts │  │ logic.ts │
              │  (pure)   │ │ (pure)   │  │ (pure)   │
              └──────────┘ └──────────┘  └──────────┘
```

## Data Flow

### Client-side tool (e.g., JSON Formatter)
```
User Input → logic.ts (pure function) → Output displayed in UI
```
No network requests. Privacy-first.

### Server-side tool (e.g., PDF to Word)
```
User uploads file
  → POST /api/process/image (Next.js API route)
    → Proxied to Azure Function
      → Sharp/PDFKit processes file
      → Returns result
  → File downloaded by user
  → Azure Function discards file immediately
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **App Router (not Pages Router)** | Better streaming, server components, metadata API |
| **Tool logic in separate `logic.ts`** | Enables unit testing without React, reuse in API |
| **Single registry array** | One file to manage all tools — no scattered config |
| **Catch-all `[slug]` route** | Coming-soon pages auto-generated for registered tools |
| **TailwindCSS with custom classes** | Fast development, tiny CSS bundle, consistent styling |
| **Azure Bicep (not Terraform)** | First-class Azure support, simpler for this stack |
| **AdSlot component abstraction** | Swap placeholder ↔ real ads without touching tool code |

## Scaling

### Horizontal: More Tools
- Registry-driven — add an entry, scaffold files, done
- Static generation means N tools = N static HTML pages, zero server cost
- Build time scales linearly but Next.js ISR can mitigate

### Vertical: More Traffic  
- Azure CDN / Front Door handles millions of requests at edge
- Client-side tools = zero server compute per request
- Azure Functions scale automatically for server-side tools
- Blob Storage for temporary file processing (auto-cleanup via lifecycle policy)

### Cost at Scale
| Users/mo | Infra Cost/mo | Notes |
|----------|--------------|-------|
| < 50K | ~$30 | App Service B1 + minimal Functions |
| 500K | ~$100 | P1v3 + moderate Functions |
| 5M | ~$300–500 | Multiple App Service instances + heavy Functions |
