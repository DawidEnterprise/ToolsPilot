import * as yaml from "js-yaml";

export function jsonToYaml(input: string): { output: string; error: string | null } {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parsed = JSON.parse(input);
    return { output: yaml.dump(parsed, { indent: 2, lineWidth: -1 }), error: null };
  } catch (e: unknown) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

export function yamlToJson(input: string): { output: string; error: string | null } {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parsed = yaml.load(input);
    return { output: JSON.stringify(parsed, null, 2), error: null };
  } catch (e: unknown) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid YAML" };
  }
}
