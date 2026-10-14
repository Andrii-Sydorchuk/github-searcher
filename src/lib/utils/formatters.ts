import languageColors from "gh-lang-colors";

export function formatCompactNumber(num?: number): string {
  if (typeof num !== "number" || isNaN(num)) return "0";
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export function getLanguageColor(language?: string | null): string {
  if (!language) return "#8b949e";
  return languageColors[language as keyof typeof languageColors] || "#8b949e";
}
