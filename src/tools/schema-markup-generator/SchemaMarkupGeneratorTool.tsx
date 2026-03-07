"use client";
import { useState } from "react";

const SCHEMAS = ["Article","FAQ","Product","LocalBusiness","Event"];

export function SchemaMarkupGeneratorTool() {
  const [type, setType] = useState("Article");
  const [fields, setFields] = useState<Record<string,string>>({ name: "My Article", description: "Article description", url: "https://example.com" });
  const update = (k: string, v: string) => setFields({...fields, [k]: v});

  const FIELD_MAP: Record<string,string[]> = {
    Article: ["name","description","url","author","datePublished"],
    FAQ: ["name","description"],
    Product: ["name","description","price","currency","brand"],
    LocalBusiness: ["name","description","address","telephone","url"],
    Event: ["name","description","startDate","location","url"],
  };

  const schema: Record<string,unknown> = { "@context": "https://schema.org", "@type": type };
  (FIELD_MAP[type]||[]).forEach(f => { if (fields[f]) schema[f] = fields[f]; });

  const output = JSON.stringify(schema, null, 2);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schema Type</label>
        <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
          {SCHEMAS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {(FIELD_MAP[type]||[]).map(f => (
        <div key={f}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{f}</label>
          <input className="input-field" value={fields[f]||""} onChange={e => update(f, e.target.value)} />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JSON-LD Output</label>
        <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[16rem]" readOnly value={'<script type="application/ld+json">\n' + output + '\n</script>'} />
      </div>
      <button onClick={() => navigator.clipboard.writeText('<script type="application/ld+json">\n' + output + '\n</script>')} className="btn-primary text-sm">Copy</button>
    </div>
  );
}
