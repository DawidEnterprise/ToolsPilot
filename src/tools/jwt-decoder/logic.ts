export interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean;
  expiresAt: Date | null;
  issuedAt: Date | null;
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

export function decodeJwt(token: string): JwtParts {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format — expected 3 parts separated by dots");

  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));
  const signature = parts[2];

  const exp = typeof payload.exp === "number" ? new Date(payload.exp * 1000) : null;
  const iat = typeof payload.iat === "number" ? new Date(payload.iat * 1000) : null;
  const isExpired = exp ? exp.getTime() < Date.now() : false;

  return { header, payload, signature, isExpired, expiresAt: exp, issuedAt: iat };
}
