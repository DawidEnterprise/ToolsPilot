const fs = require('fs');
const path = 'src/tools/unicode-lookup/UnicodeLookupTool.tsx';
let f = fs.readFileSync(path, 'utf8');

// The generate script wrote curly quotes as literal characters but they got
// normalised to ASCII " (U+0022), breaking string syntax.
// Replace the two broken ["","..."] entries with unicode escapes.
// Also upgrade the single curly quotes to proper codepoints.

// Fix: [""","Left DblQuote"] -> ["\u201C","Left DblQuote"]
f = f.replace('["""', '["\\u201C"');
// Fix: [""","Right DblQuote"] -> ["\u201D","Right DblQuote"]
f = f.replace('["""', '["\\u201D"');

// Fix: ["'","Left Quote"] -> ["\u2018","Left Quote"]
f = f.replace('["\x27","Left Quote"]', '["\\u2018","Left Quote"]');
// Fix: ["'","Right Quote"] -> ["\u2019","Right Quote"]
f = f.replace('["\x27","Right Quote"]', '["\\u2019","Right Quote"]');

fs.writeFileSync(path, f, 'utf8');
console.log('Fixed unicode-lookup curly quotes');
