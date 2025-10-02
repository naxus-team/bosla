import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useLog } from "../components/contexts/LogContext";
import * as RNLocalize from "react-native-localize";
import { getCurrentSettings } from "../components/hook/defaults";
import { updateData } from "../components/storage";
import { en_us } from "./en_us";
import { ar_gl } from "./ar_gl";

const languages = { en_us, ar_gl };
type LangType = keyof typeof languages;

type LanguageContextType = {
  lang: LangType;
  setLang: (lang: LangType | "default") => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en_us",
  setLang: () => { },
  t: (path: string) => path,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { addLog } = useLog();
  const locales = RNLocalize.getLocales();
  const systemLang = Array.isArray(locales) ? locales[0].languageCode : "en";

  const [lang, setLangState] = useState<LangType>("en_us");

  useEffect(() => {
    const init = async () => {
      try {
        const settings = await getCurrentSettings();
        const langFromSettings = settings?.language;

        if (langFromSettings && langFromSettings in languages) {
          setLangState(langFromSettings as LangType);
        } else {
          // fallback to system language
          if (systemLang === "ar") setLangState("ar_gl");
          else setLangState("en_us");
        }
        addLog({ type: "info", from: "LANG", message: `Switch Language ${systemLang}` })
      } catch (e) {
        console.warn("Error initializing language:", e);
        addLog({ type: "info", from: "LANG", message: `Error initializing language ${e}` })
        setLangState("en_us");
      }
    };

    init();
  }, []);

  const setLang = async (newLang: LangType | "default") => {
    let finalLang: LangType = "en_us";

    if (newLang === "default") {
      finalLang = systemLang === "ar" ? "ar_gl" : "en_us";
    } else if (newLang in languages) {
      finalLang = newLang as LangType;
    }

    setLangState(finalLang);
    try {
      await updateData("settings", { language: finalLang });
      addLog({ type: "info", from: "LANG", message: `Switch Language ${finalLang}` })
    } catch (e) {
      console.warn("Error updating language:", e);
      addLog({ type: "info", from: "LANG", message: `Error updating language ${e}` })
    }

    return true;
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let result: any = languages[lang];
    for (const key of keys) result = result?.[key];
    return result ?? path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
