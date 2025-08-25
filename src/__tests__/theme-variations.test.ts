import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const themes = ["blue", "pink", "yellow"] as const;

describe("theme variations", () => {
  it("defines dark mode overrides for each theme", () => {
    const cssPath = path.resolve(__dirname, "../index.css");
    const css = fs.readFileSync(cssPath, "utf8");

    for (const theme of themes) {
      const pattern = new RegExp(
        `\\.dark \\[data-theme="${theme}"\\],\\s*\\[data-theme="${theme}"\\]\\.dark`,
      );
      expect(pattern.test(css)).toBe(true);
    }
  });
});
