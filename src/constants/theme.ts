export type Theme = "blue" | "pink" | "green" | "orange" | "red";

export const themeColors: Record<Theme, string> = {
  blue: "#007AFF",
  pink: "#FF2D55",
  green: "#4CD964",
  orange: "#FF9500",
  red: "#FF3B30",
};

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace(/^#/, "");
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((x) => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("")}`;
}

export function getRingColor(theme: Theme, amount = 0.5): string {
  const [r, g, b] = hexToRgb(themeColors[theme]);
  const ringR = r + (255 - r) * amount;
  const ringG = g + (255 - g) * amount;
  const ringB = b + (255 - b) * amount;
  return rgbToHex(ringR, ringG, ringB);
}
