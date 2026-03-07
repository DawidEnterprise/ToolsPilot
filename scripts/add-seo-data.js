const fs = require('fs');
const path = require('path').join(__dirname, '..', 'src', 'lib', 'seo-data.ts');
let content = fs.readFileSync(path, 'utf8');

const seoEntries = {
"text-to-binary": {
  seoTitle: "Text to Binary Converter Online Free — Encode & Decode",
  seoDescription: "Convert text to binary code and binary back to text instantly. Free browser-based tool, no signup required.",
  faqs: [
    { question: "How does text to binary conversion work?", answer: "Each character is converted to its ASCII code, then represented as an 8-bit binary number (0s and 1s)." },
    { question: "Can I convert binary back to text?", answer: "Yes. Switch to decode mode, paste your space-separated binary, and get the original text back instantly." },
  ],
  content: [
    { heading: "How to Convert Text to Binary", body: "Type or paste your text in the input box. Each character is automatically converted to its 8-bit binary representation. You can switch between encode and decode modes to convert in either direction." },
  ],
},
"text-to-hex": {
  seoTitle: "Text to Hex Converter Online Free — Hexadecimal Encoder",
  seoDescription: "Convert text to hexadecimal and hex back to text. Free browser tool for encoding and decoding hex values.",
  faqs: [
    { question: "What is hexadecimal encoding?", answer: "Each character is converted to its ASCII value represented in base-16 (hexadecimal), using digits 0-9 and letters a-f." },
  ],
  content: [
    { heading: "Text to Hex Conversion", body: "Enter your text to see the hexadecimal representation of each character. Switch to decode mode to convert hex values back to readable text." },
  ],
},
"nato-phonetic-alphabet": {
  seoTitle: "NATO Phonetic Alphabet Converter — Alpha Bravo Charlie",
  seoDescription: "Convert text to NATO phonetic alphabet instantly. Spell out words using Alpha, Bravo, Charlie system. Free online tool.",
  faqs: [
    { question: "What is the NATO phonetic alphabet?", answer: "It is a standardized spelling alphabet used by NATO, aviation, and military to clearly communicate letters over radio or phone." },
  ],
  content: [
    { heading: "NATO Phonetic Alphabet Tool", body: "Type any text and instantly see it spelled out using the NATO phonetic alphabet. Each letter maps to a code word like Alpha, Bravo, Charlie to avoid confusion in voice communication." },
  ],
},
"hex-to-rgb": {
  seoTitle: "HEX to RGB Converter — Free Color Code Converter",
  seoDescription: "Convert HEX color codes to RGB values instantly. See live color preview and copy RGB values. Free online tool.",
  faqs: [
    { question: "How do I convert HEX to RGB?", answer: "Enter a HEX color code like #3b82f6 and the tool instantly shows the Red, Green, and Blue values (0-255)." },
  ],
  content: [
    { heading: "HEX to RGB Color Conversion", body: "Enter any HEX color code to see the corresponding RGB values. The tool shows a live color preview so you can verify the color visually." },
  ],
},
"rgb-to-hex": {
  seoTitle: "RGB to HEX Converter — Free Color Code Converter",
  seoDescription: "Convert RGB color values to HEX codes instantly. Live preview and one-click copy. Free online tool.",
  faqs: [
    { question: "How do I convert RGB to HEX?", answer: "Enter Red, Green, and Blue values (0-255) and the tool instantly generates the 6-digit HEX color code." },
  ],
  content: [
    { heading: "RGB to HEX Conversion", body: "Enter RGB values to get the corresponding HEX color code. Useful for web development and design where HEX codes are preferred in CSS." },
  ],
},
"invisible-character-detector": {
  seoTitle: "Invisible Character Detector — Find Hidden Characters in Text",
  seoDescription: "Detect invisible and hidden characters in text. Find zero-width spaces, BOM, and control characters. Free online tool.",
  faqs: [
    { question: "What are invisible characters?", answer: "They are non-printing characters like zero-width spaces, byte order marks, and control characters that are invisible but can cause bugs in code and text." },
    { question: "Can I remove the hidden characters?", answer: "Yes. After detection, click the Remove button to strip all invisible characters from your text." },
  ],
  content: [
    { heading: "Detect Hidden Characters", body: "Paste text to scan for invisible characters including zero-width spaces, byte order marks, soft hyphens, and other non-printing characters that can cause problems in code and documents." },
  ],
},
"discount-calculator": {
  seoTitle: "Discount Calculator — Calculate Sale Price & Savings",
  seoDescription: "Calculate discounted prices and savings instantly. Enter original price and discount percentage. Free online calculator.",
  faqs: [
    { question: "How do I calculate a discount?", answer: "Enter the original price and discount percentage. The tool shows you the savings amount and the final price after discount." },
  ],
  content: [
    { heading: "Discount Calculator", body: "Enter the original price and discount percentage to instantly see how much you save and the final price. Great for shopping, budgeting, and price comparisons." },
  ],
},
"salary-calculator": {
  seoTitle: "Salary Calculator — Convert Hourly, Monthly, Annual Pay",
  seoDescription: "Convert salary between hourly, weekly, monthly, and annual rates. Free salary conversion calculator.",
  faqs: [
    { question: "How do I convert hourly to annual salary?", answer: "Enter your hourly rate and the tool calculates your annual salary based on 2,080 working hours per year (40 hours × 52 weeks)." },
  ],
  content: [
    { heading: "Salary Conversion Calculator", body: "Enter any salary amount and select the period (hourly, weekly, monthly, or annual) to see the equivalent across all periods." },
  ],
},
"compound-interest-calculator": {
  seoTitle: "Compound Interest Calculator — Free Investment Growth Tool",
  seoDescription: "Calculate compound interest on savings and investments. See future value with different compounding frequencies. Free online tool.",
  faqs: [
    { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods, leading to exponential growth." },
  ],
  content: [
    { heading: "Compound Interest Calculator", body: "Enter principal amount, interest rate, time period, and compounding frequency to calculate the future value and total interest earned on your investment." },
  ],
},
"mortgage-calculator": {
  seoTitle: "Mortgage Calculator — Monthly Payment & Total Interest",
  seoDescription: "Calculate monthly mortgage payments, total interest, and total cost. Free online mortgage calculator.",
  faqs: [
    { question: "How is the monthly mortgage payment calculated?", answer: "Using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n – 1], where P is principal, r is monthly rate, and n is number of payments." },
  ],
  content: [
    { heading: "Mortgage Payment Calculator", body: "Enter loan amount, annual interest rate, and loan term to calculate your monthly payment, total amount paid, and total interest over the life of the loan." },
  ],
},
"gpa-calculator": {
  seoTitle: "GPA Calculator — Calculate Grade Point Average Online",
  seoDescription: "Calculate your GPA with ease. Add courses, grades, and credits. Supports 4.0 scale. Free online calculator.",
  faqs: [
    { question: "How is GPA calculated?", answer: "GPA = total quality points divided by total credits. Each grade has a point value (A=4.0, B=3.0, etc.) multiplied by the course credits." },
  ],
  content: [
    { heading: "GPA Calculator", body: "Add your courses with letter grades and credit hours to calculate your cumulative GPA on a 4.0 scale. Add or remove courses as needed." },
  ],
},
"grade-calculator": {
  seoTitle: "Grade Calculator — What Grade Do I Need on the Final?",
  seoDescription: "Calculate what grade you need on the remaining assignments to reach your target. Free weighted grade calculator.",
  faqs: [
    { question: "How do I calculate what I need on the final?", answer: "Enter your current grade, its weight, and your desired overall grade. The tool calculates the score needed on the remaining portion." },
  ],
  content: [
    { heading: "Final Grade Calculator", body: "Enter your current grade and its weight percentage, then set your desired overall grade to find out what score you need on the remaining work." },
  ],
},
"fuel-cost-calculator": {
  seoTitle: "Fuel Cost Calculator — Estimate Trip Gas Expenses",
  seoDescription: "Calculate fuel costs for any trip. Enter distance, fuel economy, and gas price. Free trip cost estimator.",
  faqs: [
    { question: "How do I estimate fuel costs for a trip?", answer: "Enter the trip distance in miles, your vehicle's MPG, and the current gas price per gallon to see total fuel needed and cost." },
  ],
  content: [
    { heading: "Trip Fuel Cost Calculator", body: "Enter your trip distance, vehicle fuel economy (MPG), and current gas price to calculate how many gallons you need and the total cost." },
  ],
},
"electricity-cost-calculator": {
  seoTitle: "Electricity Cost Calculator — Estimate Power Bill",
  seoDescription: "Calculate electricity costs for any appliance. Estimate daily, monthly, and yearly power consumption costs.",
  faqs: [
    { question: "How do I calculate electricity cost?", answer: "Enter the appliance wattage, hours of daily use, and your electricity rate ($/kWh) to calculate daily, monthly, and yearly costs." },
  ],
  content: [
    { heading: "Electricity Cost Calculator", body: "Find out how much an appliance costs to run by entering its power consumption in watts, daily usage hours, and your electricity rate." },
  ],
},
"calorie-calculator": {
  seoTitle: "Calorie Calculator — Daily Calorie Needs (TDEE & BMR)",
  seoDescription: "Calculate daily calorie needs based on age, weight, height, and activity level. BMR and TDEE calculator.",
  faqs: [
    { question: "What is TDEE?", answer: "Total Daily Energy Expenditure is the total calories burned per day including BMR and physical activity. It determines how many calories you need to maintain weight." },
  ],
  content: [
    { heading: "Calorie Needs Calculator", body: "Enter your age, gender, weight, height, and activity level to calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)." },
  ],
},
"date-calculator": {
  seoTitle: "Date Calculator — Days Between Dates & Duration",
  seoDescription: "Calculate the number of days, weeks, and months between two dates. Free online date difference calculator.",
  faqs: [
    { question: "How do I calculate days between two dates?", answer: "Select a start date and end date, and the tool instantly shows the difference in days, weeks, and months." },
  ],
  content: [
    { heading: "Date Duration Calculator", body: "Select two dates to calculate the difference in days, weeks, and approximate months. Useful for project planning, age calculations, and countdown tracking." },
  ],
},
"password-strength-checker": {
  seoTitle: "Password Strength Checker — Test Your Password Security",
  seoDescription: "Check how strong your password is. Get a security score and suggestions to improve. Free online tool.",
  faqs: [
    { question: "What makes a strong password?", answer: "A strong password is at least 12 characters and includes uppercase and lowercase letters, numbers, and special characters." },
    { question: "Is this password checker safe?", answer: "Yes. Your password is never sent to any server. All checking happens locally in your browser." },
  ],
  content: [
    { heading: "Password Strength Checker", body: "Enter a password to check its strength. The tool evaluates length, character variety, and complexity to give you a score and specific improvement suggestions." },
  ],
},
"chmod-calculator": {
  seoTitle: "Chmod Calculator — Unix File Permissions Calculator",
  seoDescription: "Calculate Unix file permissions with checkboxes. Convert between numeric and symbolic chmod notation. Free online tool.",
  faqs: [
    { question: "What is chmod?", answer: "chmod is a Unix command that changes file permissions. Permissions control who can read, write, and execute files." },
  ],
  content: [
    { heading: "Chmod Permission Calculator", body: "Toggle read, write, and execute permissions for owner, group, and others to calculate the numeric and symbolic chmod notation." },
  ],
},
"yaml-validator": {
  seoTitle: "YAML Validator Online — Check YAML Syntax Free",
  seoDescription: "Validate YAML syntax online and see parsed JSON output. Find errors in your YAML files instantly. Free tool.",
  faqs: [
    { question: "What is YAML?", answer: "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files in DevOps and software development." },
  ],
  content: [
    { heading: "YAML Validator", body: "Paste your YAML content and click Validate to check for syntax errors. Valid YAML is displayed as formatted JSON for easy verification." },
  ],
},
"json-to-xml": {
  seoTitle: "JSON to XML Converter Online Free — Data Format Converter",
  seoDescription: "Convert JSON data to XML format instantly. Free online converter with formatted output. No signup needed.",
  faqs: [
    { question: "How do I convert JSON to XML?", answer: "Paste your JSON in the input box and click Convert. The tool generates well-formed XML with proper nesting and tags." },
  ],
  content: [
    { heading: "JSON to XML Conversion", body: "Paste JSON data and convert it to XML format. The tool handles nested objects, arrays, and all JSON data types." },
  ],
},
"json-to-graphql": {
  seoTitle: "JSON to GraphQL Schema Generator — Free Online Tool",
  seoDescription: "Generate GraphQL type definitions from JSON data automatically. Infer types, nested objects, and arrays.",
  faqs: [
    { question: "How does JSON to GraphQL conversion work?", answer: "The tool analyzes JSON structure and data types to generate corresponding GraphQL type definitions with proper field types." },
  ],
  content: [
    { heading: "JSON to GraphQL Schema Generator", body: "Paste a JSON object and the tool generates GraphQL type definitions. Supports nested types, arrays, and basic scalar type inference." },
  ],
},
"html-formatter": {
  seoTitle: "HTML Formatter & Beautifier Online — Pretty Print HTML",
  seoDescription: "Format and beautify HTML code online. Indent nested tags and minify HTML. Free online tool.",
  faqs: [
    { question: "What does an HTML formatter do?", answer: "It takes messy or minified HTML and adds proper indentation and line breaks to make it readable, or minifies it by removing whitespace." },
  ],
  content: [
    { heading: "HTML Formatter", body: "Paste unformatted HTML and click Beautify to add proper indentation, or Minify to remove whitespace for smaller file size." },
  ],
},
"svg-optimizer": {
  seoTitle: "SVG Optimizer Online — Minify & Clean SVG Files",
  seoDescription: "Optimize SVG files by removing comments, metadata, and unnecessary attributes. Reduce SVG file size. Free tool.",
  faqs: [
    { question: "What does SVG optimization remove?", answer: "It removes XML comments, metadata, title/desc elements, extra namespaces, and redundant whitespace to reduce file size." },
  ],
  content: [
    { heading: "SVG Optimizer", body: "Paste SVG markup to optimize it by removing unnecessary metadata, comments, and whitespace. See the size reduction percentage." },
  ],
},
"csv-to-table": {
  seoTitle: "CSV to HTML Table Converter — Free Online Tool",
  seoDescription: "Convert CSV data to formatted HTML tables. Preview the table and copy HTML code instantly. Free converter.",
  faqs: [
    { question: "Can I use different separators?", answer: "Yes. Choose between comma, tab, or semicolon separators depending on your CSV format." },
  ],
  content: [
    { heading: "CSV to Table Converter", body: "Paste CSV data to preview it as a formatted table. Choose your separator, then copy the generated HTML table code." },
  ],
},
"json-to-table": {
  seoTitle: "JSON to Table Viewer — Visualize JSON as Table",
  seoDescription: "Convert JSON arrays to readable tables. View JSON data in tabular format. Free online viewer.",
  faqs: [
    { question: "What JSON format is supported?", answer: "The tool works with JSON arrays of objects. Single objects are also supported and displayed as a one-row table." },
  ],
  content: [
    { heading: "JSON to Table Viewer", body: "Paste a JSON array and view it as a formatted table with headers from object keys. Useful for quickly inspecting API responses and data files." },
  ],
},
"keyword-density-checker": {
  seoTitle: "Keyword Density Checker — Free SEO Content Analysis",
  seoDescription: "Analyze keyword density in your content. Find most used words and their frequency percentages. Free SEO tool.",
  faqs: [
    { question: "What is keyword density?", answer: "Keyword density is the percentage of times a keyword appears relative to the total word count. It helps optimize content for SEO." },
  ],
  content: [
    { heading: "Keyword Density Checker", body: "Paste your content to see all words ranked by frequency. The tool shows count and density percentage for each word." },
  ],
},
"heading-analyzer": {
  seoTitle: "Headline Analyzer — Score Your Blog Title & Headings",
  seoDescription: "Analyze headline quality with scoring for length, power words, emotional words, and numbers. Free headline tool.",
  faqs: [
    { question: "What makes a good headline?", answer: "Good headlines are 6-13 words, under 70 characters, include power words and numbers, and evoke emotion." },
  ],
  content: [
    { heading: "Headline Analyzer", body: "Enter your headline to get a quality score based on word count, character length, power words, emotional words, and number usage." },
  ],
},
"readability-score": {
  seoTitle: "Readability Score Checker — Flesch-Kincaid & More",
  seoDescription: "Check text readability with Flesch Reading Ease and Flesch-Kincaid Grade Level scores. Free online tool.",
  faqs: [
    { question: "What is Flesch Reading Ease?", answer: "A score from 0-100 where higher scores mean easier reading. 60-80 is standard, 80+ is easy, below 40 is difficult." },
  ],
  content: [
    { heading: "Readability Score Checker", body: "Paste text to calculate Flesch Reading Ease and Flesch-Kincaid Grade Level scores. See word count, sentence count, and syllable statistics." },
  ],
},
"serp-preview": {
  seoTitle: "SERP Preview Tool — Google Search Result Preview",
  seoDescription: "Preview how your page appears in Google search results. Optimize title tags and meta descriptions for SEO.",
  faqs: [
    { question: "What is a SERP preview?", answer: "It shows how your page title, URL, and meta description will appear in Google search results, helping you optimize before publishing." },
  ],
  content: [
    { heading: "Google SERP Preview Tool", body: "Enter your title tag, URL, and meta description to see a realistic preview of how your page will appear in Google search results." },
  ],
},
"canonical-tag-generator": {
  seoTitle: "Canonical Tag Generator — Prevent Duplicate Content",
  seoDescription: "Generate canonical URL tags to prevent duplicate content issues. Copy the HTML link tag instantly. Free SEO tool.",
  faqs: [
    { question: "What is a canonical tag?", answer: "A canonical tag tells search engines which version of a URL is the preferred one, preventing duplicate content penalties." },
  ],
  content: [
    { heading: "Canonical Tag Generator", body: "Enter your preferred canonical URL to generate the HTML link tag. Copy and paste it into the head section of your page." },
  ],
},
"schema-markup-generator": {
  seoTitle: "Schema Markup Generator — JSON-LD Structured Data",
  seoDescription: "Generate JSON-LD schema markup for articles, FAQs, products, and more. Free Schema.org structured data tool.",
  faqs: [
    { question: "What is schema markup?", answer: "Schema markup is structured data you add to HTML that helps search engines understand your content and show rich snippets." },
  ],
  content: [
    { heading: "Schema Markup Generator", body: "Select a schema type, fill in the fields, and get JSON-LD structured data ready to paste into your HTML. Supports Article, FAQ, Product, LocalBusiness, and Event types." },
  ],
},
"htaccess-generator": {
  seoTitle: ".htaccess Generator — Apache Config File Builder",
  seoDescription: "Generate .htaccess rules for redirects, GZIP compression, caching, and security. Free Apache config tool.",
  faqs: [
    { question: "What is .htaccess?", answer: "An .htaccess file is an Apache web server configuration file that controls URL rewriting, redirects, caching, compression, and security." },
  ],
  content: [
    { heading: ".htaccess Generator", body: "Select the features you need — HTTPS redirect, www removal, GZIP compression, browser caching, hotlink protection — and get a complete .htaccess file." },
  ],
},
"text-encryption": {
  seoTitle: "Text Encryption Tool — AES-256 Encrypt & Decrypt Online",
  seoDescription: "Encrypt and decrypt text with AES-256-GCM encryption. Password-based, runs entirely in your browser. Free and private.",
  faqs: [
    { question: "Is this encryption secure?", answer: "Yes. It uses AES-256-GCM with PBKDF2 key derivation (100,000 iterations), which is industry-standard encryption. Everything runs in your browser." },
  ],
  content: [
    { heading: "Text Encryption Tool", body: "Enter text and a password to encrypt with AES-256. To decrypt, paste the encrypted text, enter the same password, and click Decrypt." },
  ],
},
"text-to-speech": {
  seoTitle: "Text to Speech — Read Text Aloud Online Free",
  seoDescription: "Convert text to speech with multiple voices and speeds. Uses your browser's built-in speech synthesis. Free TTS tool.",
  faqs: [
    { question: "Which voices are available?", answer: "Available voices depend on your browser and operating system. Most modern browsers provide multiple voices in different languages." },
  ],
  content: [
    { heading: "Text to Speech Tool", body: "Enter text, select a voice and speed, then click Speak to hear it read aloud. Uses the Web Speech API built into your browser." },
  ],
},
"image-to-base64": {
  seoTitle: "Image to Base64 Encoder — Convert Images to Data URI",
  seoDescription: "Convert images to Base64 encoded data URIs. Embed images directly in HTML and CSS. Free browser-based tool.",
  faqs: [
    { question: "Why convert images to Base64?", answer: "Base64 data URIs let you embed images directly in HTML/CSS without separate file requests, reducing HTTP requests and simplifying deployment." },
  ],
  content: [
    { heading: "Image to Base64 Converter", body: "Drop an image to get its Base64 data URI. Copy the result and use it directly in HTML img tags or CSS background-image properties." },
  ],
},
"svg-to-png": {
  seoTitle: "SVG to PNG Converter Online — High Resolution Export",
  seoDescription: "Convert SVG vector graphics to PNG images at 1x-4x resolution. Free browser-based converter with no uploads.",
  faqs: [
    { question: "What scale should I use?", answer: "Use 1x for web, 2x for retina displays, and 3x-4x for print quality. Higher scales produce larger, sharper images." },
  ],
  content: [
    { heading: "SVG to PNG Conversion", body: "Upload an SVG file and choose the output scale (1x to 4x) to export as a high-resolution PNG image. The conversion happens entirely in your browser." },
  ],
},
"webp-to-png": {
  seoTitle: "WebP to PNG Converter Online Free — Batch Convert",
  seoDescription: "Convert WebP images to PNG format. Batch conversion supported. Free browser-based tool, no uploads.",
  faqs: [
    { question: "Why convert WebP to PNG?", answer: "While WebP has great compression, PNG is more universally supported and better for images that need editing or transparency." },
  ],
  content: [
    { heading: "WebP to PNG Converter", body: "Drop one or more WebP files to convert them to PNG format. All conversion happens in your browser — no server uploads needed." },
  ],
},
"png-to-webp": {
  seoTitle: "PNG to WebP Converter — Reduce Image Size by 30%",
  seoDescription: "Convert PNG images to WebP format for smaller file sizes. Batch conversion with quality comparison. Free online tool.",
  faqs: [
    { question: "How much smaller are WebP files?", answer: "WebP images are typically 25-35% smaller than PNG for the same quality, making them ideal for websites and apps." },
  ],
  content: [
    { heading: "PNG to WebP Converter", body: "Drop PNG images to convert to WebP format. See the file size comparison for each converted image. Supports batch conversion." },
  ],
},
"image-color-picker": {
  seoTitle: "Image Color Picker — Pick Colors from Any Image",
  seoDescription: "Pick any color from an image and get HEX and RGB values. Free online eyedropper tool. No signup needed.",
  faqs: [
    { question: "How do I pick a color from an image?", answer: "Upload an image, then click anywhere on it to pick the color at that pixel. The HEX and RGB values are shown instantly." },
  ],
  content: [
    { heading: "Image Color Picker", body: "Upload an image and click anywhere to extract the exact color. Get HEX and RGB values and copy them with one click." },
  ],
},
"image-cropper": {
  seoTitle: "Image Cropper Online — Crop Photos to Any Size",
  seoDescription: "Crop images to exact dimensions online. Enter X, Y, width, and height. Free browser-based image cropper.",
  faqs: [
    { question: "What image formats are supported?", answer: "All common formats including JPG, PNG, WebP, GIF, and BMP. The cropped result is exported as PNG." },
  ],
  content: [
    { heading: "Image Cropper", body: "Upload an image, enter the crop coordinates and dimensions, then download the cropped result as a PNG file." },
  ],
},
"markdown-editor": {
  seoTitle: "Markdown Editor with Live Preview — Free Online Tool",
  seoDescription: "Write Markdown with real-time preview. See formatted output instantly. Copy as HTML. Free online editor.",
  faqs: [
    { question: "What Markdown features are supported?", answer: "Headers (h1-h3), bold, italic, code, lists, and links are supported. The preview updates in real-time as you type." },
  ],
  content: [
    { heading: "Markdown Editor", body: "Write Markdown in the left panel and see the live preview in the right panel. Copy the generated HTML with one click." },
  ],
},
"css-gradient-generator": {
  seoTitle: "CSS Gradient Generator — Visual Gradient Builder",
  seoDescription: "Create CSS gradients visually. Choose colors, direction, and type. Copy the CSS code. Free gradient generator.",
  faqs: [
    { question: "What gradient types are supported?", answer: "Linear and radial gradients with customizable colors and angles. The CSS code is generated automatically." },
  ],
  content: [
    { heading: "CSS Gradient Generator", body: "Pick two colors, choose between linear and radial gradient types, adjust the angle, and copy the CSS code for your background." },
  ],
},
"live-html-preview": {
  seoTitle: "Live HTML Preview — Online HTML/CSS/JS Playground",
  seoDescription: "Write HTML, CSS, and JavaScript with live preview. Free online code playground. No signup required.",
  faqs: [
    { question: "Does it support CSS and JavaScript?", answer: "Yes. Write HTML with inline CSS and JavaScript in a single editor and see the live result in the preview panel." },
  ],
  content: [
    { heading: "Live HTML Preview", body: "Type HTML, CSS, and JavaScript in the editor to see the rendered output instantly in the preview pane below." },
  ],
},
"http-status-codes": {
  seoTitle: "HTTP Status Codes Reference — Complete Code List",
  seoDescription: "Browse all HTTP status codes with descriptions. Search 1xx, 2xx, 3xx, 4xx, and 5xx codes. Free developer reference.",
  faqs: [
    { question: "What do HTTP status code classes mean?", answer: "1xx: Informational, 2xx: Success, 3xx: Redirection, 4xx: Client Error, 5xx: Server Error." },
  ],
  content: [
    { heading: "HTTP Status Codes Reference", body: "Search and browse HTTP status codes with descriptions and explanations. Color-coded by class for quick reference." },
  ],
},
"git-command-generator": {
  seoTitle: "Git Command Reference — Searchable Git Cheat Sheet",
  seoDescription: "Find the right Git command for any task. Searchable reference with descriptions and examples. Free developer tool.",
  faqs: [
    { question: "How do I find a Git command?", answer: "Use the search box to filter commands by name or description. Click Copy to copy any command to your clipboard." },
  ],
  content: [
    { heading: "Git Command Reference", body: "A searchable reference of common Git commands with descriptions. Click the Copy button next to any command to copy it." },
  ],
},
"unicode-lookup": {
  seoTitle: "Unicode Character Lookup — Search Symbols & Emojis",
  seoDescription: "Search and copy Unicode characters, symbols, and emojis by name. Click to copy. Free character browser.",
  faqs: [
    { question: "How do I find a Unicode character?", answer: "Type a character name in the search box to filter. Click any character to copy it to your clipboard." },
  ],
  content: [
    { heading: "Unicode Character Lookup", body: "Browse and search Unicode characters by name. Click any character to copy it to your clipboard for use in documents and code." },
  ],
},
"css-flexbox-generator": {
  seoTitle: "CSS Flexbox Generator — Visual Flex Layout Builder",
  seoDescription: "Build CSS Flexbox layouts visually. Adjust direction, alignment, and gap. Copy CSS code. Free layout tool.",
  faqs: [
    { question: "What Flexbox properties can I set?", answer: "Flex direction, justify-content, align-items, flex-wrap, and gap. See a live preview with 4 sample items." },
  ],
  content: [
    { heading: "CSS Flexbox Generator", body: "Adjust Flexbox properties with dropdowns and see the layout update in real-time. Copy the generated CSS for your project." },
  ],
},
"css-grid-generator": {
  seoTitle: "CSS Grid Generator — Visual Grid Layout Builder",
  seoDescription: "Build CSS Grid layouts visually. Set columns, rows, and gap. Copy CSS code. Free online grid builder.",
  faqs: [
    { question: "What Grid properties can I set?", answer: "Number of columns and rows, column and row sizes, and gap. See a live preview of the grid layout." },
  ],
  content: [
    { heading: "CSS Grid Generator", body: "Set grid columns, rows, sizes, and gap to build a CSS Grid layout visually. Copy the generated CSS for your stylesheet." },
  ],
},
"tailwind-to-css": {
  seoTitle: "Tailwind to CSS Converter — Get Plain CSS from Utilities",
  seoDescription: "Convert Tailwind CSS utility classes to vanilla CSS properties. Free online Tailwind to CSS tool.",
  faqs: [
    { question: "Which Tailwind classes are supported?", answer: "Common utility classes for display, position, alignment, typography, spacing, borders, and more. Unknown classes are marked for manual review." },
  ],
  content: [
    { heading: "Tailwind to CSS Converter", body: "Paste Tailwind CSS classes to see the equivalent vanilla CSS properties. Useful for learning CSS or migrating away from Tailwind." },
  ],
},
"regex-generator": {
  seoTitle: "Regex Generator — Common Regular Expression Patterns",
  seoDescription: "Browse and test common regex patterns for email, URL, phone, IP, and more. Copy patterns and test against your text.",
  faqs: [
    { question: "How do I use a regex pattern?", answer: "Browse common patterns, click one to select it, then test it against your text in the test area. Copy the regex with one click." },
  ],
  content: [
    { heading: "Regex Pattern Library", body: "Browse pre-built regular expressions for common patterns like emails, URLs, phone numbers, and more. Select a pattern, test it, and copy the regex." },
  ],
},
};

// Insert before the closing '};' 
const insertPoint = content.lastIndexOf('};');
if (insertPoint === -1) { console.error('Could not find closing };'); process.exit(1); }

let newEntries = '\n  // ─── Batch 2: 50 New Tools ──────────────────────\n';
for (const [slug, data] of Object.entries(seoEntries)) {
  newEntries += '  "' + slug + '": {\n';
  newEntries += '    seoTitle: ' + JSON.stringify(data.seoTitle) + ',\n';
  newEntries += '    seoDescription:\n      ' + JSON.stringify(data.seoDescription) + ',\n';
  newEntries += '    faqs: [\n';
  for (const faq of data.faqs) {
    newEntries += '      {\n';
    newEntries += '        question: ' + JSON.stringify(faq.question) + ',\n';
    newEntries += '        answer:\n          ' + JSON.stringify(faq.answer) + ',\n';
    newEntries += '      },\n';
  }
  newEntries += '    ],\n';
  newEntries += '    content: [\n';
  for (const sec of data.content) {
    newEntries += '      {\n';
    newEntries += '        heading: ' + JSON.stringify(sec.heading) + ',\n';
    newEntries += '        body: ' + JSON.stringify(sec.body) + ',\n';
    newEntries += '      },\n';
  }
  newEntries += '    ],\n';
  newEntries += '  },\n';
}

content = content.substring(0, insertPoint) + newEntries + content.substring(insertPoint);
fs.writeFileSync(path, content, 'utf8');
console.log('Added SEO data for ' + Object.keys(seoEntries).length + ' tools');
