"use client";

import { useState, useMemo } from "react";
import { generateRobotsTxt, type RobotsTxtConfig } from "./logic";

const DEFAULT_CONFIG: RobotsTxtConfig = {
  userAgent: "*",
  allow: ["/"],
  disallow: ["/admin/", "/private/"],
  sitemap: "https://example.com/sitemap.xml",
  crawlDelay: "",
};

export function RobotsTxtGeneratorTool() {
  const [configs, setConfigs] = useState<RobotsTxtConfig[]>([{ ...DEFAULT_CONFIG }]);

  const output = useMemo(() => generateRobotsTxt(configs), [configs]);

  const update = (idx: number, key: keyof RobotsTxtConfig, val: string | string[]) => {
    setConfigs((prev) => prev.map((c, i) => (i === idx ? { ...c, [key]: val } : c)));
  };

  const addConfig = () => {
    setConfigs((prev) => [...prev, { userAgent: "Googlebot", allow: ["/"], disallow: [], sitemap: "", crawlDelay: "" }]);
  };

  const removeConfig = (idx: number) => {
    setConfigs((prev) => prev.filter((_, i) => i !== idx));
  };

  const copy = () => { navigator.clipboard.writeText(output); };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          {configs.map((config, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rule {idx + 1}</h3>
                {configs.length > 1 && (
                  <button onClick={() => removeConfig(idx)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
                )}
              </div>
              <div className="space-y-2">
                <input
                  type="text" className="input-field" value={config.userAgent}
                  onChange={(e) => update(idx, "userAgent", e.target.value)} placeholder="User-agent"
                />
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Allow (one per line)</label>
                  <textarea
                    className="input-field min-h-[60px] font-mono text-sm"
                    value={config.allow.join("\n")}
                    onChange={(e) => update(idx, "allow", e.target.value.split("\n"))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Disallow (one per line)</label>
                  <textarea
                    className="input-field min-h-[60px] font-mono text-sm"
                    value={config.disallow.join("\n")}
                    onChange={(e) => update(idx, "disallow", e.target.value.split("\n"))}
                  />
                </div>
                {idx === 0 && (
                  <input type="text" className="input-field font-mono text-sm" value={config.sitemap} onChange={(e) => update(idx, "sitemap", e.target.value)} placeholder="Sitemap URL" />
                )}
                <input type="text" className="input-field w-32" value={config.crawlDelay} onChange={(e) => update(idx, "crawlDelay", e.target.value)} placeholder="Crawl delay (s)" />
              </div>
            </div>
          ))}
          <button onClick={addConfig} className="btn-secondary text-sm">+ Add Rule</button>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">robots.txt</label>
            <button onClick={copy} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>
          </div>
          <pre className="overflow-auto min-h-[20rem] rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
