// theme.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeType } from "./theme.types";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./theme.config";

// قراءة الثيم من AsyncStorage أو استخدام الافتراضي
export async function getTheme(): Promise<ThemeType> {
  try {
    const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return (saved as ThemeType) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

// حفظ الثيم وتطبيقه
export async function setTheme(theme: ThemeType) {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.warn("Failed to save theme:", e);
  }
}

// تهيئة الثيم عند بدء التطبيق
export async function initTheme(): Promise<ThemeType> {
  return await getTheme();
}
