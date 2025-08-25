import React from "react";
import { useTheme } from "@/contexts/simple-theme-context";
import { themeColors, Theme } from "@/constants/theme";
import "./theme-selector.css";

const themeOptions = Object.keys(themeColors) as Theme[];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  // No dark mode functionality - app is permanently dark theme

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Theme Color Buttons - Visible on mobile */}
      <div className="flex items-center space-x-2">
        {themeOptions.map((id) => (
          <button
            key={id}
            data-theme={id}
            onClick={() => setTheme(id)}
            className={`theme-button w-11 h-11 rounded-full border-2 border-primary shadow-md transition-all bg-primary focus-visible:ring-2 focus-visible:ring-offset-2 ${
              theme === id ? "ring-2" : ""
            }`}
            aria-label={`${id.charAt(0).toUpperCase() + id.slice(1)} theme`}
          />
        ))}
      </div>

      {/* Dark mode toggle removed - app is now permanently dark theme */}
    </div>
  );
}
