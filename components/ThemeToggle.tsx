"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors hover:bg-foreground/5 rounded-md flex items-center justify-center relative w-9 h-9"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 absolute scale-0 transition-transform dark:scale-100" />
      <Moon className="h-5 w-5 absolute scale-100 transition-transform dark:scale-0" />
    </button>
  );
}
