import React from "react";
import { useTheme } from "@/contexts/simple-theme-context";
import { themeColors, getRingColor, Theme } from "@/constants/theme";

const themeOptions = Object.keys(themeColors) as Theme[];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  // No dark mode functionality - app is permanently dark theme

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Theme Color Buttons - Hidden on mobile */}
      <div className="hidden md:flex items-center space-x-2">
        {themeOptions.map((id) => {
          const ring = getRingColor(id);
          return (
            <button
              key={id}
              data-theme={id}
              onClick={() => setTheme(id)}
              style={{
                // Provide color tokens for tailwind utility classes
                "--primary": themeColors[id],
                ...(theme === id ? { "--tw-ring-color": ring } : {}),
              } as React.CSSProperties}
              className={`w-10 h-4 rounded-full border-2 shadow-md transition-all bg-primary ${
                theme === id ? "border-white ring-2" : "border-gray-300"
              }`}
              aria-label={`${id.charAt(0).toUpperCase() + id.slice(1)} theme`}
            />
          );
        })}
      </div>

      {/* Dark mode toggle removed - app is now permanently dark theme */}
    </div>
  );
}
