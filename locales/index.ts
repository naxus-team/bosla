import { en_us } from "./en_us";
import { ar_gl } from "./ar_gl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const languages = {
  en_us,
  ar_gl,
};

const defaultValues = {
  globals: {
    app_name: "Bosla",
  },
  types: {
    drive: "Drive",
    hotel: "Hotel",
  },
};

type LangType = keyof typeof languages;

let currentLang: LangType = "ar_gl";

// تحميل اللغة المخزنة عند بداية التشغيل
export async function loadLang() {
  try {
    const saved = await AsyncStorage.getItem("lang");
    if (saved && saved in languages) {
      currentLang = saved as LangType;
    }
  } catch (e) {
    console.warn("Error loading language:", e);
  }
}

export async function setLang(lang: LangType) {
  currentLang = lang;
  try {
    await AsyncStorage.setItem("lang", lang);
  } catch (e) {
    console.warn("Error saving language:", e);
  }
}

export function getLang(): LangType {
  return currentLang;
}

export function t(path: string): string {
  const keys = path.split(".");
  let result: any = languages[currentLang];
  let fallback: any = defaultValues;

  for (const key of keys) {
    result = result?.[key];
    fallback = fallback?.[key];
  }
  return result ?? fallback ?? path;
}
