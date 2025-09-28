import "./global.css";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BootSplash from "react-native-bootsplash";
import { Navigate } from "react-router-native";

import { StatusBar, I18nManager, Alert, View, LogBox } from "react-native";
import { NativeRouter, useRoutes } from "react-router-native";
import RNRestart from "react-native-restart";
import { ToastProvider } from "./providers/ToastProvider";

import { loadLang, getLang, setLang } from "./locales";
import { getTheme, setTheme, initTheme, ThemeType } from "./theme";
import routes from "./components/Router";
import { setVibration } from "./components/hook/vibrations";
import { createNotificationChannel, setNotificationsEnabled } from "./components/hook/notifications";
import notifee, { EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';


function AppRoutes() {
  const element = useRoutes(routes);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5", flexDirection: "row", direction: "rtl" }}>
        <ToastProvider>
          {element}
        </ToastProvider>
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
    const init = async () => {
      await notifee.deleteChannel('default');

      const permission = await notifee.requestPermission();
      await notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS) {
          const screen = detail.notification?.data?.screen;
          const userId = detail.notification?.data?.userId;
          console.log(screen)
        }
      });
      await createNotificationChannel();
      await setNotificationsEnabled(true);
      await setVibration(true);
      console.log('Notification permission:', permission);
      BootSplash.hide({ fade: true });
    };

    init();

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
