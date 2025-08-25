import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("dark mode variables", () => {
  it("includes ring color in the dark theme block", () => {
    const cssPath = path.resolve(__dirname, "../index.css");
    const css = fs.readFileSync(cssPath, "utf8");
    const match = /\.dark\s*\{([^}]+)\}/.exec(css);
    expect(match).not.toBeNull();
    expect(match![1]).toContain("--ring: var(--primary);");
  });
});
