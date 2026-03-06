export function generateFaviconSvg(
  text: string,
  bgColor: string,
  textColor: string,
  shape: "circle" | "rounded-square" | "square"
): string {
  const size = 64;
  let bg = "";
  switch (shape) {
    case "circle":
      bg = `<circle cx="32" cy="32" r="32" fill="${bgColor}"/>`;
      break;
    case "rounded-square":
      bg = `<rect width="64" height="64" rx="12" fill="${bgColor}"/>`;
      break;
    case "square":
      bg = `<rect width="64" height="64" fill="${bgColor}"/>`;
      break;
  }

  const fontSize = text.length === 1 ? 36 : text.length === 2 ? 28 : 20;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${bg}
  <text x="32" y="32" text-anchor="middle" dominant-baseline="central" fill="${textColor}" font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize}">${escapeXml(text)}</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function svgToDataUrl(svg: string): string {
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
