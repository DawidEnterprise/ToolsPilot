const fs = require('fs');
const filePath = require('path').join(__dirname, '..', 'src', 'lib', 'registry.ts');
let content = fs.readFileSync(filePath, 'utf8');

const slugs = [
  'text-to-binary','text-to-hex','nato-phonetic-alphabet','hex-to-rgb','rgb-to-hex',
  'invisible-character-detector','discount-calculator','salary-calculator',
  'compound-interest-calculator','mortgage-calculator','gpa-calculator','grade-calculator',
  'fuel-cost-calculator','electricity-cost-calculator','calorie-calculator','date-calculator',
  'password-strength-checker','chmod-calculator','yaml-validator','json-to-xml',
  'json-to-graphql','html-formatter','svg-optimizer','csv-to-table','json-to-table',
  'keyword-density-checker','heading-analyzer','readability-score','serp-preview',
  'canonical-tag-generator','schema-markup-generator','htaccess-generator',
  'text-encryption','text-to-speech','image-to-base64','svg-to-png','webp-to-png',
  'png-to-webp','image-color-picker','image-cropper','markdown-editor',
  'css-gradient-generator','live-html-preview','http-status-codes','git-command-generator',
  'unicode-lookup','css-flexbox-generator','css-grid-generator','tailwind-to-css',
  'regex-generator'
];

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

let count = 0;
for (const slug of slugs) {
  // Find comingSoon: true line after this slug and remove it
  const idx = content.indexOf('slug: "' + slug + '"');
  if (idx === -1) { console.log('  SLUG NOT FOUND: ' + slug); continue; }
  // Find next comingSoon: true after this slug
  const afterSlug = content.substring(idx);
  const csMatch = afterSlug.match(/\n\s*comingSoon:\s*true,\s*\n/);
  if (!csMatch) { console.log('  NO comingSoon for: ' + slug); continue; }
  // Only replace if it's within the same object (before next '}')
  const closeBrace = afterSlug.indexOf('},');
  if (csMatch.index < closeBrace) {
    const start = idx + csMatch.index;
    const end = start + csMatch[0].length;
    content = content.substring(0, start) + '\n' + content.substring(end);
    count++;
  } else {
    console.log('  comingSoon outside block for: ' + slug);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated ' + count + '/' + slugs.length + ' registry entries');
