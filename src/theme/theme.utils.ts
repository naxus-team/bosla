
import { ThemeType } from "./theme.types";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./theme.config";

// جلب الثيم الحالي من التخزين أو الافتراضي
export function getTheme(): ThemeType {
  return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeType) || DEFAULT_THEME;
}

// ضبط الثيم
export function setTheme(theme: ThemeType) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

// تطبيق الثيم على DOM
export function applyTheme(theme: ThemeType) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// تهيئة الثيم عند بدء التشغيل
export function initTheme() {
  const savedTheme = getTheme();
  applyTheme(savedTheme);
}
