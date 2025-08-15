import { useState, useEffect } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';

import { getLang, setLang } from "./locales";

import { getTheme, setTheme, initTheme, ThemeType } from "./theme";



import { useRoutes } from "react-router-dom";
import routes from "./route";
import { t } from "./locales";


function App() {
  const [theme, setThemeState] = useState<ThemeType>(getTheme());
  useEffect(() => {
    document.title = `${t("app.name")}`;
    document.documentElement.dir = getLang() === "ar" ? "rtl" : "ltr";
    setLang("ar");
    setTheme("light");
    initTheme();
    setThemeState(getTheme());
    const handleThemeChange = () => {
      const newTheme = getTheme();
      setThemeState(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  }, []);
  const routing = useRoutes(routes);
  return routing;
}

export default App;
