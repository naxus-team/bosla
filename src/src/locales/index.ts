import { en_us } from "./en_us";
import { ar_gl } from "./ar_gl";
import { ar_gcc } from "./ar_gcc";
import { ar_eg } from "./ar_eg";

const languages = {
  en_us,
  ar_gl,
  ar_gcc,
  ar_eg,
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

let currentLang: LangType = (localStorage.getItem("lang") as LangType) || "en_us";

export function setLang(lang: LangType) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
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
