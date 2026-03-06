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
};
