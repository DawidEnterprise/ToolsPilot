"use client";
import { useState } from "react";

const CODES: [number,string,string][] = [
[100,"Continue","The server has received the request headers."],
[200,"OK","The request succeeded."],
[201,"Created","A new resource was created."],
[204,"No Content","No content to send."],
[301,"Moved Permanently","Resource has been permanently moved to a new URL."],
[302,"Found","Resource temporarily at a different URL."],
[304,"Not Modified","Resource has not been modified since last request."],
[400,"Bad Request","The server cannot process the request due to a client error."],
[401,"Unauthorized","Authentication is required."],
[403,"Forbidden","The server refuses to authorize the request."],
[404,"Not Found","The requested resource could not be found."],
[405,"Method Not Allowed","The request method is not allowed for this resource."],
[408,"Request Timeout","The server timed out waiting for the request."],
[409,"Conflict","The request conflicts with the current state."],
[410,"Gone","The resource is permanently gone."],
[418,"I'm a Teapot","The server refuses to brew coffee (RFC 2324)."],
[422,"Unprocessable Entity","The request is well-formed but has semantic errors."],
[429,"Too Many Requests","Rate limit exceeded."],
[500,"Internal Server Error","The server encountered an unexpected condition."],
[501,"Not Implemented","The server does not support the request method."],
[502,"Bad Gateway","Invalid response from an upstream server."],
[503,"Service Unavailable","The server is currently unable to handle the request."],
[504,"Gateway Timeout","The upstream server did not respond in time."],
];

export function HttpStatusCodesTool() {
  const [search, setSearch] = useState("");
  const filtered = CODES.filter(([code,name,desc]) => {
    const q = search.toLowerCase();
    return String(code).includes(q) || name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search by code, name, or description..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-900">
        {filtered.map(([code, name, desc]) => {
          const color = code < 200 ? "text-gray-600" : code < 300 ? "text-green-600" : code < 400 ? "text-blue-600" : code < 500 ? "text-yellow-600" : "text-red-600";
          return (
            <div key={code} className="flex items-start gap-3 px-4 py-3">
              <span className={"font-mono font-bold text-sm " + color}>{code}</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
