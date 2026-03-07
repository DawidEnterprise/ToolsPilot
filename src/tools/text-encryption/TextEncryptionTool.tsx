"use client";
import { useState } from "react";

async function encrypt(text: string, password: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:100000,hash:"SHA-256"}, keyMaterial, {name:"AES-GCM",length:256}, false, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({name:"AES-GCM",iv}, key, enc.encode(text));
  const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(new Uint8Array(encrypted), salt.length + iv.length);
  return btoa(String.fromCharCode(...result));
}

async function decrypt(data: string, password: string): Promise<string> {
  const enc = new TextEncoder();
  const raw = Uint8Array.from(atob(data), c => c.charCodeAt(0));
  const salt = raw.slice(0, 16);
  const iv = raw.slice(16, 28);
  const ciphertext = raw.slice(28);
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:100000,hash:"SHA-256"}, keyMaterial, {name:"AES-GCM",length:256}, false, ["decrypt"]);
  const decrypted = await crypto.subtle.decrypt({name:"AES-GCM",iv}, key, ciphertext);
  return new TextDecoder().decode(decrypted);
}

export function TextEncryptionTool() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const doEncrypt = async () => { try { setError(""); setOutput(await encrypt(input, password)); } catch { setError("Encryption failed"); } };
  const doDecrypt = async () => { try { setError(""); setOutput(await decrypt(input, password)); } catch { setError("Decryption failed - wrong password?"); } };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Input</label>
          <textarea className="input-field tool-panel font-mono" placeholder="Enter text to encrypt or ciphertext to decrypt..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Output</label>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-500 hover:text-brand-600">Copy</button>}
          </div>
          <textarea className="input-field tool-panel font-mono bg-gray-50 dark:bg-gray-800" readOnly value={output} />
        </div>
      </div>
      <input type="password" className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
      <div className="flex gap-2">
        <button onClick={doEncrypt} className="btn-primary text-sm" disabled={!password}>Encrypt (AES-256)</button>
        <button onClick={doDecrypt} className="btn-secondary text-sm" disabled={!password}>Decrypt</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
