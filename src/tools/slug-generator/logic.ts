export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric
    .trim()
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-"); // Collapse multiple hyphens
}
