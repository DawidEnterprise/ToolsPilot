"use client";
import { useState } from "react";

export function HtaccessGeneratorTool() {
  const [wwwRedirect, setWwwRedirect] = useState(true);
  const [httpsRedirect, setHttpsRedirect] = useState(true);
  const [gzip, setGzip] = useState(true);
  const [caching, setCaching] = useState(true);
  const [hotlink, setHotlink] = useState(false);
  const [domain, setDomain] = useState("example.com");

  let output = "# Generated .htaccess\n";
  if (httpsRedirect) output += "\nRewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n";
  if (wwwRedirect) output += "\nRewriteCond %{HTTP_HOST} ^www\\." + domain.replace(/\./g,"\\.") + " [NC]\nRewriteRule ^(.*)$ https://" + domain + "/$1 [L,R=301]\n";
  if (gzip) output += "\n<IfModule mod_deflate.c>\n  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml\n</IfModule>\n";
  if (caching) output += "\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresByType text/css \"access plus 1 month\"\n  ExpiresByType application/javascript \"access plus 1 month\"\n  ExpiresByType image/png \"access plus 1 year\"\n  ExpiresByType image/jpeg \"access plus 1 year\"\n</IfModule>\n";
  if (hotlink) output += "\nRewriteCond %{HTTP_REFERER} !^$\nRewriteCond %{HTTP_REFERER} !^https?://(www\\.)?" + domain.replace(/\./g,"\\.") + " [NC]\nRewriteRule \\.(jpg|jpeg|png|gif|svg)$ - [F,L]\n";

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domain</label>
        <input className="input-field" value={domain} onChange={e => setDomain(e.target.value)} />
      </div>
      <div className="space-y-2 text-sm">
        {[["HTTPS redirect",httpsRedirect,setHttpsRedirect],["Remove www",wwwRedirect,setWwwRedirect],["Enable GZIP",gzip,setGzip],["Browser caching",caching,setCaching],["Hotlink protection",hotlink,setHotlink]].map(([label,val,setter]) => (
          <label key={String(label)} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={val as boolean} onChange={e => (setter as (v:boolean)=>void)(e.target.checked)} className="rounded text-brand-600" />
            <span className="text-gray-700 dark:text-gray-300">{label as string}</span>
          </label>
        ))}
      </div>
      <textarea className="input-field font-mono text-sm bg-gray-50 dark:bg-gray-800 min-h-[16rem]" readOnly value={output} />
      <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary text-sm">Copy .htaccess</button>
    </div>
  );
}
