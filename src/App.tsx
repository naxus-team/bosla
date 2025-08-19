/*
Copyright (c) 2025 Bosla

All rights reserved.
This software and brand ("Bosla") are proprietary and under development as part of a private company initiative.
The company is currently in pre-registration status and not yet formally incorporated.
No part of this software, its name, or associated trademarks may be copied, modified, or redistributed without explicit permission from Bosla.
*/

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
    document.documentElement.dir = getLang() === "ar_gl"
      ||
      getLang() === "ar_gcc"
      ||
      getLang() === "ar_eg"
      ? "rtl" : "ltr";

    setLang("ar_gcc");
    setTheme("dark");
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
