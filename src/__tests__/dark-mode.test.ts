import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("dark mode focus ring", () => {
  it("uses Tailwind ring color variable", () => {
    const cssPath = path.resolve(__dirname, "../styles/dark-mode.css");
    const css = fs.readFileSync(cssPath, "utf8");
    const match = /\.dark\s+input:focus\s*\{([^}]+)\}/.exec(css);
    expect(match).not.toBeNull();
    expect(match![1]).toContain("--tw-ring-color: hsl(var(--ring));");
  });
});
