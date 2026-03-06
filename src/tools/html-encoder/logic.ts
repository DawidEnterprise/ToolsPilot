const ENTITIES: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
};

const REVERSE_ENTITIES: Record<string, string> = Object.fromEntries(
  Object.entries(ENTITIES).map(([k, v]) => [v, k])
);

export function encodeHtmlEntities(input: string): string {
  return input.replace(/[&<>"']/g, (c) => ENTITIES[c] || c);
}

export function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x[\da-fA-F]+;|&#\d+;/g, (entity) => {
      if (REVERSE_ENTITIES[entity]) return REVERSE_ENTITIES[entity];
      if (entity.startsWith("&#x")) return String.fromCharCode(parseInt(entity.slice(3, -1), 16));
      if (entity.startsWith("&#")) return String.fromCharCode(parseInt(entity.slice(2, -1), 10));
      return entity;
    });
}
