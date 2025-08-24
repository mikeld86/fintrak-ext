import { useTheme } from "@/contexts/simple-theme-context";

type ThemeOption = {
  id: "blue" | "pink" | "green" | "orange" | "red";
  color: string;
  ringClass: string;
};

const themeOptions: ThemeOption[] = [
  { id: "blue", color: "bg-[#007AFF]", ringClass: "ring-blue-300" },
  { id: "pink", color: "bg-[#FF2D55]", ringClass: "ring-pink-300" },
  { id: "green", color: "bg-[#4CD964]", ringClass: "ring-green-300" },
  { id: "orange", color: "bg-[#FF9500]", ringClass: "ring-orange-300" },
  { id: "red", color: "bg-[#FF3B30]", ringClass: "ring-red-300" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  // No dark mode functionality - app is permanently dark theme

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Theme Color Buttons - Hidden on mobile */}
      <div className="hidden md:flex items-center space-x-2">
          {themeOptions.map(({ id, color, ringClass }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`w-10 h-4 rounded-full border-2 shadow-md transition-all ${color} ${
                theme === id
                  ? `border-white ring-2 ${ringClass}`
                  : "border-gray-300"
              }`}
              aria-label={`${id.charAt(0).toUpperCase() + id.slice(1)} theme`}
            />
          ))}
      </div>

      {/* Dark mode toggle removed - app is now permanently dark theme */}
    </div>
  );
}
