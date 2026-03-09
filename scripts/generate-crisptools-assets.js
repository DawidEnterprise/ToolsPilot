const fs = require("fs");
const sharp = require("sharp");

/* ── Main Logo SVG (200×200) — Cute gear mascot ── */
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect x="10" y="10" width="180" height="180" rx="40" fill="url(#bg)"/>

  <!-- === Gear Character: center (100, 105) === -->

  <!-- Gear teeth (8 rounded rects, drawn BEHIND body) -->
  <g fill="#fbbf24" stroke="#92400e" stroke-width="3">
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(0,100,105)"/>
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(45,100,105)"/>
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(90,100,105)"/>
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(135,100,105)"/>
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(180,100,105)"/>
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(225,100,105)"/>
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(270,100,105)"/>
    <rect x="91" y="48" width="18" height="18" rx="5" transform="rotate(315,100,105)"/>
  </g>

  <!-- Main gear body (on top of teeth to hide bases) -->
  <circle cx="100" cy="105" r="46" fill="#fbbf24" stroke="#92400e" stroke-width="3.5"/>

  <!-- Highlight arc (gives 3D cartoon shine) -->
  <path d="M64,90 Q100,72 136,90" fill="none" stroke="#fde68a" stroke-width="7" stroke-linecap="round" opacity="0.55"/>

  <!-- Left eye -->
  <ellipse cx="83" cy="97" rx="14" ry="16" fill="white" stroke="#78350f" stroke-width="2.5"/>
  <circle cx="87" cy="95" r="8" fill="#1e293b"/>
  <circle cx="90" cy="91" r="3.2" fill="white"/>
  <circle cx="84" cy="98" r="1.5" fill="white" opacity="0.6"/>

  <!-- Right eye -->
  <ellipse cx="117" cy="97" rx="14" ry="16" fill="white" stroke="#78350f" stroke-width="2.5"/>
  <circle cx="121" cy="95" r="8" fill="#1e293b"/>
  <circle cx="124" cy="91" r="3.2" fill="white"/>
  <circle cx="118" cy="98" r="1.5" fill="white" opacity="0.6"/>

  <!-- Eyebrows (playful raised) -->
  <path d="M72,80 Q83,73 94,79" fill="none" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M106,79 Q117,73 128,80" fill="none" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Big open smile -->
  <path d="M76,117 Q100,140 124,117" fill="#78350f" stroke="#78350f" stroke-width="3" stroke-linejoin="round"/>
  <!-- Mouth interior -->
  <path d="M78,117 Q100,138 122,117" fill="#fef3c7"/>
  <!-- Tongue -->
  <ellipse cx="100" cy="130" rx="10" ry="7" fill="#fb7185" opacity="0.7"/>

  <!-- Rosy cheeks -->
  <ellipse cx="64" cy="110" rx="10" ry="7" fill="#fb923c" opacity="0.35"/>
  <ellipse cx="136" cy="110" rx="10" ry="7" fill="#fb923c" opacity="0.35"/>

  <!-- Sparkle stars -->
  <g fill="white">
    <path d="M163,34 L165.5,43 L174,45.5 L165.5,48 L163,57 L160.5,48 L152,45.5 L160.5,43 Z"/>
    <path d="M37,153 L38.8,158 L43.8,159.8 L38.8,161.5 L37,166.5 L35.2,161.5 L30.2,159.8 L35.2,158 Z"/>
    <circle cx="174" cy="60" r="2.5"/>
    <circle cx="27" cy="147" r="2"/>
    <circle cx="153" cy="27" r="1.8"/>
  </g>
</svg>`;

/* ── Favicon SVG (32×32) — Simplified gear face ── */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="7" fill="url(#bg)"/>

  <!-- Gear teeth (8) -->
  <g fill="#fbbf24" stroke="#92400e" stroke-width="0.8">
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(0,16,16.5)"/>
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(45,16,16.5)"/>
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(90,16,16.5)"/>
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(135,16,16.5)"/>
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(180,16,16.5)"/>
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(225,16,16.5)"/>
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(270,16,16.5)"/>
    <rect x="14" y="4.5" width="4" height="4" rx="1.2" transform="rotate(315,16,16.5)"/>
  </g>
  <!-- Gear body -->
  <circle cx="16" cy="16.5" r="9" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>

  <!-- Eyes -->
  <ellipse cx="13" cy="15.5" rx="2.8" ry="3.2" fill="white"/>
  <circle cx="13.8" cy="15" r="1.8" fill="#1e293b"/>
  <circle cx="14.5" cy="14" r="0.8" fill="white"/>

  <ellipse cx="19" cy="15.5" rx="2.8" ry="3.2" fill="white"/>
  <circle cx="19.8" cy="15" r="1.8" fill="#1e293b"/>
  <circle cx="20.5" cy="14" r="0.8" fill="white"/>

  <!-- Smile -->
  <path d="M12,20 Q16,23.5 20,20" fill="#78350f" stroke="#78350f" stroke-width="0.8"/>
  <path d="M12.3,20 Q16,23.2 19.7,20" fill="#fef3c7"/>

  <!-- Sparkle -->
  <path d="M27,5 L27.6,7 L29.6,7.6 L27.6,8.2 L27,10.2 L26.4,8.2 L24.4,7.6 L26.4,7 Z" fill="white" opacity="0.9"/>
</svg>`;

/* ── OG Image SVG (1200×630) — Social sharing card ── */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Mini gear mascot on the left -->
  <g transform="translate(220,280) scale(1.4)">
    <g fill="#fbbf24" stroke="#92400e" stroke-width="2.5">
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(0,0,0)"/>
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(45,0,0)"/>
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(90,0,0)"/>
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(135,0,0)"/>
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(180,0,0)"/>
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(225,0,0)"/>
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(270,0,0)"/>
      <rect x="-9" y="-56" width="18" height="16" rx="5" transform="rotate(315,0,0)"/>
    </g>
    <circle cx="0" cy="0" r="42" fill="#fbbf24" stroke="#92400e" stroke-width="3"/>
    <path d="M-32,-14 Q0,-30 32,-14" fill="none" stroke="#fde68a" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
    <ellipse cx="-15" cy="-6" rx="12" ry="14" fill="white" stroke="#78350f" stroke-width="2"/>
    <circle cx="-12" cy="-8" r="7" fill="#1e293b"/>
    <circle cx="-10" cy="-11" r="2.8" fill="white"/>
    <ellipse cx="15" cy="-6" rx="12" ry="14" fill="white" stroke="#78350f" stroke-width="2"/>
    <circle cx="18" cy="-8" r="7" fill="#1e293b"/>
    <circle cx="20" cy="-11" r="2.8" fill="white"/>
    <path d="M-20,14 Q0,32 20,14" fill="#78350f" stroke="#78350f" stroke-width="2.5"/>
    <path d="M-18,14 Q0,30 18,14" fill="#fef3c7"/>
    <ellipse cx="0" cy="24" rx="8" ry="5.5" fill="#fb7185" opacity="0.6"/>
    <ellipse cx="-30" cy="7" rx="8" ry="6" fill="#fb923c" opacity="0.3"/>
    <ellipse cx="30" cy="7" rx="8" ry="6" fill="#fb923c" opacity="0.3"/>
  </g>

  <!-- Text content -->
  <text x="680" y="240" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="800" font-size="86" fill="white" letter-spacing="-1">CrispTools</text>
  <text x="680" y="310" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="400" font-size="30" fill="white" opacity="0.85">100+ Free Browser-Based Tools</text>
  <line x1="580" y1="340" x2="780" y2="340" stroke="white" stroke-width="1.5" opacity="0.3"/>
  <text x="680" y="380" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="400" font-size="20" fill="white" opacity="0.6">Image Converters &#x2022; Dev Tools &#x2022; Text Utils &#x2022; SEO &#x2022; File Converters</text>
  <text x="680" y="530" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="600" font-size="24" fill="white" opacity="0.5">crisp-tools.com</text>

  <!-- Sparkles -->
  <g fill="white" opacity="0.4">
    <path d="M1050,100 L1053,112 L1065,115 L1053,118 L1050,130 L1047,118 L1035,115 L1047,112 Z"/>
    <path d="M150,520 L152,527 L159,529 L152,531 L150,538 L148,531 L141,529 L148,527 Z"/>
    <circle cx="1080" cy="140" r="3"/>
    <circle cx="130" cy="510" r="2"/>
  </g>
</svg>`;

async function generate() {
  // Write SVGs
  fs.writeFileSync("public/crisptools-logo.svg", logoSvg);
  fs.writeFileSync("public/crisptools-favicon.svg", faviconSvg);
  console.log("SVGs written");

  // Apple touch icon (180×180 from logo)
  await sharp(Buffer.from(logoSvg)).resize(180, 180).png().toFile("public/crisptools-apple-touch-icon.png");
  console.log("apple-touch-icon.png: 180x180");

  // Favicons
  await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile("public/crisptools-favicon-32.png");
  await sharp(Buffer.from(faviconSvg)).resize(16, 16).png().toFile("public/crisptools-favicon-16.png");
  console.log("favicon PNGs: 32x32, 16x16");

  // Multi-size ICO (16+32+48)
  const ico16 = await sharp(Buffer.from(faviconSvg)).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(Buffer.from(faviconSvg)).resize(48, 48).png().toBuffer();

  function buildIco(buffers) {
    const count = buffers.length;
    const headerSize = 6 + count * 16;
    let offset = headerSize;
    const entries = buffers.map((buf) => {
      const size = buf.length;
      const entry = { buf, offset, size };
      offset += size;
      return entry;
    });
    const ico = Buffer.alloc(offset);
    ico.writeUInt16LE(0, 0);
    ico.writeUInt16LE(1, 2);
    ico.writeUInt16LE(count, 4);
    entries.forEach((e, i) => {
      const dim = [16, 32, 48][i];
      const off = 6 + i * 16;
      ico.writeUInt8(dim === 256 ? 0 : dim, off);
      ico.writeUInt8(dim === 256 ? 0 : dim, off + 1);
      ico.writeUInt32LE(e.size, off + 8);
      ico.writeUInt32LE(e.offset, off + 12);
    });
    entries.forEach((e) => e.buf.copy(ico, e.offset));
    return ico;
  }

  fs.writeFileSync("public/crisptools-favicon.ico", buildIco([ico16, ico32, ico48]));
  console.log("favicon.ico: 16+32+48");

  // OG image (1200×630)
  await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toFile("public/crisptools-og.png");
  console.log("OG image: 1200x630");

  console.log("\nAll assets generated!");
}

generate().catch(console.error);
