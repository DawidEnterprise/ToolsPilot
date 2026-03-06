export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-512";

export async function generateHash(input: string, algorithm: HashAlgorithm): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function generateAllHashes(input: string): Promise<Record<HashAlgorithm, string>> {
  const [sha1, sha256, sha512] = await Promise.all([
    generateHash(input, "SHA-1"),
    generateHash(input, "SHA-256"),
    generateHash(input, "SHA-512"),
  ]);
  return { "SHA-1": sha1, "SHA-256": sha256, "SHA-512": sha512 };
}
