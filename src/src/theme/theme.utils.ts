
import { ThemeType } from "./theme.types";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./theme.config";


export function getTheme(): ThemeType {
  return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeType) || DEFAULT_THEME;
}


export function setTheme(theme: ThemeType) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}


export function applyTheme(theme: ThemeType) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}


export function initTheme() {
  const savedTheme = getTheme();
  applyTheme(savedTheme);
}
