"use client";

import { useEffect, useState } from "react";

type ThemeOption = "default" | "dark";

const STORAGE_KEY = "site-theme";

function applyTheme(theme: ThemeOption) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeSelect() {
  const [theme, setTheme] = useState<ThemeOption>("default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeOption | null;
    const initialTheme: ThemeOption = saved === "dark" ? "dark" : "default";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const handleChange = (nextTheme: ThemeOption) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-soft">
      Theme
      <select
        aria-label="Theme selector"
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-brand-600"
        value={theme}
        onChange={(event) => handleChange(event.target.value as ThemeOption)}
      >
        <option value="default">Default</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
