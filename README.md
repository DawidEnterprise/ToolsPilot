# ⚡ ToolPilot — 500+ Free Online Tools Platform

A massive, SEO-optimized utility tools platform built with **Next.js 14**, **TypeScript**, **TailwindCSS**, and **Azure**. Designed to scale from 3 tools to 500+ with a modular architecture where adding a new tool takes minutes.

---

## 📁 Repository Structure

```
toolpilot/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # Full CI/CD: lint → test → build → deploy
├── docs/
│   ├── TOOL_LIST.md               # 220 tools across 6 categories
│   ├── ARCHITECTURE.md            # System design & infrastructure
│   └── ROADMAP.md                 # 4-phase development plan
├── functions/                     # Azure Functions (serverless processing)
│   ├── src/
│   │   ├── health.ts              # Health check endpoint
│   │   └── convert-image.ts       # Server-side image conversion (Sharp)
│   ├── host.json
│   ├── package.json
│   └── tsconfig.json
├── infra/                         # Azure Bicep infrastructure-as-code
│   ├── main.bicep                 # App Service + Functions + Storage + CDN + AppInsights
│   ├── parameters.dev.json
│   └── parameters.prod.json
├── scripts/
│   └── generate-tool.ts           # CLI: scaffold a new tool in seconds
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout (header, footer, ads, analytics)
│   │   ├── page.tsx               # Homepage (hero, featured, categories)
│   │   ├── globals.css            # Tailwind + custom component classes
│   │   ├── sitemap.ts             # Auto-generated sitemap.xml
│   │   ├── robots.ts              # robots.txt
│   │   ├── about/page.tsx
│   │   ├── categories/
│   │   │   ├── page.tsx           # All categories
│   │   │   └── [category]/page.tsx
│   │   ├── tools/
│   │   │   ├── page.tsx           # All tools listing
│   │   │   ├── [slug]/page.tsx    # Generic "coming soon" catch-all
│   │   │   ├── json-formatter/page.tsx
│   │   │   ├── png-to-jpg/page.tsx
│   │   │   └── word-counter/page.tsx
│   │   └── api/
│   │       └── process/image/route.ts  # API proxy to Azure Functions
│   ├── components/                # Shared UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ToolCard.tsx
│   │   ├── ToolPageLayout.tsx     # Shared wrapper for every tool page
│   │   ├── ToolSeo.tsx            # Metadata + JSON-LD generators
│   │   ├── AdSlot.tsx             # AdSense placeholder system
│   │   ├── AdSenseScript.tsx
│   │   ├── AnalyticsScript.tsx
│   │   ├── FileDropZone.tsx       # Drag-and-drop file upload
│   │   └── CopyButton.tsx
│   ├── lib/                       # Core utilities & config
│   │   ├── types.ts               # ToolDefinition, categories
│   │   ├── registry.ts            # Single source of truth for all tools
│   │   ├── config.ts              # Site-wide constants
│   │   └── utils.ts               # Helpers (download, copy, format)
│   └── tools/                     # Tool logic & UI (decoupled from routing)
│       ├── json-formatter/
│       │   ├── logic.ts           # Pure functions (testable)
│       │   └── JsonFormatterTool.tsx
│       ├── png-to-jpg/
│       │   ├── logic.ts
│       │   └── PngToJpgTool.tsx
│       └── word-counter/
│           ├── logic.ts
│           └── WordCounterTool.tsx
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.example
└── .gitignore
```

---

## 🚀 Quick Start

```bash
# 1. Clone & install
git clone https://github.com/your-org/toolpilot.git
cd toolpilot
npm install

# 2. Set up environment
cp .env.example .env.local

# 3. Start development
npm run dev

# Visit http://localhost:3000
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | TailwindCSS 3.4, custom component classes |
| **Backend** | Azure Functions v4 (Node.js 20) |
| **Infrastructure** | Azure App Service, Blob Storage, CDN, Front Door, Application Insights |
| **IaC** | Azure Bicep |
| **CI/CD** | GitHub Actions (lint → test → build → deploy) |
| **SEO** | Auto sitemap, JSON-LD structured data, Open Graph, Core Web Vitals optimized |
| **Monetization** | Google AdSense (placeholder system), Analytics |

---

## 🔧 Adding a New Tool (< 5 minutes)

### Option A: Use the generator script

```bash
npx ts-node scripts/generate-tool.ts "csv-to-json" "CSV to JSON Converter" "developer"
```

This creates:
- `src/tools/csv-to-json/logic.ts` — pure business logic
- `src/tools/csv-to-json/CsvToJsonTool.tsx` — React UI  
- `src/app/tools/csv-to-json/page.tsx` — Next.js page with SEO

Then add the tool entry to `src/lib/registry.ts`.

### Option B: Manual (copy an existing tool)

1. Copy `src/tools/json-formatter/` → `src/tools/your-tool/`
2. Copy `src/app/tools/json-formatter/` → `src/app/tools/your-tool/`
3. Add entry to `src/lib/registry.ts`
4. Implement logic in `logic.ts`, UI in `*Tool.tsx`

That's it. Sitemap, SEO metadata, JSON-LD, breadcrumbs, related tools, and ad placements are all automatic.

---

## 📐 Architecture

### Tool Module Pattern

Every tool follows the same structure:
```
src/tools/<slug>/
  logic.ts            # Pure functions — no React, fully testable
  <PascalName>Tool.tsx # "use client" React component
```

The page route at `src/app/tools/<slug>/page.tsx` is a thin wrapper that:
1. Imports the tool from the registry
2. Generates SEO metadata  
3. Injects JSON-LD structured data
4. Wraps the tool in `ToolPageLayout` (breadcrumbs, ads, related tools)

### Client-side vs Server-side

- **Client-side tools** (JSON formatter, word counter, PNG→JPG): All processing happens in the browser. Zero server load, instant results, complete privacy.
- **Server-side tools** (PDF conversion, background removal): Upload to Azure Function, process with Sharp/PDFKit, return result. Files are immediately discarded.

---

## 💰 Monetization Strategy

### Google AdSense Placements
- **`tool-top`** — Leaderboard (728×90) above the tool
- **`tool-bottom`** — Rectangle (300×250) below the tool  
- **`sidebar`** — Sticky sidebar ad on desktop (300×600)
- **`in-content`** — In-article between homepage sections
- **`footer`** — Anchor ad at page bottom

### Revenue Scaling
| Monthly Users | Est. Monthly Revenue |
|--------------|---------------------|
| 10,000 | $50–150 |
| 100,000 | $500–2,000 |
| 1,000,000 | $5,000–20,000 |
| 5,000,000 | $25,000–100,000 |

### Future Revenue Streams
- **Premium API**: Rate-limited free tier, paid for bulk processing
- **Affiliate links**: Hosting, design tools, SaaS recommendations
- **Sponsored tool placements**: Featured spots in categories

---

## ☁️ Azure Infrastructure

```
                    ┌──────────────┐
                    │  Azure CDN   │
                    │ (Front Door) │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
     ┌────────▼──────┐  ┌─▼──────────┐│
     │  App Service   │  │   Azure    ││
     │  (Next.js)     │  │  Functions ││
     │  Node 20 LTS   │  │  (Sharp)   ││
     └────────┬───────┘  └─┬──────────┘│
              │            │            │
              └────────┬───┘            │
                       │                │
              ┌────────▼───────┐        │
              │  Blob Storage  │        │
              │  (uploads)     │        │
              └────────────────┘        │
                                        │
              ┌─────────────────┐       │
              │  App Insights    │◄──────┘
              │  (monitoring)    │
              └─────────────────┘
```

### Deployment

```bash
# Login to Azure
az login

# Create resource group
az group create --name rg-toolpilot-prod --location eastus2

# Deploy infrastructure
az deployment group create \
  --resource-group rg-toolpilot-prod \
  --template-file infra/main.bicep \
  --parameters infra/parameters.prod.json
```

CI/CD handles subsequent deployments automatically on push to `main`.

---

## 🔍 SEO Strategy

### Programmatic SEO
- Every tool page is statically generated at build time
- Dynamic sitemap auto-includes every tool from the registry
- JSON-LD `WebApplication` schema on every tool page
- Open Graph + Twitter Card meta tags
- Breadcrumb navigation for search engines

### URL Structure
```
/                           → Homepage
/tools                      → All tools
/tools/json-formatter       → Tool page
/tools/png-to-jpg           → Tool page
/categories/developer       → Category listing
/categories/image           → Category listing
```

### Core Web Vitals
- Static generation (zero JS for initial paint)
- Font preloading with `next/font`
- Image optimization with `next/image`
- CSS purging via Tailwind
- Edge caching via Azure CDN

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Type checking
npm run typecheck
```

Each tool's `logic.ts` can be unit-tested independently since it has zero React dependency.

---

## 📋 Development Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full plan.

| Phase | Tools | Focus |
|-------|-------|-------|
| **Phase 1 — MVP** | 10 | Core tools, SEO foundation, AdSense |
| **Phase 2** | 50 | Top-searched tools, API layer |
| **Phase 3** | 200 | Full catalog, premium features |
| **Phase 4** | 500 | International, mobile app |

---

## 📄 License

MIT
