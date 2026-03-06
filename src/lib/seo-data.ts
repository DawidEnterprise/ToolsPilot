/* ──────────────────────────────────────────────────────────
   SEO Data — Per-tool optimized titles, descriptions,
   FAQ schema, and keyword-rich content sections.
   Consumed by ToolSeo.tsx and ToolPageLayout.tsx.
   ────────────────────────────────────────────────────────── */

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolContentSection {
  heading: string;
  body: string;
}

export interface ToolHowToStep {
  name: string;
  text: string;
}

export interface ToolSeoData {
  seoTitle: string;
  seoDescription: string;
  faqs: ToolFaq[];
  content: ToolContentSection[];
  howTo?: ToolHowToStep[];
}

export const toolSeoData: Record<string, ToolSeoData> = {
  // ─── Image Tools ─────────────────────────────────
  "png-to-jpg": {
    seoTitle: "PNG to JPG Converter Online Free — No Upload Required",
    seoDescription:
      "Convert PNG to JPG instantly in your browser. No file uploads, no server processing, 100% private. Adjust quality and download in seconds.",
    faqs: [
      {
        question: "How do I convert PNG to JPG for free?",
        answer:
          "Simply drag and drop your PNG file onto our converter, adjust the quality slider if needed, and click Convert. The JPG file downloads instantly — no signup or software required.",
      },
      {
        question: "Is it safe to convert PNG to JPG online?",
        answer:
          "Yes. Our converter runs entirely in your browser using JavaScript. Your images are never uploaded to any server, so your files stay completely private.",
      },
      {
        question: "What is the difference between PNG and JPG?",
        answer:
          "PNG supports transparency and uses lossless compression, making it ideal for graphics and logos. JPG uses lossy compression for smaller file sizes, making it better for photographs and web images.",
      },
    ],
    content: [
      {
        heading: "How to Convert PNG to JPG",
        body: "Select or drag and drop your PNG image into the converter above. Choose your desired quality level — higher quality means a larger file size. Click the Convert button and your JPG image will be ready to download instantly. The entire process happens in your browser, so your images are never sent to any external server.",
      },
      {
        heading: "Why Convert PNG to JPG?",
        body: "JPG files are significantly smaller than PNGs, often 5–10x smaller for photographs. This makes them ideal for websites, email attachments, and social media where fast loading times and bandwidth matter. If your image doesn't require transparency, converting to JPG is the best way to reduce file size without noticeable quality loss.",
      },
    ],
    howTo: [
      { name: "Upload your PNG image", text: "Drag and drop or click to select a PNG file from your device." },
      { name: "Adjust quality", text: "Use the quality slider to balance file size and image quality." },
      { name: "Click Convert", text: "Press the Convert button to transform your PNG into JPG format." },
      { name: "Download", text: "Click the Download button to save your converted JPG file." },
    ],
  },

  "jpg-to-png": {
    seoTitle: "JPG to PNG Converter Online Free — Preserve Transparency",
    seoDescription:
      "Convert JPG to PNG format instantly in your browser. Add transparency support, preserve quality, no upload needed. 100% free and private.",
    faqs: [
      {
        question: "How do I convert JPG to PNG online?",
        answer:
          "Upload or drag your JPG image into the converter, then click Convert. Your PNG file with full transparency support will be ready to download instantly.",
      },
      {
        question: "Does converting JPG to PNG improve quality?",
        answer:
          "Converting JPG to PNG preserves the existing quality but does not restore detail lost during original JPG compression. However, PNG uses lossless compression, so no further quality is lost.",
      },
      {
        question: "Why would I convert JPG to PNG?",
        answer:
          "PNG supports transparency (alpha channel), which is essential for logos, icons, and overlay graphics. PNG also uses lossless compression, so the image won't degrade further when saved.",
      },
    ],
    content: [
      {
        heading: "How to Convert JPG to PNG",
        body: "Drop your JPG file into the converter above and click Convert. The tool processes everything locally in your browser using the Canvas API — no server uploads, no waiting. Your PNG file will be ready to download in seconds.",
      },
      {
        heading: "When to Use PNG Over JPG",
        body: "Use PNG when you need transparency, sharp edges on text or logos, or lossless image quality. PNGs are ideal for screenshots, UI elements, graphics with text, and any image that will be edited further. For photographs where file size matters, JPG is usually the better choice.",
      },
    ],
  },

  "image-resizer": {
    seoTitle: "Image Resizer Online Free — Resize Photos to Any Dimension",
    seoDescription:
      "Resize images to exact dimensions online. Preset sizes for social media, HD, 4K and custom sizes. No upload, runs in your browser. Free.",
    faqs: [
      {
        question: "How do I resize an image online?",
        answer:
          "Upload your image, enter the desired width and height or choose a preset size (social media, HD, 4K), and click Resize. Download the resized image instantly.",
      },
      {
        question: "Does resizing an image reduce quality?",
        answer:
          "Reducing image dimensions removes pixel data, which can reduce detail. Enlarging images can cause blurriness. For best results, resize down from a high-resolution original.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "Our resizer supports all common web image formats including JPG, PNG, WebP, and GIF. The output format matches your input format.",
      },
    ],
    content: [
      {
        heading: "How to Resize Images Online",
        body: "Select your image file and choose your target dimensions. Use one of the built-in presets for social media platforms (Instagram, Facebook, Twitter) or enter custom width and height values. The aspect ratio can be locked to prevent distortion. Your resized image processes entirely in the browser.",
      },
      {
        heading: "Image Size Guide for Social Media",
        body: "Each platform has recommended image sizes: Instagram posts (1080×1080), Facebook covers (820×312), Twitter headers (1500×500), LinkedIn banners (1584×396). Using the correct dimensions ensures your images display without cropping or stretching.",
      },
    ],
    howTo: [
      { name: "Upload your image", text: "Select or drag and drop an image file (JPG, PNG, WebP, GIF) into the resizer." },
      { name: "Set target dimensions", text: "Enter custom width and height or choose a preset size for social media, HD, or 4K." },
      { name: "Lock aspect ratio", text: "Toggle the aspect ratio lock to prevent distortion when resizing." },
      { name: "Download resized image", text: "Click Download to save your resized image in the original format." },
    ],
  },

  // ─── Developer Tools ─────────────────────────────
  "json-formatter": {
    seoTitle: "JSON Formatter & Validator Online — Free JSON Pretty Printer",
    seoDescription:
      "Format, validate and beautify JSON data instantly. Syntax highlighting, error detection, and one-click copy. Free online JSON pretty printer.",
    faqs: [
      {
        question: "How do I format JSON online?",
        answer:
          "Paste your JSON into the editor and click Format. The tool instantly beautifies your JSON with proper indentation and syntax highlighting. Invalid JSON is flagged with error messages.",
      },
      {
        question: "How do I validate JSON?",
        answer:
          "Paste your JSON and the tool automatically validates it. If there are syntax errors, you'll see a clear error message indicating the line and position of the problem.",
      },
      {
        question: "What is JSON used for?",
        answer:
          "JSON (JavaScript Object Notation) is a lightweight data interchange format used in web APIs, configuration files, databases, and data storage. It's human-readable and supported by virtually every programming language.",
      },
    ],
    content: [
      {
        heading: "How to Format and Validate JSON",
        body: "Paste your raw or minified JSON into the input field above. The formatter instantly validates the syntax and displays a beautified version with proper indentation. You can choose 2-space or 4-space indentation, minify the output, or copy the formatted result to your clipboard with one click.",
      },
      {
        heading: "Common JSON Syntax Errors",
        body: "The most frequent JSON errors include trailing commas after the last item in an array or object, using single quotes instead of double quotes, unquoted property names, and missing closing brackets. Our validator catches all of these and shows the exact location of each error.",
      },
    ],
    howTo: [
      { name: "Paste your JSON", text: "Copy your raw or minified JSON data and paste it into the editor." },
      { name: "Click Format", text: "Press the Format button to beautify and validate your JSON instantly." },
      { name: "Review errors", text: "If your JSON has syntax errors, review the highlighted error messages and fix them." },
      { name: "Copy the result", text: "Click the Copy button to copy the formatted JSON to your clipboard." },
    ],
  },

  "json-to-yaml": {
    seoTitle: "JSON to YAML Converter Online Free — Instant Conversion",
    seoDescription:
      "Convert JSON to YAML format instantly. Free online converter with validation, syntax highlighting and one-click copy. No signup required.",
    faqs: [
      {
        question: "How do I convert JSON to YAML?",
        answer:
          "Paste your JSON into the input field and the YAML output appears instantly. Copy the result with one click. The converter handles nested objects, arrays, and all JSON data types.",
      },
      {
        question: "What is the difference between JSON and YAML?",
        answer:
          "YAML uses indentation instead of braces and brackets, making it more human-readable. YAML also supports comments, multi-line strings, and anchors. JSON is more compact and widely supported in APIs.",
      },
      {
        question: "Is YAML a superset of JSON?",
        answer:
          "Yes, YAML 1.2 is a superset of JSON. Every valid JSON document is also valid YAML. However, YAML offers additional features like comments and references that JSON does not support.",
      },
    ],
    content: [
      {
        heading: "How to Convert JSON to YAML",
        body: "Paste your JSON data into the left panel. The converter instantly parses and transforms it into clean, properly indented YAML. Works with deeply nested objects, arrays, and all standard JSON data types including strings, numbers, booleans, and null values.",
      },
      {
        heading: "When to Use YAML vs JSON",
        body: "YAML is preferred for configuration files (Docker, Kubernetes, CI/CD pipelines) because of its readability and comment support. JSON is standard for REST APIs and data exchange between systems. Use this converter when migrating configuration from JSON to YAML format.",
      },
    ],
  },

  "yaml-to-json": {
    seoTitle: "YAML to JSON Converter Online Free — Instant Conversion",
    seoDescription:
      "Convert YAML to JSON format instantly. Free online converter with validation and error detection. No installation or signup needed.",
    faqs: [
      {
        question: "How do I convert YAML to JSON?",
        answer:
          "Paste your YAML into the input field. The JSON output appears instantly with proper formatting. Copy the result with one click. Syntax errors are caught and displayed.",
      },
      {
        question: "Can YAML comments be converted to JSON?",
        answer:
          "No. JSON does not support comments. When converting YAML to JSON, all comments are stripped from the output. The data itself is preserved exactly.",
      },
      {
        question: "Does this converter handle multi-document YAML?",
        answer:
          "This converter processes single YAML documents. If your YAML contains multiple documents separated by ---, paste each document separately for conversion.",
      },
    ],
    content: [
      {
        heading: "How to Convert YAML to JSON",
        body: "Paste your YAML content into the input area. The tool parses it in real time and generates formatted JSON output. All YAML data types — scalars, sequences, mappings, and nested structures — are correctly converted to their JSON equivalents.",
      },
      {
        heading: "YAML to JSON for API Development",
        body: "Developers frequently need to convert YAML configuration into JSON for API request bodies, test fixtures, and programmatic consumption. This tool makes that conversion instant and error-free, saving time during development and debugging workflows.",
      },
    ],
  },

  "xml-formatter": {
    seoTitle: "XML Formatter & Minifier Online Free — Beautify XML Instantly",
    seoDescription:
      "Format, beautify and minify XML online. Free XML pretty printer with syntax validation. Indent, collapse, or compress XML in one click.",
    faqs: [
      {
        question: "How do I format XML online?",
        answer:
          "Paste your XML into the editor and click Format. The tool indents elements properly, adds line breaks, and makes your XML human-readable. You can also minify to remove whitespace.",
      },
      {
        question: "What is the difference between XML formatting and minification?",
        answer:
          "Formatting adds indentation and line breaks for readability. Minification removes all unnecessary whitespace to reduce file size, which is useful for production configurations and data transfer.",
      },
      {
        question: "Does the formatter validate XML?",
        answer:
          "Yes. If your XML has syntax errors like unclosed tags or invalid nesting, the tool will detect them and display a clear error message.",
      },
    ],
    content: [
      {
        heading: "How to Format and Minify XML",
        body: "Paste raw or minified XML into the input area. Click Format to beautify with proper indentation, or Minify to compress into a single line. The tool handles complex XML with namespaces, attributes, CDATA sections, and deeply nested elements.",
      },
      {
        heading: "XML Formatting for Developers",
        body: "Clean, well-formatted XML is essential for debugging API responses, reviewing configuration files, and understanding data structures. Our formatter handles RSS feeds, SOAP messages, SVG files, and any well-formed XML document.",
      },
    ],
  },

  "csv-json-converter": {
    seoTitle: "CSV to JSON Converter Online Free — Convert Both Ways",
    seoDescription:
      "Convert CSV to JSON and JSON to CSV instantly. Free two-way converter with header detection. No upload, works in your browser.",
    faqs: [
      {
        question: "How do I convert CSV to JSON?",
        answer:
          "Paste your CSV data with headers in the first row. The converter automatically detects columns and produces a JSON array of objects. Copy the result with one click.",
      },
      {
        question: "Can I convert JSON back to CSV?",
        answer:
          "Yes. This is a two-way converter. Paste a JSON array of objects and get properly formatted CSV output with headers derived from the object keys.",
      },
      {
        question: "Does it handle commas inside CSV fields?",
        answer:
          "Yes. Fields containing commas, line breaks, or quotes are handled correctly when properly enclosed in double quotes, following the RFC 4180 CSV standard.",
      },
    ],
    content: [
      {
        heading: "How to Convert CSV to JSON",
        body: "Paste your CSV data into the input field. The first row is used as column headers to create JSON property names. Each subsequent row becomes a JSON object. The converter handles quoted fields, escaped characters, and various delimiter formats.",
      },
      {
        heading: "CSV vs JSON: When to Use Each",
        body: "CSV is ideal for tabular data, spreadsheets, and database exports. JSON is better for nested data structures, API communication, and modern web applications. Converting between the two is common when migrating data between systems or preparing data for different tools.",
      },
    ],
  },

  "base64-encoder": {
    seoTitle: "Base64 Encoder & Decoder Online Free — Encode/Decode Instantly",
    seoDescription:
      "Encode and decode Base64 strings online. Convert text to Base64 and back instantly. Free, private, no installation required.",
    faqs: [
      {
        question: "What is Base64 encoding?",
        answer:
          "Base64 is a binary-to-text encoding scheme that converts binary data into ASCII characters. It's commonly used to embed images in HTML/CSS, encode email attachments, and transmit binary data in text-only protocols.",
      },
      {
        question: "How do I encode text to Base64?",
        answer:
          "Paste your text into the input field and click Encode. The Base64-encoded string appears instantly. You can also decode Base64 back to plain text by pasting encoded text and clicking Decode.",
      },
      {
        question: "Is Base64 encoding the same as encryption?",
        answer:
          "No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 text. It's used for data transport, not security. For encryption, use tools like AES or RSA.",
      },
    ],
    content: [
      {
        heading: "How to Encode and Decode Base64",
        body: "Enter your plain text and click Encode to get the Base64 representation. To decode, paste a Base64 string and click Decode to reveal the original text. The tool handles UTF-8 characters, special symbols, and multi-line text.",
      },
      {
        heading: "Common Uses for Base64 Encoding",
        body: "Base64 is used to embed images in CSS (data URIs), encode binary attachments in email (MIME), include binary data in JSON payloads, and pass data through URL parameters. It increases data size by approximately 33% compared to binary.",
      },
    ],
    howTo: [
      { name: "Enter your text", text: "Type or paste the text you want to encode or decode into the input field." },
      { name: "Choose Encode or Decode", text: "Click Encode to convert text to Base64, or Decode to convert Base64 back to plain text." },
      { name: "Copy the result", text: "Click the Copy button to copy the encoded or decoded output to your clipboard." },
    ],
  },

  "url-encoder": {
    seoTitle: "URL Encoder & Decoder Online Free — Percent-Encode URLs",
    seoDescription:
      "Encode and decode URLs online. Convert special characters to percent-encoded format instantly. Free URL encoding tool for developers.",
    faqs: [
      {
        question: "What is URL encoding?",
        answer:
          "URL encoding (percent encoding) replaces unsafe characters in URLs with a % sign followed by their hex value. For example, a space becomes %20. This ensures URLs are transmitted correctly across the internet.",
      },
      {
        question: "When do I need to URL encode?",
        answer:
          "URL encode when passing special characters in query parameters, form data, or path segments. Characters like spaces, &, =, ?, #, and non-ASCII characters must be encoded to avoid breaking the URL structure.",
      },
      {
        question: "What characters need URL encoding?",
        answer:
          "Characters outside the unreserved set (A-Z, a-z, 0-9, -, _, ., ~) should be encoded in URL components. Reserved characters like &, =, ?, #, and / have special meanings and need encoding when used as data.",
      },
    ],
    content: [
      {
        heading: "How to Encode and Decode URLs",
        body: "Paste your URL or text into the input field. Click Encode to convert special characters to percent-encoded format, or Decode to convert percent-encoded strings back to readable text. The tool uses JavaScript's encodeURIComponent and decodeURIComponent functions.",
      },
      {
        heading: "URL Encoding for Web Development",
        body: "Proper URL encoding is critical for building web applications. Query parameters, form submissions, API calls, and redirect URLs all require correct encoding to prevent broken links, security vulnerabilities (like XSS), and data corruption.",
      },
    ],
  },

  "html-encoder": {
    seoTitle: "HTML Entity Encoder & Decoder Online Free — Escape HTML Characters",
    seoDescription:
      "Encode and decode HTML entities online. Convert special characters like <, >, & to HTML-safe entities. Free tool for developers.",
    faqs: [
      {
        question: "What are HTML entities?",
        answer:
          "HTML entities are special codes that represent characters with reserved meaning in HTML. For example, &lt; represents <, &amp; represents &, and &quot; represents double quotes.",
      },
      {
        question: "Why do I need to encode HTML entities?",
        answer:
          "Encoding prevents browsers from interpreting text as HTML markup. This is essential for displaying code snippets, user-generated content, and preventing XSS (Cross-Site Scripting) security vulnerabilities.",
      },
      {
        question: "Which characters need HTML encoding?",
        answer:
          "The five essential characters to encode are: < (&lt;), > (&gt;), & (&amp;), \" (&quot;), and ' (&#39;). These have special meaning in HTML and must be escaped when displayed as text content.",
      },
    ],
    content: [
      {
        heading: "How to Encode and Decode HTML Entities",
        body: "Paste your text or HTML code into the input area. Click Encode to convert special characters to their entity representations, making them safe to display in web pages. Click Decode to convert entities back to their original characters.",
      },
      {
        heading: "HTML Encoding for Security",
        body: "HTML entity encoding is a fundamental security practice in web development. Encoding user-generated content before displaying it prevents Cross-Site Scripting (XSS) attacks, where malicious scripts are injected through unescaped HTML characters.",
      },
    ],
  },

  "uuid-generator": {
    seoTitle: "UUID Generator Online Free — Generate Random UUIDs (v4) in Bulk",
    seoDescription:
      "Generate random UUID v4 identifiers instantly. Bulk generation, one-click copy, RFC 4122 compliant. Free online UUID/GUID generator.",
    faqs: [
      {
        question: "What is a UUID?",
        answer:
          "A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify resources. Version 4 UUIDs are randomly generated and have a near-zero chance of collision, making them ideal for distributed systems.",
      },
      {
        question: "How many UUIDs can I generate at once?",
        answer:
          "You can generate up to hundreds of UUIDs in a single click. Each UUID is cryptographically random and RFC 4122 compliant. Use bulk generation for database seeding, testing, and batch operations.",
      },
      {
        question: "What is the difference between UUID and GUID?",
        answer:
          "UUID and GUID are essentially the same thing. UUID is the standard term used in most programming contexts, while GUID (Globally Unique Identifier) is the term Microsoft uses. They follow the same format and specification.",
      },
    ],
    content: [
      {
        heading: "How to Generate UUIDs Online",
        body: "Click the Generate button to create a new UUID v4. Generate multiple UUIDs at once by specifying a quantity. Each UUID is generated using the Web Crypto API for cryptographic randomness. Copy individual UUIDs or all generated UUIDs with one click.",
      },
      {
        heading: "UUID Formats and Versions",
        body: "UUID v4 is the most commonly used version, generated from random numbers. The format is xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where 4 indicates version 4 and y is one of 8, 9, a, or b. UUIDs are used as database primary keys, API identifiers, session tokens, and file names.",
      },
    ],
  },

  "regex-tester": {
    seoTitle: "Regex Tester Online Free — Test Regular Expressions with Highlighting",
    seoDescription:
      "Test and debug regular expressions online with real-time matching and highlighting. Supports JavaScript regex syntax. Free regex tool.",
    faqs: [
      {
        question: "How do I test a regular expression online?",
        answer:
          "Enter your regex pattern in the pattern field and paste your test string below. Matches are highlighted in real time as you type. Flags like global (g), case-insensitive (i), and multiline (m) can be toggled.",
      },
      {
        question: "What regex syntax does this tool support?",
        answer:
          "This tool uses JavaScript's native RegExp engine, supporting standard regex syntax including character classes, quantifiers, groups, lookahead, lookbehind, and named groups.",
      },
      {
        question: "How do I match an email address with regex?",
        answer:
          "A simple email regex is: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}. For production use, consider using a dedicated email validation library as RFC 5322-compliant email regex is extremely complex.",
      },
    ],
    content: [
      {
        heading: "How to Test Regular Expressions",
        body: "Enter your regular expression pattern in the top field. Type or paste your test string in the text area below. All matches are highlighted instantly as you type. Toggle flags (global, case-insensitive, multiline) to modify matching behavior. Capture groups are displayed separately.",
      },
      {
        heading: "Regular Expression Quick Reference",
        body: "Common patterns: \\d (digit), \\w (word character), \\s (whitespace), . (any character), * (0 or more), + (1 or more), ? (0 or 1), {n,m} (n to m times), [abc] (character class), ^ (start), $ (end), | (or), (?=...) (lookahead). Escape special characters with backslash.",
      },
    ],
  },

  "jwt-decoder": {
    seoTitle: "JWT Decoder Online Free — Decode JSON Web Tokens Instantly",
    seoDescription:
      "Decode and inspect JWT tokens online. View header, payload, claims, and expiration time. Free JWT debugger — no data sent to any server.",
    faqs: [
      {
        question: "How do I decode a JWT token?",
        answer:
          "Paste the full JWT string (header.payload.signature) into the input field. The tool instantly decodes and displays the header, payload with all claims, and indicates whether the token has expired.",
      },
      {
        question: "Is it safe to decode JWT tokens online?",
        answer:
          "Yes, when using our tool. The decoding happens entirely in your browser — the JWT is never sent to any server. However, never share JWTs containing sensitive data in tools that transmit data to servers.",
      },
      {
        question: "What information does a JWT contain?",
        answer:
          "A JWT has three parts: the header (algorithm and token type), the payload (claims like user ID, email, roles, and expiration time), and the signature (used to verify authenticity). Our decoder displays the header and payload in readable format.",
      },
    ],
    content: [
      {
        heading: "How to Decode JWT Tokens",
        body: "Paste your complete JWT string into the input field above. The tool splits it into three parts — header, payload, and signature — decoding the Base64URL-encoded header and payload into readable JSON. Expiration time (exp claim) is converted to a human-readable date.",
      },
      {
        heading: "Understanding JWT Claims",
        body: "Common JWT claims include: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration time), iat (issued at), and nbf (not before). Custom claims can contain any application-specific data like roles, permissions, or user metadata.",
      },
    ],
  },

  "hash-generator": {
    seoTitle: "Hash Generator Online Free — SHA-1, SHA-256, SHA-512 Calculator",
    seoDescription:
      "Generate SHA-1, SHA-256, and SHA-512 hashes online. Free hash calculator using Web Crypto API. Verify file integrity and checksums.",
    faqs: [
      {
        question: "How do I generate a hash online?",
        answer:
          "Enter your text in the input field and select the hash algorithm (SHA-1, SHA-256, or SHA-512). The hash is computed instantly in your browser using the Web Crypto API. Copy the result with one click.",
      },
      {
        question: "What is the difference between SHA-1, SHA-256, and SHA-512?",
        answer:
          "They differ in output length and security. SHA-1 produces 160-bit hashes (considered weak for security). SHA-256 produces 256-bit hashes (standard for most applications). SHA-512 produces 512-bit hashes (highest security, slightly slower).",
      },
      {
        question: "Can you reverse a hash back to the original text?",
        answer:
          "No. Cryptographic hash functions are one-way — you cannot reverse a hash to get the original input. This is by design and is what makes hashing useful for password storage and data integrity verification.",
      },
    ],
    content: [
      {
        heading: "How to Generate Cryptographic Hashes",
        body: "Enter your text and select an algorithm. The hash is generated instantly using the Web Crypto API built into your browser — no data is sent to any server. You can compare hashes to verify data integrity or use them for checksum validation.",
      },
      {
        heading: "Hash Algorithms Explained",
        body: "SHA-256 is the industry standard for most applications including SSL certificates, blockchain, and password hashing. SHA-512 offers stronger collision resistance at the cost of a longer output. SHA-1 is deprecated for security use but still used for non-security checksums like Git commit hashes.",
      },
    ],
  },

  "timestamp-converter": {
    seoTitle: "Unix Timestamp Converter Online Free — Epoch to Date & Time",
    seoDescription:
      "Convert Unix timestamps to human-readable dates and vice versa. Live clock, millisecond support, timezone display. Free epoch converter.",
    faqs: [
      {
        question: "What is a Unix timestamp?",
        answer:
          "A Unix timestamp (epoch time) is the number of seconds since January 1, 1970, 00:00:00 UTC. It's a universal way to represent time in computing — for example, 1700000000 represents November 14, 2023.",
      },
      {
        question: "How do I convert a timestamp to a date?",
        answer:
          "Enter the Unix timestamp in the input field and the tool instantly shows the corresponding date and time in your local timezone and UTC. Supports both second and millisecond timestamps.",
      },
      {
        question: "How do I get the current Unix timestamp?",
        answer:
          "The tool displays the current Unix timestamp in real time at the top of the page. You can also get it programmatically: in JavaScript use Date.now(), in Python use import time; time.time().",
      },
    ],
    content: [
      {
        heading: "How to Convert Unix Timestamps",
        body: "Enter a Unix timestamp (in seconds or milliseconds) to convert it to a human-readable date format. Or select a date and time to get the corresponding Unix timestamp. The tool automatically detects whether your input is in seconds or milliseconds based on the number of digits.",
      },
      {
        heading: "Unix Timestamps in Programming",
        body: "Unix timestamps are the standard for storing and transmitting time data in databases, APIs, and log files. They avoid timezone ambiguity since they always represent UTC. Most programming languages have built-in functions to convert between timestamps and human-readable dates.",
      },
    ],
  },

  "number-base-converter": {
    seoTitle: "Number Base Converter Online Free — Binary, Hex, Octal, Decimal",
    seoDescription:
      "Convert numbers between binary, octal, decimal and hexadecimal instantly. Free number base converter for developers and students.",
    faqs: [
      {
        question: "How do I convert between number bases?",
        answer:
          "Enter a number in any base (binary, octal, decimal, or hex) and the tool instantly shows the equivalent in all other bases. Type in the field for the base you're converting from.",
      },
      {
        question: "What is hexadecimal used for?",
        answer:
          "Hexadecimal (base 16) is used for color codes in CSS (#FF5733), memory addresses, MAC addresses, and representing binary data compactly. Each hex digit represents 4 binary bits.",
      },
      {
        question: "How do I read binary numbers?",
        answer:
          "Binary numbers use only 0 and 1. Each position represents a power of 2 from right to left: 1, 2, 4, 8, 16, etc. For example, binary 1010 = 8 + 0 + 2 + 0 = 10 in decimal.",
      },
    ],
    content: [
      {
        heading: "How to Convert Number Bases",
        body: "Enter a number in any supported base and see it converted to all other bases simultaneously. Supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). The conversion happens in real time as you type.",
      },
      {
        heading: "Number Systems in Computing",
        body: "Binary is the foundation of all digital computing. Hexadecimal provides a compact way to represent binary data — one hex digit equals four binary digits. Octal was historically used in Unix file permissions (chmod 755). Understanding number base conversion is fundamental for programming and computer science.",
      },
    ],
  },

  "css-minifier": {
    seoTitle: "CSS Minifier & Beautifier Online Free — Compress or Format CSS",
    seoDescription:
      "Minify CSS to reduce file size or beautify for readability. Free online CSS compressor with instant results. No signup required.",
    faqs: [
      {
        question: "How do I minify CSS online?",
        answer:
          "Paste your CSS code and click Minify. The tool removes comments, whitespace, and unnecessary characters to produce the smallest possible CSS. Copy the result and use it in production.",
      },
      {
        question: "How much can CSS minification reduce file size?",
        answer:
          "CSS minification typically reduces file size by 20–50% depending on the amount of comments and whitespace in the original. This directly improves page load times and Core Web Vitals scores.",
      },
      {
        question: "Does CSS minification change how styles work?",
        answer:
          "No. Minification only removes unnecessary characters (whitespace, comments, redundant semicolons). The resulting CSS renders identically in all browsers. It is a safe, lossless optimization.",
      },
    ],
    content: [
      {
        heading: "How to Minify and Beautify CSS",
        body: "Paste your CSS into the input area. Click Minify to compress it by removing whitespace, comments, and redundant characters. Click Beautify to add proper indentation and line breaks for readability. The tool handles all valid CSS including media queries, keyframes, and custom properties.",
      },
      {
        heading: "CSS Optimization for Web Performance",
        body: "Minified CSS loads faster, improving your site's Largest Contentful Paint (LCP) and overall page speed scores. For production websites, always serve minified CSS. During development, use beautified CSS for readability. Most build tools (Webpack, Vite, PostCSS) can automate this process.",
      },
    ],
  },

  "markdown-to-html": {
    seoTitle: "Markdown to HTML Converter Online Free — Live Preview",
    seoDescription:
      "Convert Markdown to HTML with live side-by-side preview. Supports GitHub Flavored Markdown. Free online Markdown renderer.",
    faqs: [
      {
        question: "How do I convert Markdown to HTML?",
        answer:
          "Type or paste your Markdown in the left panel. The HTML output appears in real time in the right panel. Copy the generated HTML or preview the rendered result. Supports all standard Markdown syntax.",
      },
      {
        question: "What Markdown syntax is supported?",
        answer:
          "The converter supports standard Markdown and GitHub Flavored Markdown (GFM) including headings, bold, italic, links, images, code blocks, tables, task lists, strikethrough, and blockquotes.",
      },
      {
        question: "Can I use this for README files?",
        answer:
          "Yes. This tool supports GitHub Flavored Markdown (GFM), which is the same syntax used in GitHub README files. Preview your README content before pushing to your repository.",
      },
    ],
    content: [
      {
        heading: "How to Convert Markdown to HTML",
        body: "Write or paste Markdown in the editor on the left side. The HTML output is generated in real time and displayed in the right panel. You can toggle between seeing the raw HTML code and the rendered preview. Copy the HTML output for use in web pages, emails, or CMS platforms.",
      },
      {
        heading: "Markdown Syntax Quick Reference",
        body: "# Heading 1, ## Heading 2, **bold**, *italic*, [link text](url), ![alt](image-url), `inline code`, ``` code blocks ```, - unordered lists, 1. ordered lists, > blockquotes, --- horizontal rules, | tables |. GitHub Flavored Markdown adds task lists, strikethrough, and auto-linking.",
      },
    ],
  },

  "color-converter": {
    seoTitle: "Color Converter Online Free — HEX, RGB, HSL Color Picker",
    seoDescription:
      "Convert colors between HEX, RGB and HSL formats instantly. Visual color picker included. Free color conversion tool for designers and developers.",
    faqs: [
      {
        question: "How do I convert HEX to RGB?",
        answer:
          "Enter your HEX color code (e.g., #3b82f6) and the tool instantly displays the RGB equivalent (59, 130, 246) along with the HSL value. You can also use the visual color picker.",
      },
      {
        question: "What is the difference between HEX, RGB, and HSL?",
        answer:
          "HEX is a compact 6-character notation used in CSS (#RRGGBB). RGB specifies Red, Green, Blue values from 0–255. HSL uses Hue (0–360°), Saturation (0–100%), and Lightness (0–100%), which is more intuitive for color manipulation.",
      },
      {
        question: "Which color format should I use in CSS?",
        answer:
          "All three are valid in CSS. HEX is the most common and compact. RGB/RGBA is useful when you need transparency. HSL/HSLA is best when you need to programmatically adjust lightness or saturation.",
      },
    ],
    content: [
      {
        heading: "How to Convert Colors Online",
        body: "Enter a color in any format — HEX, RGB, or HSL — and see the conversions in all other formats instantly. Use the visual color picker to select colors interactively. Copy any format with one click for use in your CSS, design tools, or code.",
      },
      {
        heading: "Color Formats for Web Development",
        body: "CSS supports HEX (#3b82f6), RGB (rgb(59, 130, 246)), HSL (hsl(217, 91%, 60%)), and their alpha transparency variants. Modern CSS also supports newer formats like hwb(), lab(), and oklch(). Understanding color conversion is essential for design consistency across tools and platforms.",
      },
    ],
  },

  // ─── Text Tools ──────────────────────────────────
  "word-counter": {
    seoTitle: "Word Counter Online Free — Count Words, Characters, Sentences",
    seoDescription:
      "Count words, characters, sentences and paragraphs instantly. Reading time estimate included. Free online text analysis tool.",
    faqs: [
      {
        question: "How do I count words in text online?",
        answer:
          "Paste or type your text into the input area. The word count, character count, sentence count, and paragraph count update in real time as you type.",
      },
      {
        question: "Does the word counter include spaces?",
        answer:
          "The character count shows both with and without spaces. Words are counted by splitting on whitespace. The tool also provides an estimated reading time based on an average of 200 words per minute.",
      },
      {
        question: "How accurate is the reading time estimate?",
        answer:
          "The reading time is calculated at 200–250 words per minute, which is the average adult reading speed. Actual reading time varies based on text complexity and reader proficiency.",
      },
    ],
    content: [
      {
        heading: "How to Count Words Online",
        body: "Type or paste your text into the editor above. The word counter analyzes your text in real time, displaying the number of words, characters (with and without spaces), sentences, and paragraphs. An estimated reading time helps you gauge content length for articles, essays, and social media posts.",
      },
      {
        heading: "Word Count Guidelines",
        body: "Blog posts: 1,000–2,000 words for SEO. Social media: Twitter (280 chars), LinkedIn posts (700–1,300 chars). Academic essays: 2,500–5,000 words. Product descriptions: 150–300 words. Meta descriptions: 150–160 characters. Knowing your word count helps you hit the right length for any platform.",
      },
    ],
    howTo: [
      { name: "Paste your text", text: "Type or paste your text into the editor area above." },
      { name: "View live statistics", text: "Word count, character count, sentence count, and paragraph count update in real time." },
      { name: "Check reading time", text: "See the estimated reading time based on average adult reading speed (200 wpm)." },
    ],
  },

  "character-counter": {
    seoTitle: "Character Counter Online Free — With Social Media Limits",
    seoDescription:
      "Count characters with real-time social media limit tracking. Twitter, Instagram, LinkedIn, YouTube and more. Free character counter tool.",
    faqs: [
      {
        question: "How do I count characters for social media?",
        answer:
          "Type or paste your text and see the character count update in real time. Platform-specific limits (Twitter 280, Instagram 2200, LinkedIn 3000, etc.) are shown with progress bars so you know exactly how much space you have left.",
      },
      {
        question: "What are the character limits for each social media platform?",
        answer:
          "Twitter/X: 280 characters. Instagram captions: 2,200. LinkedIn posts: 3,000. Facebook posts: 63,206. YouTube descriptions: 5,000. TikTok captions: 2,200. Meta descriptions: 155-160 characters.",
      },
      {
        question: "Do emojis count as one character?",
        answer:
          "It depends on the platform. Most platforms count emojis as 2 characters (due to UTF-16 encoding). Our tool counts characters the same way web browsers do, giving you an accurate count for web use.",
      },
    ],
    content: [
      {
        heading: "How to Count Characters for Social Media",
        body: "Paste your text and instantly see how it fits within each platform's character limit. Color-coded indicators show when you're approaching or exceeding limits. This is essential for crafting tweets, Instagram captions, LinkedIn posts, and meta descriptions that fit perfectly.",
      },
      {
        heading: "Why Character Counts Matter",
        body: "Exceeding character limits means your content gets truncated, losing your message's impact. Search engines display only 155–160 characters in meta descriptions. Social platforms cut off text at specific lengths. Staying within limits ensures your full message is visible to your audience.",
      },
    ],
  },

  "case-converter": {
    seoTitle: "Case Converter Online Free — Uppercase, Lowercase, Title Case & More",
    seoDescription:
      "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more. Free online text case converter.",
    faqs: [
      {
        question: "How do I convert text to uppercase?",
        answer:
          "Paste your text into the input field and click the UPPERCASE button. Instantly converts all characters to capital letters. Works with all languages and special characters.",
      },
      {
        question: "What case formats are supported?",
        answer:
          "The tool supports: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and dot.case. One click converts to any format.",
      },
      {
        question: "What is the difference between camelCase and PascalCase?",
        answer:
          "camelCase starts with a lowercase letter (firstName). PascalCase starts with an uppercase letter (FirstName). camelCase is standard for JavaScript variables, while PascalCase is used for class names and React components.",
      },
    ],
    content: [
      {
        heading: "How to Convert Text Case Online",
        body: "Type or paste your text into the input area. Click any of the conversion buttons to transform your text instantly. Convert between UPPERCASE, lowercase, Title Case, Sentence case, and programming cases like camelCase, snake_case, and kebab-case. The result is ready to copy with one click.",
      },
      {
        heading: "Text Case Conventions in Programming",
        body: "Different programming languages use different naming conventions: camelCase for JavaScript variables, PascalCase for classes and React components, snake_case for Python and Ruby, kebab-case for CSS classes and URLs, and CONSTANT_CASE for constants. Following the correct convention improves code readability.",
      },
    ],
  },

  "slug-generator": {
    seoTitle: "URL Slug Generator Online Free — SEO-Friendly Permalinks",
    seoDescription:
      "Generate clean, SEO-friendly URL slugs from any text. Removes special characters, converts spaces to hyphens. Free slug generator.",
    faqs: [
      {
        question: "What is a URL slug?",
        answer:
          "A URL slug is the human-readable part of a URL that identifies a page. For example, in toolspilot.dev/tools/slug-generator, 'slug-generator' is the slug. Good slugs are lowercase, use hyphens, and contain relevant keywords.",
      },
      {
        question: "How do I create an SEO-friendly slug?",
        answer:
          "Enter your page title or text and the generator creates a clean slug automatically. It converts to lowercase, replaces spaces with hyphens, removes special characters, and trims unnecessary words.",
      },
      {
        question: "Do URL slugs affect SEO?",
        answer:
          "Yes. Google uses URL slugs as a ranking signal. Descriptive, keyword-rich slugs help search engines understand page content. Short, clean slugs also improve click-through rates in search results.",
      },
    ],
    content: [
      {
        heading: "How to Generate URL Slugs",
        body: "Enter any text — an article title, product name, or page heading — and the tool generates a clean URL slug. Special characters are removed, spaces become hyphens, and everything is converted to lowercase. The result follows URL and SEO best practices.",
      },
      {
        heading: "URL Slug Best Practices for SEO",
        body: "Keep slugs short (3–5 words), include your target keyword, use hyphens (not underscores), avoid stop words (the, a, an, in), use only lowercase letters, and avoid numbers unless they're meaningful. Example: 'Best Practices for URL Slugs in 2026' → 'url-slug-best-practices'.",
      },
    ],
  },

  "lorem-ipsum-generator": {
    seoTitle: "Lorem Ipsum Generator Online Free — Placeholder Text Generator",
    seoDescription:
      "Generate Lorem Ipsum placeholder text in paragraphs, sentences, or words. Free dummy text generator for designs, mockups and prototypes.",
    faqs: [
      {
        question: "What is Lorem Ipsum?",
        answer:
          "Lorem Ipsum is standard placeholder text used in design and publishing since the 1500s. It mimics the look of natural language without being readable, allowing designers to focus on layout without being distracted by content.",
      },
      {
        question: "How do I generate Lorem Ipsum text?",
        answer:
          "Choose the number of paragraphs, sentences, or words you need and click Generate. The placeholder text is generated instantly and ready to copy into your design mockups, prototypes, or templates.",
      },
      {
        question: "Is Lorem Ipsum real Latin?",
        answer:
          "Lorem Ipsum is derived from a work by Cicero written in 45 BC, but it has been altered and scrambled so much that it is not meaningful Latin. It's been the industry's standard dummy text for over 500 years.",
      },
    ],
    content: [
      {
        heading: "How to Generate Lorem Ipsum Text",
        body: "Select your desired output format — paragraphs, sentences, or words — and specify the quantity. Click Generate to create placeholder text instantly. The text follows standard Lorem Ipsum patterns that provide realistic text flow for design previews.",
      },
      {
        heading: "When to Use Placeholder Text",
        body: "Lorem Ipsum is used during the design phase when final content isn't ready. It helps visualize how text will look in layouts, test font choices, check line spacing, and present design concepts to clients without the distraction of meaningful content.",
      },
    ],
  },

  "text-diff": {
    seoTitle: "Text Diff Tool Online Free — Compare Text Side by Side",
    seoDescription:
      "Compare two texts and see differences highlighted side by side. Added, removed and changed lines shown clearly. Free online diff tool.",
    faqs: [
      {
        question: "How do I compare two texts online?",
        answer:
          "Paste the original text in the left panel and the modified text in the right panel. The tool highlights all differences — added lines in green, removed lines in red, and changed portions within lines.",
      },
      {
        question: "Can I compare code with this tool?",
        answer:
          "Yes. The diff tool works with any plain text including source code, configuration files, documentation, and data files. It identifies changes at the line level and highlights specific character differences.",
      },
      {
        question: "What is a diff?",
        answer:
          "A diff (short for difference) is a comparison between two versions of text showing what was added, removed, or changed. Diffs are fundamental to version control systems like Git and are used in code review processes.",
      },
    ],
    content: [
      {
        heading: "How to Compare Text Online",
        body: "Paste the first text (original) in the left editor and the second text (modified) in the right editor. The tool instantly computes the difference and highlights all changes. Green highlights show additions, red highlights show deletions, and yellow marks show modifications within changed lines.",
      },
      {
        heading: "Text Comparison Use Cases",
        body: "Compare code versions before committing, check document revisions, verify configuration changes, compare API responses, or find differences between any two versions of text. This tool is essential for code review, debugging, and content editing workflows.",
      },
    ],
  },

  "line-sorter": {
    seoTitle: "Line Sorter & Deduplicator Online Free — Sort and Remove Duplicates",
    seoDescription:
      "Sort lines alphabetically, numerically, by length, remove duplicates, reverse or shuffle. Free online text line sorter tool.",
    faqs: [
      {
        question: "How do I sort lines of text online?",
        answer:
          "Paste your text with one item per line. Choose your sort method (alphabetical, numerical, by length, or reverse) and click Sort. You can also remove duplicate lines and shuffle randomly.",
      },
      {
        question: "Can I remove duplicate lines?",
        answer:
          "Yes. Click the Remove Duplicates button to eliminate all duplicate lines from your text, keeping only unique entries. This is useful for cleaning up lists, email addresses, and data sets.",
      },
      {
        question: "Does it support case-insensitive sorting?",
        answer:
          "Yes. Toggle case-insensitive mode to sort lines without regard to uppercase/lowercase. 'Apple', 'apple', and 'APPLE' will be treated as identical for sorting purposes.",
      },
    ],
    content: [
      {
        heading: "How to Sort and Deduplicate Lines",
        body: "Paste your text with one item per line into the input area. Choose your sort method: alphabetical (A-Z or Z-A), numerical, by line length, or random shuffle. Use the Deduplicate option to remove duplicate lines. The result is ready to copy with one click.",
      },
      {
        heading: "Common Use Cases",
        body: "Clean up CSV data, sort lists of names or emails, remove duplicate entries from log files, alphabetize glossaries or word lists, randomize quiz questions, and sort configuration entries. The tool handles thousands of lines efficiently.",
      },
    ],
  },

  "password-generator": {
    seoTitle: "Password Generator Online Free — Strong & Secure Passwords",
    seoDescription:
      "Generate strong, random passwords with customizable length and characters. Includes uppercase, lowercase, numbers, symbols. Free and private.",
    faqs: [
      {
        question: "How do I generate a secure password?",
        answer:
          "Set your desired length (16+ characters recommended), select character types (uppercase, lowercase, numbers, symbols), and click Generate. The password is created using cryptographic randomness in your browser.",
      },
      {
        question: "What makes a password strong?",
        answer:
          "A strong password is at least 16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. Avoid common words, personal information, and sequential patterns.",
      },
      {
        question: "Is the generated password stored anywhere?",
        answer:
          "No. Passwords are generated entirely in your browser using the Web Crypto API. Nothing is sent to any server, stored, or logged. Close the tab and the password exists only where you've saved it.",
      },
    ],
    content: [
      {
        heading: "How to Generate Strong Passwords",
        body: "Choose your password length (16 characters minimum recommended), select which character types to include, and click Generate. Each password is created using the Web Crypto API for true cryptographic randomness. Generate multiple passwords at once and copy your preferred choice.",
      },
      {
        heading: "Password Security Best Practices",
        body: "Use a unique password for every account. Make passwords at least 16 characters long. Include all character types. Use a password manager to store them securely. Enable two-factor authentication wherever possible. Never reuse passwords across sites.",
      },
    ],
    howTo: [
      { name: "Set password length", text: "Choose your desired password length — 16 characters or more is recommended." },
      { name: "Select character types", text: "Enable uppercase, lowercase, numbers, and symbols for maximum strength." },
      { name: "Generate password", text: "Click Generate to create a cryptographically random password." },
      { name: "Copy and save", text: "Click Copy and store the password in your password manager." },
    ],
  },

  // ─── Calculators ─────────────────────────────────
  "percentage-calculator": {
    seoTitle: "Percentage Calculator Online Free — Calculate Any Percentage",
    seoDescription:
      "Calculate percentages instantly: what is X% of Y, percentage change, increase and decrease. Free online percentage calculator.",
    faqs: [
      {
        question: "How do I calculate a percentage?",
        answer:
          "Enter the percentage and the number. For example, to find 20% of 150, enter 20 as the percentage and 150 as the number. The result (30) appears instantly.",
      },
      {
        question: "How do I calculate percentage change?",
        answer:
          "Enter the original value and the new value. The calculator shows the percentage increase or decrease. For example, from 100 to 130 is a 30% increase.",
      },
      {
        question: "What is the percentage formula?",
        answer:
          "Percentage = (Part / Whole) × 100. To find X% of Y: Result = (X / 100) × Y. Percentage change = ((New - Old) / |Old|) × 100.",
      },
    ],
    content: [
      {
        heading: "How to Calculate Percentages Online",
        body: "Choose your calculation mode: 'What is X% of Y?' for basic percentage, 'X is what % of Y?' for finding the percentage, '% Change' for comparing two values, or 'Increase/Decrease by %' for adjusting values. Enter your numbers and get results instantly.",
      },
      {
        heading: "Common Percentage Calculations",
        body: "Sales tax: multiply price by tax rate percentage. Discounts: subtract the percentage of the original price. Tips: multiply bill by tip percentage. Grade percentages: divide score by total possible points and multiply by 100.",
      },
    ],
    howTo: [
      { name: "Choose calculation mode", text: "Select the type of percentage calculation you need from the five available modes." },
      { name: "Enter your numbers", text: "Type in the values for your calculation in the input fields." },
      { name: "Read the result", text: "The percentage result appears instantly below the input fields." },
    ],
  },

  "age-calculator": {
    seoTitle: "Age Calculator Online Free — Calculate Exact Age from Birthday",
    seoDescription:
      "Calculate your exact age in years, months, and days from your date of birth. Next birthday countdown included. Free online age calculator.",
    faqs: [
      {
        question: "How do I calculate my exact age?",
        answer:
          "Enter your date of birth and the calculator instantly shows your age in years, months, and days, plus total days lived and days until your next birthday.",
      },
      {
        question: "How many days have I been alive?",
        answer:
          "Enter your birthday and see the total number of days you've been alive. The calculator accounts for leap years and varying month lengths.",
      },
    ],
    content: [
      {
        heading: "How to Calculate Your Age",
        body: "Select your date of birth using the date picker. The calculator instantly computes your exact age broken down into years, months, and days. It also shows the total number of days you've lived and how many days remain until your next birthday.",
      },
    ],
    howTo: [
      { name: "Enter your birthday", text: "Use the date picker to select your date of birth." },
      { name: "View your exact age", text: "See your age displayed in years, months, and days." },
      { name: "Check birthday countdown", text: "See how many days until your next birthday." },
    ],
  },

  "tip-calculator": {
    seoTitle: "Tip Calculator Online Free — Calculate Tips & Split Bills",
    seoDescription:
      "Calculate tips and split bills easily. Choose tip percentage, split between friends, see per-person totals. Free tip calculator.",
    faqs: [
      {
        question: "How do I calculate a tip?",
        answer:
          "Enter your bill amount and select a tip percentage (10%, 15%, 18%, 20%, or 25%). The calculator shows the tip amount and total. Optionally split the bill between multiple people.",
      },
      {
        question: "What is a good tip percentage?",
        answer:
          "In the US, 15-20% is standard for restaurant service. 15% for adequate service, 18% for good service, and 20%+ for excellent service. Some regions and countries have different tipping customs.",
      },
    ],
    content: [
      {
        heading: "How to Calculate a Tip",
        body: "Enter your bill amount, select or adjust the tip percentage using the preset buttons or slider, and optionally set the number of people splitting the bill. The calculator instantly shows the tip amount, total bill, and per-person costs.",
      },
    ],
    howTo: [
      { name: "Enter bill amount", text: "Type in the total bill amount in dollars." },
      { name: "Choose tip percentage", text: "Select a preset (10-25%) or use the slider for custom amounts." },
      { name: "Split the bill", text: "Set the number of people to see per-person costs." },
    ],
  },

  "bmi-calculator": {
    seoTitle: "BMI Calculator Online Free — Body Mass Index Calculator",
    seoDescription:
      "Calculate your Body Mass Index (BMI) with metric or imperial units. See your BMI category instantly. Free online BMI calculator.",
    faqs: [
      {
        question: "How do I calculate my BMI?",
        answer:
          "Enter your weight and height. The calculator divides your weight in kilograms by your height in meters squared (kg/m²). A BMI of 18.5-24.9 is considered normal weight.",
      },
      {
        question: "What is a healthy BMI?",
        answer:
          "A BMI between 18.5 and 24.9 is considered normal weight. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is classified as obese. BMI is a screening tool, not a diagnostic measure.",
      },
    ],
    content: [
      {
        heading: "How to Calculate BMI",
        body: "Choose metric (kg/cm) or imperial (lbs/ft) units. Enter your weight and height. The calculator instantly computes your BMI and shows which category you fall into: underweight, normal weight, overweight, or obese.",
      },
      {
        heading: "Understanding BMI Categories",
        body: "BMI is calculated as weight divided by height squared. While useful as a quick health screening tool, BMI doesn't account for muscle mass, bone density, or body composition. Athletes may have a high BMI due to muscle mass. Consult a healthcare provider for personalized health assessments.",
      },
    ],
    howTo: [
      { name: "Select units", text: "Choose between metric (kg/cm) or imperial (lbs/ft) measurement." },
      { name: "Enter weight and height", text: "Input your weight and height in the chosen unit system." },
      { name: "Read your BMI", text: "View your BMI score and weight category instantly." },
    ],
  },

  "countdown-timer": {
    seoTitle: "Countdown Timer Online Free — Count Down to Any Date",
    seoDescription:
      "Create a live countdown to any date and time. See days, hours, minutes, and seconds remaining. Free online countdown timer.",
    faqs: [
      {
        question: "How do I create a countdown?",
        answer:
          "Enter a target date and optional time, and the countdown starts immediately showing days, hours, minutes, and seconds remaining in real time.",
      },
      {
        question: "Does the countdown update in real time?",
        answer:
          "Yes. The countdown updates every second, showing a live count of days, hours, minutes, and seconds. It works even for past dates, showing elapsed time.",
      },
    ],
    content: [
      {
        heading: "How to Use the Countdown Timer",
        body: "Set your target date and time, optionally add an event name, and watch the live countdown. The timer shows days, hours, minutes, and seconds. If the date has passed, it shows elapsed time instead. Copy the countdown text to share with others.",
      },
    ],
    howTo: [
      { name: "Set the target date", text: "Use the date picker to choose when to count down to." },
      { name: "Add a time (optional)", text: "Set a specific time for precise countdowns." },
      { name: "Watch the live countdown", text: "The timer updates every second with days, hours, minutes, and seconds." },
    ],
  },

  "random-number-generator": {
    seoTitle: "Random Number Generator Online Free — True Random Numbers",
    seoDescription:
      "Generate cryptographically random numbers with custom range and count. No duplicates option. Free online random number generator.",
    faqs: [
      {
        question: "How does the random number generator work?",
        answer:
          "It uses the Web Crypto API (crypto.getRandomValues) to generate true cryptographic randomness directly in your browser. This is more secure than Math.random().",
      },
      {
        question: "Can I generate random numbers without duplicates?",
        answer:
          "Yes. Uncheck the 'Allow duplicates' option to ensure every generated number is unique within your set. The count will be limited to the size of your range.",
      },
    ],
    content: [
      {
        heading: "How to Generate Random Numbers",
        body: "Set your minimum and maximum values, choose how many numbers to generate, and click Generate. Use the 'Allow duplicates' toggle for lottery-style draws. Numbers are generated using cryptographic randomness for true unpredictability.",
      },
    ],
    howTo: [
      { name: "Set the range", text: "Enter minimum and maximum values for your random numbers." },
      { name: "Choose count", text: "Set how many random numbers you want to generate." },
      { name: "Click Generate", text: "Press Generate to create random numbers using the Web Crypto API." },
    ],
  },

  "text-repeater": {
    seoTitle: "Text Repeater Online Free — Repeat Text Multiple Times",
    seoDescription:
      "Repeat any text multiple times with custom separator. New line, space, comma or no separator. Free online text repeater tool.",
    faqs: [
      {
        question: "How do I repeat text multiple times?",
        answer:
          "Type or paste your text, set the number of repetitions (up to 10,000), choose a separator (new line, space, comma, or none), and the repeated text appears instantly.",
      },
    ],
    content: [
      {
        heading: "How to Repeat Text Online",
        body: "Enter the text you want to repeat, set the repeat count, and choose your separator. The result updates in real time. Useful for generating test data, creating social media content, filling placeholder text, or repeating patterns for code testing.",
      },
    ],
  },

  "binary-translator": {
    seoTitle: "Binary Translator Online Free — Text to Binary, Hex, Octal",
    seoDescription:
      "Convert text to binary, hexadecimal, or octal code and back. Free online binary translator with instant conversion.",
    faqs: [
      {
        question: "How do I convert text to binary?",
        answer:
          "Type or paste your text and the tool instantly converts each character to its 8-bit binary representation. Switch to Hex or Octal mode for those encodings.",
      },
      {
        question: "How do I convert binary back to text?",
        answer:
          "Switch to decode mode, paste binary digits separated by spaces (e.g., 01001000 01101001), and the tool converts them back to readable text.",
      },
    ],
    content: [
      {
        heading: "How to Translate Text to Binary",
        body: "Select your encoding format (binary, hexadecimal, or octal) and direction (encode or decode). Enter your input and the translation appears instantly. Binary uses base-2 (0s and 1s), hex uses base-16 (0-F), and octal uses base-8 (0-7).",
      },
    ],
    howTo: [
      { name: "Choose encoding", text: "Select binary, hexadecimal, or octal encoding format." },
      { name: "Select direction", text: "Choose Text → Code to encode or Code → Text to decode." },
      { name: "Enter input", text: "Type text or paste encoded values and see the result instantly." },
    ],
  },

  "morse-code-translator": {
    seoTitle: "Morse Code Translator Online Free — Text to Morse Code",
    seoDescription:
      "Translate text to Morse code and Morse code to text instantly. Supports letters, numbers, and punctuation. Free online translator.",
    faqs: [
      {
        question: "How do I convert text to Morse code?",
        answer:
          "Type or paste your text and the tool instantly converts each character to its Morse code equivalent using dots (.) and dashes (-). Words are separated by forward slashes (/).",
      },
      {
        question: "How do I read Morse code?",
        answer:
          "In Morse code, each letter is represented by dots and dashes. Letters are separated by spaces, words by slashes. For example, SOS is ... --- ... (three dots, three dashes, three dots).",
      },
    ],
    content: [
      {
        heading: "How to Use the Morse Code Translator",
        body: "Choose encode (Text → Morse) or decode (Morse → Text) mode. Enter your text to see the Morse code equivalent, or paste Morse code with spaces between letters and slashes between words. The translator supports all 26 letters, numbers 0-9, and common punctuation.",
      },
    ],
    howTo: [
      { name: "Choose direction", text: "Select Text → Morse to encode or Morse → Text to decode." },
      { name: "Enter your text", text: "Type a message to see its Morse code, or paste Morse code to decode it." },
      { name: "Copy the result", text: "Click Copy to copy the translated output to your clipboard." },
    ],
  },

  "json-sorter": {
    seoTitle: "JSON Key Sorter Online Free — Sort JSON Keys Alphabetically",
    seoDescription:
      "Sort JSON object keys alphabetically (A-Z or Z-A) with deep sorting for nested objects and arrays. Free online JSON sorter.",
    faqs: [
      {
        question: "How do I sort JSON keys?",
        answer:
          "Paste your JSON into the input, choose ascending (A-Z) or descending (Z-A) order, and click Sort Keys. All keys are sorted recursively, including nested objects.",
      },
      {
        question: "Does it sort nested objects?",
        answer:
          "Yes. The sorter recursively sorts keys at every level of nesting. Objects inside arrays are also sorted. Array order is preserved since arrays are ordered by index.",
      },
    ],
    content: [
      {
        heading: "How to Sort JSON Keys Online",
        body: "Paste your JSON data into the editor, select your sort direction (A-Z or Z-A), and click Sort Keys. The tool validates your JSON, sorts all object keys recursively at every nesting level, and outputs clean, formatted JSON ready to copy.",
      },
    ],
    howTo: [
      { name: "Paste your JSON", text: "Enter or paste JSON data into the input field." },
      { name: "Choose sort order", text: "Select A → Z for ascending or Z → A for descending key order." },
      { name: "Click Sort Keys", text: "Press the Sort Keys button to sort all keys recursively." },
    ],
  },

  // ─── Batch 3: 25 New Tools ──────────────────────

  "qr-code-generator": {
    seoTitle: "Free QR Code Generator Online — Create QR Codes Instantly",
    seoDescription: "Generate QR codes from any text or URL. Download as SVG or PNG. Free, private, no sign-up required.",
    faqs: [
      { question: "How do I generate a QR code?", answer: "Type or paste text/URL in the input field. The QR code generates instantly. Click Download SVG or Download PNG to save it." },
      { question: "What can I encode in a QR code?", answer: "URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, and more. Any text up to a few thousand characters works." },
      { question: "Is it free?", answer: "Yes. The tool runs entirely in your browser — no data is sent to any server, and there are no limits." },
    ],
    content: [
      { heading: "Create QR Codes Online", body: "Generate QR codes from any text or URL instantly. The tool supports Version 1 through 10 QR codes with byte-mode encoding and low error correction. Download your code as lossless SVG or raster PNG." },
    ],
    howTo: [
      { name: "Enter text or URL", text: "Type or paste the content you want to encode into the input field." },
      { name: "Preview QR code", text: "The QR code generates automatically as you type." },
      { name: "Download", text: "Click Download SVG or Download PNG to save the QR code." },
    ],
  },

  "image-compressor": {
    seoTitle: "Free Image Compressor Online — Reduce Image File Size",
    seoDescription: "Compress images online for free. Adjust quality, choose output format, and resize. JPEG, PNG, WebP supported.",
    faqs: [
      { question: "How does image compression work?", answer: "The tool uses your browser's Canvas API to re-encode the image at a lower quality level, reducing file size while preserving visual quality." },
      { question: "Which formats are supported?", answer: "You can output JPEG, WebP, or PNG. WebP typically gives the best compression ratio." },
      { question: "Is my image uploaded anywhere?", answer: "No. All processing happens in your browser. Your images never leave your device." },
    ],
    content: [
      { heading: "Compress Images Online", body: "Reduce image file sizes without sacrificing quality. Upload any image, adjust the quality slider, pick an output format, and optionally resize. Everything runs locally in your browser for full privacy." },
    ],
    howTo: [
      { name: "Upload image", text: "Click Choose File or drag and drop an image." },
      { name: "Adjust settings", text: "Set quality level, output format, and optional maximum width." },
      { name: "Download", text: "Click Download Compressed Image to save the result." },
    ],
  },

  "unit-converter": {
    seoTitle: "Free Unit Converter Online — Length, Weight, Temperature & More",
    seoDescription: "Convert between units of length, weight, temperature, speed, data, time, and area. Fast, free, and accurate.",
    faqs: [
      { question: "What categories can I convert?", answer: "Length, weight, temperature, speed, digital data, time, and area — 7 categories with dozens of units each." },
      { question: "How accurate are the conversions?", answer: "Conversions use precise mathematical formulas. Temperature conversions handle Celsius, Fahrenheit, and Kelvin correctly." },
    ],
    content: [
      { heading: "Universal Unit Converter", body: "Convert between metric, imperial, and other unit systems. Select a category, enter a value, and see all conversions at once. Supports length (km, miles, feet), weight (kg, lbs, oz), temperature (°C, °F, K), and more." },
    ],
    howTo: [
      { name: "Select category", text: "Choose from length, weight, temperature, speed, data, time, or area." },
      { name: "Enter value", text: "Type a number and select the source unit." },
      { name: "Read results", text: "All equivalent values in other units appear instantly." },
    ],
  },

  "stopwatch": {
    seoTitle: "Free Online Stopwatch — Millisecond Accuracy with Lap Tracking",
    seoDescription: "Free online stopwatch with lap tracking. Accurate to milliseconds. Start, stop, lap, and reset instantly.",
    faqs: [
      { question: "How accurate is this stopwatch?", answer: "It uses requestAnimationFrame for smooth updates. Display accuracy is to the millisecond, limited only by your browser's timer resolution." },
      { question: "Can I track laps?", answer: "Yes. Click the Lap button while the stopwatch is running to record split times. All laps are displayed in a list." },
    ],
    content: [
      { heading: "Online Stopwatch with Laps", body: "A precise online stopwatch with lap tracking. Click Start to begin timing, Lap to record splits, and Stop to pause. All timing runs locally in your browser." },
    ],
    howTo: [
      { name: "Start timing", text: "Click the Start button to begin the stopwatch." },
      { name: "Record laps", text: "Click Lap to capture split times while running." },
      { name: "Stop and reset", text: "Click Stop to pause, then Reset to clear." },
    ],
  },

  "loan-calculator": {
    seoTitle: "Free Loan Calculator Online — Monthly Payments & Amortization",
    seoDescription: "Calculate monthly loan payments, total interest, and view a full amortization schedule. Mortgage, auto, personal loans.",
    faqs: [
      { question: "How is the monthly payment calculated?", answer: "Using the standard amortization formula: M = P × r(1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly rate, and n is number of payments." },
      { question: "Can I see the amortization schedule?", answer: "Yes. Click 'Show Amortization Schedule' to see a month-by-month breakdown of principal, interest, and remaining balance." },
      { question: "Does it work for mortgages?", answer: "Yes. Enter your home loan amount, interest rate, and term (e.g., 30 years) to see your monthly mortgage payment." },
    ],
    content: [
      { heading: "Loan & Mortgage Calculator", body: "Calculate monthly payments for any loan. Enter the loan amount, annual interest rate, and term in years. See your monthly payment, total cost, total interest, and a full month-by-month amortization schedule." },
    ],
    howTo: [
      { name: "Enter loan details", text: "Input the loan amount, annual interest rate, and term in years." },
      { name: "View results", text: "Monthly payment, total payment, and total interest are calculated instantly." },
      { name: "View schedule", text: "Click Show Amortization Schedule for a month-by-month breakdown." },
    ],
  },

  "color-palette-generator": {
    seoTitle: "Free Color Palette Generator — Harmony-Based Color Schemes",
    seoDescription: "Generate beautiful color palettes using color harmony rules. Complementary, analogous, triadic, tetradic, and monochromatic.",
    faqs: [
      { question: "What color harmonies are available?", answer: "Complementary, analogous, triadic, split-complementary, tetradic, and monochromatic — 6 harmony types based on color theory." },
      { question: "How do I copy a color?", answer: "Click any color swatch to copy its HEX code to your clipboard. You can also see HSL values in the table below." },
    ],
    content: [
      { heading: "Generate Color Palettes", body: "Pick a base color and choose a harmony type to generate a cohesive color palette. Uses color theory principles to create visually pleasing combinations. Copy HEX and HSL values with a click." },
    ],
    howTo: [
      { name: "Pick base color", text: "Use the color picker or enter a HEX code." },
      { name: "Choose harmony", text: "Select a color harmony type (complementary, analogous, etc.)." },
      { name: "Copy colors", text: "Click any swatch to copy the HEX value to clipboard." },
    ],
  },

  "pomodoro-timer": {
    seoTitle: "Free Pomodoro Timer Online — Focus & Productivity Tool",
    seoDescription: "Free Pomodoro timer with 25/5 minute work-break cycles. Track focus sessions and boost productivity.",
    faqs: [
      { question: "What is the Pomodoro Technique?", answer: "A time management method where you work in focused 25-minute sessions (pomodoros), separated by 5-minute short breaks. After 4 pomodoros, take a longer 15-minute break." },
      { question: "Can I customize the timer?", answer: "The default times are 25 min work, 5 min short break, 15 min long break. Switch between modes at any time." },
    ],
    content: [
      { heading: "Pomodoro Timer for Productivity", body: "Stay focused with the Pomodoro Technique. Work in 25-minute sprints with 5-minute breaks. The timer tracks your completed sessions. A visual progress ring shows time remaining." },
    ],
    howTo: [
      { name: "Select mode", text: "Choose Focus (25 min), Short Break (5 min), or Long Break (15 min)." },
      { name: "Start timer", text: "Click Start to begin the countdown." },
      { name: "Track sessions", text: "Completed focus sessions are counted automatically." },
    ],
  },

  "roman-numeral-converter": {
    seoTitle: "Roman Numeral Converter — Decimal to Roman & Roman to Decimal",
    seoDescription: "Convert between Roman numerals and decimal numbers. Bidirectional with a reference table. Free online tool.",
    faqs: [
      { question: "What range is supported?", answer: "Standard Roman numerals from 1 to 3999 (I to MMMCMXCIX). Numbers outside this range are not representable in standard Roman notation." },
      { question: "Does it validate Roman numerals?", answer: "Yes. The converter checks that the Roman numeral follows correct notation rules (e.g., no IIII) by round-tripping through decimal." },
    ],
    content: [
      { heading: "Convert Roman Numerals", body: "Type a decimal number to see its Roman representation, or enter a Roman numeral to get the decimal value. Both fields update in real-time. Includes a reference table for all basic Roman numeral symbols." },
    ],
    howTo: [
      { name: "Enter a number", text: "Type a decimal number (1-3999) or a Roman numeral." },
      { name: "See conversion", text: "The opposite field updates automatically." },
      { name: "Use reference", text: "Refer to the table below for Roman numeral values." },
    ],
  },

  "js-beautifier-minifier": {
    seoTitle: "Free JS Beautifier & Minifier Online — Format or Compress JavaScript",
    seoDescription: "Beautify or minify JavaScript online. Format messy code or compress for production. Free developer tool.",
    faqs: [
      { question: "What does Beautify do?", answer: "Beautify reformats your JavaScript with proper indentation, line breaks, and spacing, making it readable and maintainable." },
      { question: "What does Minify do?", answer: "Minify removes comments and unnecessary whitespace to reduce file size, ideal for production deployment." },
    ],
    content: [
      { heading: "JavaScript Beautifier & Minifier", body: "Paste JavaScript code and choose between Beautify (format for readability) or Minify (compress for production). The beautifier uses Prettier-style formatting." },
    ],
    howTo: [
      { name: "Paste JavaScript", text: "Enter your JavaScript code in the input area." },
      { name: "Choose mode", text: "Select Beautify to format or Minify to compress." },
      { name: "Process and copy", text: "Click the button, then copy the result." },
    ],
  },

  "sql-formatter": {
    seoTitle: "Free SQL Formatter Online — Beautify SQL Queries",
    seoDescription: "Format and beautify SQL queries online. Auto-indent, uppercase keywords, and clean up messy SQL. Free tool.",
    faqs: [
      { question: "Which SQL dialects are supported?", answer: "The formatter works with standard SQL syntax and is compatible with MySQL, PostgreSQL, SQLite, SQL Server, and most other SQL dialects." },
      { question: "Does it uppercase keywords?", answer: "Yes. By default, SQL keywords like SELECT, FROM, WHERE are uppercased. You can toggle this option off." },
    ],
    content: [
      { heading: "SQL Query Formatter", body: "Paste messy SQL and get clean, formatted output. Major clauses go on new lines, keywords are uppercased, and conditions are properly indented. Works with SELECT, INSERT, UPDATE, DELETE, and CREATE statements." },
    ],
    howTo: [
      { name: "Paste SQL", text: "Enter your SQL query in the input area." },
      { name: "Configure options", text: "Toggle uppercase keywords on or off." },
      { name: "Copy result", text: "The formatted SQL appears in real-time. Click Copy to save." },
    ],
  },

  "cron-expression-parser": {
    seoTitle: "Free Cron Expression Parser — Explain Cron Jobs in Plain English",
    seoDescription: "Parse cron expressions into human-readable descriptions. See next 5 run times. Free cron job tool.",
    faqs: [
      { question: "What is a cron expression?", answer: "A cron expression is a 5-field time specification (minute, hour, day-of-month, month, day-of-week) used to schedule recurring tasks on Unix-like systems." },
      { question: "What do the 5 fields mean?", answer: "From left to right: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-6, 0=Sunday)." },
    ],
    content: [
      { heading: "Understand Cron Expressions", body: "Enter a 5-field cron expression to see a human-readable description and the next 5 scheduled run times. Use presets for common schedules. Each field is explained visually." },
    ],
    howTo: [
      { name: "Enter cron expression", text: "Type a 5-field cron expression or select a preset." },
      { name: "Read description", text: "See a plain-English explanation of the schedule." },
      { name: "Check next runs", text: "View the next 5 calculated run times." },
    ],
  },

  "json-to-typescript": {
    seoTitle: "Free JSON to TypeScript Converter — Generate Interfaces Online",
    seoDescription: "Convert JSON to TypeScript interfaces instantly. Auto-detect types from JSON data. Free developer tool.",
    faqs: [
      { question: "How does it work?", answer: "Paste JSON data and the tool analyzes the structure, generating TypeScript interfaces with correct types for strings, numbers, booleans, arrays, and nested objects." },
      { question: "Does it handle nested objects?", answer: "Yes. Nested objects generate separate interfaces that reference each other." },
    ],
    content: [
      { heading: "JSON to TypeScript Interface Generator", body: "Paste any JSON object and get TypeScript interfaces generated automatically. The tool handles nested objects, arrays, and all primitive types. Customize the root interface name." },
    ],
    howTo: [
      { name: "Paste JSON", text: "Enter your JSON data in the left panel." },
      { name: "Set root name", text: "Optionally change the root interface name from 'Root'." },
      { name: "Copy TypeScript", text: "The TypeScript interfaces appear instantly on the right. Click Copy." },
    ],
  },

  "html-to-markdown": {
    seoTitle: "Free HTML to Markdown Converter Online",
    seoDescription: "Convert HTML to clean Markdown. Handles headings, links, lists, bold, italic, images, and code blocks.",
    faqs: [
      { question: "What HTML elements are supported?", answer: "Headings (h1-h6), paragraphs, bold, italic, links, images, ordered and unordered lists, code blocks, blockquotes, and horizontal rules." },
      { question: "Does it handle complex HTML?", answer: "The converter handles most common HTML patterns. Very complex or nested HTML may need minor manual adjustments." },
    ],
    content: [
      { heading: "Convert HTML to Markdown", body: "Paste HTML on the left and get clean Markdown on the right. The converter handles headings, formatting, links, images, lists, code blocks, and more. Great for migrating content to Markdown-based platforms." },
    ],
    howTo: [
      { name: "Paste HTML", text: "Enter your HTML code in the left panel." },
      { name: "Review Markdown", text: "The converted Markdown appears instantly on the right." },
      { name: "Copy result", text: "Click Copy to save the Markdown to clipboard." },
    ],
  },

  "px-to-rem-converter": {
    seoTitle: "Free PX to REM Converter — Pixel to REM Calculator",
    seoDescription: "Convert pixels to REM and REM to pixels instantly. Custom base font size. Reference table included. Free CSS tool.",
    faqs: [
      { question: "What is a REM unit?", answer: "REM stands for 'root em'. It's a CSS unit relative to the root element's font size. If the root is 16px, then 1rem = 16px." },
      { question: "What base size should I use?", answer: "The default browser font size is 16px, which is the most common base. Change the base if your project uses a different root font size." },
    ],
    content: [
      { heading: "PX to REM Converter", body: "Convert between pixels and REM units for responsive CSS. Set your base font size, enter a value, and see the conversion instantly. Includes a reference table with common pixel sizes and their REM equivalents." },
    ],
    howTo: [
      { name: "Set base size", text: "Enter your root font size in pixels (default: 16px)." },
      { name: "Enter value", text: "Type a pixel or REM value to convert." },
      { name: "Use reference table", text: "See common PX-to-REM conversions at the bottom." },
    ],
  },

  "json-path-tester": {
    seoTitle: "Free JSONPath Tester Online — Query JSON Data with Paths",
    seoDescription: "Test JSONPath expressions against JSON data in real-time. See matched values and paths. Free developer tool.",
    faqs: [
      { question: "What is JSONPath?", answer: "JSONPath is a query language for JSON, similar to XPath for XML. It lets you select specific values from complex JSON structures using path expressions like $.store.books[*].title." },
      { question: "What expressions are supported?", answer: "Dot notation ($.key), bracket notation ($['key']), array access ([0]), and wildcards ([*]) are all supported." },
    ],
    content: [
      { heading: "JSONPath Expression Tester", body: "Enter JSON data and a JSONPath expression to find matching values. Results show the full path and value of each match. Supports dot notation, array indexing, and wildcards." },
    ],
    howTo: [
      { name: "Enter JSON", text: "Paste your JSON data in the input area." },
      { name: "Write path expression", text: "Enter a JSONPath expression like $.store.books[*].title." },
      { name: "View matches", text: "Matching values and their paths appear in real-time." },
    ],
  },

  "find-and-replace": {
    seoTitle: "Free Find and Replace Text Online — Regex Support",
    seoDescription: "Find and replace text with regex support, case sensitivity, and whole word matching. Free text tool.",
    faqs: [
      { question: "Does it support regular expressions?", answer: "Yes. Enable the 'Use regex' option to use full JavaScript regular expression syntax in your search pattern." },
      { question: "Is it case sensitive?", answer: "By default, searches are case-insensitive. Toggle 'Case sensitive' for exact matching." },
    ],
    content: [
      { heading: "Find and Replace Text", body: "A powerful text find-and-replace tool. Enter search and replacement text, paste your content, and see all matches replaced instantly. Supports regex, case sensitivity, and whole word matching." },
    ],
    howTo: [
      { name: "Enter search terms", text: "Type what to find and what to replace it with." },
      { name: "Configure options", text: "Toggle case sensitivity, whole word, or regex mode." },
      { name: "Paste text", text: "Enter your text and see the replacements applied." },
    ],
  },

  "remove-line-breaks": {
    seoTitle: "Free Remove Line Breaks Online — Join Lines Tool",
    seoDescription: "Remove or convert line breaks. Join lines with commas, spaces, or merge into one line. Free text tool.",
    faqs: [
      { question: "What options are available?", answer: "Remove all line breaks, collapse to single spacing, double spacing, join with commas, or join with spaces." },
      { question: "Does it preserve content?", answer: "Yes. Only line breaks are modified. Your text content remains unchanged." },
    ],
    content: [
      { heading: "Remove Line Breaks Tool", body: "Clean up text by removing or converting line breaks. Choose from multiple modes: remove all, single line, double space, comma-separated, or space-separated. Live preview shows results instantly." },
    ],
    howTo: [
      { name: "Select mode", text: "Choose how to handle line breaks (remove, single, comma, etc.)." },
      { name: "Paste text", text: "Enter or paste your text with line breaks." },
      { name: "Copy result", text: "The processed text appears on the right. Click Copy." },
    ],
  },

  "text-to-ascii-art": {
    seoTitle: "Free Text to ASCII Art Generator Online",
    seoDescription: "Convert text to ASCII art banners. Generate large text art for READMEs, comments, and terminal displays.",
    faqs: [
      { question: "What characters are supported?", answer: "All uppercase letters (A-Z), digits (0-9), spaces, exclamation marks, and periods. Other characters display as spaces." },
      { question: "Can I use it in code comments?", answer: "Yes! Copy the ASCII art and paste it into code comments, README files, or terminal displays." },
    ],
    content: [
      { heading: "ASCII Art Text Generator", body: "Type text and see it rendered as large ASCII art using a block-character font. Great for README headers, code comments, terminal banners, and fun text displays." },
    ],
    howTo: [
      { name: "Type text", text: "Enter up to 30 characters of text." },
      { name: "Preview", text: "ASCII art renders instantly as you type." },
      { name: "Copy", text: "Click Copy to save the ASCII art to clipboard." },
    ],
  },

  "emoji-picker": {
    seoTitle: "Free Emoji Picker — Browse & Copy Emojis by Category",
    seoDescription: "Browse emojis by category and copy to clipboard with one click. Smileys, gestures, hearts, animals, food, and more.",
    faqs: [
      { question: "How do I copy an emoji?", answer: "Click any emoji to instantly copy it to your clipboard. A confirmation message appears briefly." },
      { question: "What categories are available?", answer: "Smileys, Gestures, Hearts, Animals, Food, Travel, Objects, and Symbols — covering hundreds of popular emojis." },
    ],
    content: [
      { heading: "Emoji Picker", body: "Browse and copy emojis organized by category. Click any emoji to copy it to your clipboard instantly. Filter by category or search to find the perfect emoji." },
    ],
    howTo: [
      { name: "Browse categories", text: "Click category buttons to browse emojis by type." },
      { name: "Click to copy", text: "Click any emoji to copy it to your clipboard." },
      { name: "Search", text: "Type a category name to filter emojis." },
    ],
  },

  "aspect-ratio-calculator": {
    seoTitle: "Free Aspect Ratio Calculator — Calculate & Scale Dimensions",
    seoDescription: "Calculate aspect ratio from width and height. Scale dimensions while maintaining the ratio. Common presets included.",
    faqs: [
      { question: "What is an aspect ratio?", answer: "An aspect ratio is the proportional relationship between width and height. Common ratios include 16:9 (widescreen), 4:3 (standard), and 1:1 (square)." },
      { question: "How does scaling work?", answer: "Enter a new width or height, and the other dimension is calculated automatically to maintain the original aspect ratio." },
    ],
    content: [
      { heading: "Aspect Ratio Calculator", body: "Enter width and height to find the simplified aspect ratio. Use the scaling section to resize while maintaining proportions. Includes presets for common ratios like 16:9, 4:3, and 1:1." },
    ],
    howTo: [
      { name: "Enter dimensions", text: "Type width and height values." },
      { name: "See ratio", text: "The simplified aspect ratio is calculated instantly." },
      { name: "Scale", text: "Enter a new width or height to see the scaled dimension." },
    ],
  },

  "meta-tag-generator": {
    seoTitle: "Free Meta Tag Generator — HTML Meta Tags for SEO",
    seoDescription: "Generate HTML meta tags for SEO including title, description, Open Graph, and Twitter Cards. Free SEO tool.",
    faqs: [
      { question: "What meta tags does it generate?", answer: "Title, description, keywords, author, robots, canonical URL, viewport, charset, Open Graph tags (og:title, og:description, og:image), and Twitter Card tags." },
      { question: "How long should my title be?", answer: "Aim for 50-60 characters. The tool shows a character counter to help you stay within the ideal length." },
      { question: "How long should my description be?", answer: "Aim for 150-160 characters. Longer descriptions may be truncated in search results." },
    ],
    content: [
      { heading: "Generate Meta Tags for SEO", body: "Create properly formatted HTML meta tags for search engine optimization. Enter your page title, description, and other details. Get complete meta tags including Open Graph and Twitter Card tags, ready to copy into your HTML." },
    ],
    howTo: [
      { name: "Fill in details", text: "Enter title, description, keywords, and other meta information." },
      { name: "Preview tags", text: "Generated HTML meta tags appear in real-time." },
      { name: "Copy tags", text: "Click Copy to save the meta tags to clipboard." },
    ],
  },

  "open-graph-preview": {
    seoTitle: "Free Open Graph Preview — See How Your Link Looks When Shared",
    seoDescription: "Preview how your page appears when shared on Facebook, Twitter/X, and LinkedIn. Generate OG tags. Free tool.",
    faqs: [
      { question: "What is Open Graph?", answer: "Open Graph is a protocol that controls how your page appears when shared on social media. It defines the title, description, image, and URL shown in link previews." },
      { question: "What platforms use Open Graph?", answer: "Facebook, LinkedIn, Twitter/X, Slack, Discord, WhatsApp, and many other platforms use Open Graph tags to generate link previews." },
    ],
    content: [
      { heading: "Open Graph Preview Tool", body: "See exactly how your page will look when shared on Facebook, Twitter/X, and LinkedIn. Enter your OG data and see live previews for each platform. Generate the HTML tags to copy into your site." },
    ],
    howTo: [
      { name: "Enter OG data", text: "Fill in title, description, URL, and image URL." },
      { name: "Preview", text: "See live previews for Facebook and Twitter." },
      { name: "Copy tags", text: "Copy the generated Open Graph HTML tags." },
    ],
  },

  "robots-txt-generator": {
    seoTitle: "Free Robots.txt Generator — Create Robots.txt for SEO",
    seoDescription: "Generate robots.txt files for your website. Control search engine crawling with allow/disallow rules and sitemap.",
    faqs: [
      { question: "What is robots.txt?", answer: "robots.txt is a file in your website's root that tells search engine crawlers which pages they can and cannot access. It's a key part of technical SEO." },
      { question: "Can I have multiple rules?", answer: "Yes. Add separate rules for different user-agents (e.g., Googlebot, Bingbot) with different allow/disallow paths." },
    ],
    content: [
      { heading: "Robots.txt Generator", body: "Generate properly formatted robots.txt files for your website. Configure user-agent rules, allow/disallow paths, sitemap URL, and crawl delay. Add multiple rule sets for different crawlers." },
    ],
    howTo: [
      { name: "Configure rules", text: "Set user-agent, allow, and disallow paths." },
      { name: "Add sitemap", text: "Enter your sitemap URL." },
      { name: "Copy robots.txt", text: "Copy the generated file and upload to your website root." },
    ],
  },

  "favicon-generator": {
    seoTitle: "Free Favicon Generator — Create Favicons from Text",
    seoDescription: "Generate custom favicons from text with customizable colors and shapes. Download as SVG or PNG. Free tool.",
    faqs: [
      { question: "What sizes are generated?", answer: "The tool generates a 64x64 SVG that scales to any size. You can download as SVG (scalable) or PNG (64x64)." },
      { question: "Can I use a logo instead of text?", answer: "This tool creates text-based favicons. Enter 1-3 characters to create a quick branded icon." },
    ],
    content: [
      { heading: "Create Custom Favicons", body: "Generate favicons from text with customizable background color, text color, and shape (circle, rounded square, or square). Preview at multiple sizes and download as SVG or PNG." },
    ],
    howTo: [
      { name: "Enter text", text: "Type 1-3 characters for your favicon." },
      { name: "Customize", text: "Choose background color, text color, and shape." },
      { name: "Download", text: "Click Download SVG or Download PNG." },
    ],
  },

  "data-size-converter": {
    seoTitle: "Free Data Size Converter — Bits, Bytes, KB, MB, GB, TB",
    seoDescription: "Convert between data sizes: bits, bytes, KB, MB, GB, TB. SI and binary (IEC) units. Transfer time calculator.",
    faqs: [
      { question: "What's the difference between KB and KiB?", answer: "KB (kilobyte) = 1000 bytes (SI/decimal). KiB (kibibyte) = 1024 bytes (binary/IEC). Operating systems and storage devices use different standards." },
      { question: "What does the transfer time show?", answer: "Enter a network speed in Mbps and the tool calculates how long it would take to transfer the specified amount of data." },
    ],
    content: [
      { heading: "Data Size Converter", body: "Convert between all common data size units including bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. Supports both SI (decimal) and IEC (binary) units. Includes a network transfer time calculator." },
    ],
    howTo: [
      { name: "Enter value", text: "Type a number and select the source unit." },
      { name: "Select target", text: "Choose the unit to convert to." },
      { name: "View all conversions", text: "See the full conversion table and transfer time." },
    ],
  },
};
