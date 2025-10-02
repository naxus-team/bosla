import "./global.css";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BootSplash from "react-native-bootsplash";
import { StatusBar } from "react-native";
import { NativeRouter, useRoutes } from "react-router-native";
import { ToastProvider } from "./providers/ToastProvider";
import { LogProvider } from "./components/contexts/LogContext";
import { LanguageProvider } from "./locales";
import routes from "./components/Router";
import { initDefaultSettings } from "./components/hook/defaults";
import { SettingsProvider } from "./components/contexts/SettingsContext";
import { createNotificationChannel, setNotificationsEnabled } from "./components/hook/notifications";
import notifee, { EventType } from '@notifee/react-native';


function AppRoutes() {
  const element = useRoutes(routes);
  return (
    <LogProvider>
      <LanguageProvider>
        <SettingsProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6", flexDirection: "row" }}>
              <ToastProvider>
                {element}
              </ToastProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </SettingsProvider>
      </LanguageProvider>
    </LogProvider>
  );
}
export default function App() {
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
      await initDefaultSettings();
      console.log('Notification permission:', permission);
      BootSplash.hide({ fade: true });
    };
    init();
  }, []);
  return (
    <NativeRouter>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent" />
      <AppRoutes />
    </NativeRouter>
  );
}
