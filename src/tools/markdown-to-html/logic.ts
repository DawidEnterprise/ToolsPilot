export function markdownToHtml(md: string): string {
  if (!md.trim()) return "";

  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Blockquote
  html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr />");

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Images ![alt](src)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Line breaks: double newline → paragraph
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<[a-z]/.test(trimmed)) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  // Single newlines → <br>
  html = html.replace(/([^>])\n([^<])/g, "$1<br>\n$2");

  return html;
}
