// src/lang/index.ts
import { en } from "./en";
import { ar } from "./ar";

const languages = {
  en,
  ar,
};

type LangType = keyof typeof languages;

let currentLang: LangType = localStorage.getItem("lang") as LangType || "en";

export function setLang(lang: LangType) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
}

export function t(path: string): string {
  const keys = path.split(".");
  let result: any = languages[currentLang];
  for (const key of keys) {
    if (!result[key]) return path;
    result = result[key];
  }
  return result;
}
