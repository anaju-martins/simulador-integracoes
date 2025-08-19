import { Integration } from "@/types/integration";

export const timelinePalette = [
  "#89C08E",
  "#209E91",
  "#05668D",
  "#6497C6",
  "#213E52",
] as const;

export function hashKey(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h << 5) - h + key.charCodeAt(i);
  return Math.abs(h);
}

export function pickBgColor(index?: number, stableKey?: string) {
  if (typeof index === "number") {
    return timelinePalette[index % timelinePalette.length];
  }
  const key = stableKey ?? Math.random().toString();
  return timelinePalette[hashKey(key) % timelinePalette.length];
}


export function pickColorForIntegration(
  integ: Integration,
  index?: number
): string {
  const stable = String(integ.id ?? integ.name ?? "");
  return pickBgColor(undefined, stable);
}
