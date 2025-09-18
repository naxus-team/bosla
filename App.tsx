import "./global.css";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BootSplash from "react-native-bootsplash";

import { StatusBar, I18nManager, Alert, View } from "react-native";
import { NativeRouter, useRoutes } from "react-router-native";
import RNRestart from "react-native-restart";

import { loadLang, getLang, setLang } from "./locales";
import { getTheme, setTheme, initTheme, ThemeType } from "./theme";
import routes from "./components/Router";

function AppRoutes() {
  const element = useRoutes(routes);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", flexDirection: "row", direction: "rtl" }}>
        {element}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [theme, setThemeState] = useState<ThemeType>("light");

  useEffect(() => {
    // Load Language
    loadLang();
    const lang = getLang();
    const shouldBeRTL = ["ar_gl"].includes(lang);

    if (lang === "ar_gl") {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    // Default Language
    setLang("ar_gl");

    setIsReady(true);
  }, []);

  useEffect(() => {
    // 👇 لازم تخفي BootSplash لما كل حاجة تجهز
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <NativeRouter>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <AppRoutes />
    </NativeRouter>
  );
}
