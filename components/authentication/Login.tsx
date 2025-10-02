import { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  Dimensions,
  Vibration,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView, Platform
} from "react-native";
import { Btn } from "../reusable";

import { Navigate } from "react-router-native";

import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from "react-native-popup-menu";
import * as Animatable from "react-native-animatable";
import Animated from "react-native-reanimated";
import { useDirectionalAnimations } from "../animations";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from "../../locales";
import BottomSheet from "../shared/BottomSheet";
import CountrySelector from "../shared/CountrySelector";
import { countryCodeMap } from "../../locales/countryCodeMap";
import { useAuth } from "../hook/useAuth";
import { User, StorageKeys } from "../types";
import uuid from "react-native-uuid";
import { setData, getData } from "../storage";
import { CountriesProvider, useCountries } from "../../providers/CountriesProvider";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Input, Dropdown } from "../reusable";
import { useFonts } from "../utils/font";
import { SmartphoneIcon } from "lucide-react-native";
import { vibrate } from "../hook/vibrations";
const { height } = Dimensions.get("window");

export function AuthLogin() {
  const { EnteringFromRight, ExitingToLeft, EnteringFromLeft, ExitingToRight } = useDirectionalAnimations();
  const insets = useSafeAreaInsets();
  const { lang, t } = useLanguage();
  const fonts = useFonts();
  const [goDashboard, setGoDashboard] = useState(false);
  const { loading, authorized } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const [number_phone, setValueNumberPhone] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [otp_code, setValueOtpCode] = useState("");
  const [showSheet, setShowSheet] = useState(false);
  const [countries, setCountries] = useState<[string, string][]>([]);
  const [countryCode, setCountryCode] = useState("eg");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState("");
  const [SelectDial, setSelectDial] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const entries = Object.entries(countryCodeMap);
    setCountries(entries);
  }, []);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const goToStep = (newStep: "phone" | "otp") => {
    setIsAnimating(true);
    setStep(newStep);
    setTimeout(() => setIsAnimating(false), 300);
  };
  const handlePress = async () => {
    setData<string>(StorageKeys.Token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
    const user: User = {
      clientId: uuid.v4().toString(),
      firstname: "أحمد",
      lastname: "ياسر",
      username: "ahmedyasser",
      email: "ahmedyaser@hotmail.com",
      dial: "+20",
      phone: "1019785597",
      avatar: "https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/552195197_1301750204741436_4684378411474012091_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=cn3Tb8PK1JcQ7kNvwGC2dy-&_nc_oc=Adl00It8JAFfHLna6ln3cHgZysyNz-RLTwuWpqdTBeWMFvFUhsLrvE6h7IyhKSzP8pQ&_nc_zt=23&_nc_ht=scontent.fcai30-1.fna&_nc_gid=AsCkkskeyXY27lvkmJav3A&oh=00_AfZpy7p74aeL0WuHSiksn7cXzvVewpa99pBHdxbTUXscSQ&oe=68DBF8CC",
      role: "user",
      bio: "",
      verify: true,
      createdAt: new Date().toISOString(),
    };
    setData<User>(StorageKeys.User, user);
    setGoDashboard(true);
  };

  if (goDashboard || authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <View style={[styles.safeArea, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      direction: lang === "ar_gl" ? "rtl" : "ltr"
    }]} pointerEvents={isAnimating ? "none" : "auto"}>
      <CountriesProvider>
        {step === "phone" && (
          <Animated.View key="phone" entering={EnteringFromRight} exiting={ExitingToRight}>
            <MenuProvider>

              {/* Logo & Title */}
              <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80} // تقدر تزود/تنقص حسب مكان الـ header
              >
                <View style={styles.header}>
                  {/* <Logo /> */}
                  <Text style={styles.title}>
                    {t("login.default")} {t("common.to")} {t("app.name")}
                  </Text>
                  <Text style={styles.subtitle}>
                    {t("login.phone_confirm.a")} {t("login.phone_confirm.b")}
                  </Text>
                </View>

                {/* Inputs */}
                <View style={styles.form}>
                  <Dropdown
                    label={t("countries.country")}
                    value={SelectedCountry}
                    onPress={() => setShowSheet(true)}
                    data={countryCode}
                  />
                  <Input
                    label={t("login.phone_number")}
                    value={number_phone}
                    onChangeText={setValueNumberPhone}
                    onPressablePress={() => { setShowSheet(true) }}
                    keyboardType="phone-pad"
                    maxLength={11}
                    pressableContent={
                      SelectDial && <Text style={styles.dialText}>{SelectDial}+</Text>
                    }
                  />
                </View>

                {/* Next Button */}
                <View style={styles.buttonWrapper}>
                  <Btn
                    label={t("common.next")}
                    style={{
                      background: "rgba(0,0,0,1)",
                      pressedBackground: "rgba(0,0,0,.8)",
                      colorText: "white",
                      radius: 48,
                      height: 48,
                      fullWidth: true,
                      animationSpeed: 100,
                      textAlign: "center",
                      animationType: "default",
                    }}
                    onPress={() => { goToStep("otp"); vibrate(60) }}
                    customize={
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 16, width: 192 }}>
                        <Text
                          style={styles.buttonText}
                        >
                          {t("common.next")}
                        </Text>
                      </View>
                    }

                  />
                </View>

              </KeyboardAvoidingView>
            </MenuProvider>
          </Animated.View>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <Animated.View
            key="otp"
            entering={EnteringFromLeft}
            exiting={ExitingToLeft}
            style={{ width: "100%" }}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                {/* <Logo /> */}
                <SmartphoneIcon size={32} color="rgba(0,0,0,0.25)" />

                <Text style={styles.title}>
                  {t("login.default")} {t("common.to")} {t("app.name")}
                </Text>
                <Text style={styles.subtitle}>
                  {t("login.phone_confirm.a")} {t("login.phone_confirm.b")}
                </Text>
                <Text style={styles.otpNumber} onPress={() => goToStep("phone")}>
                  +{SelectDial}
                  {number_phone}
                </Text>
              </View>

              {/* OTP Input */}
              <View style={styles.form}>
                <Input
                  label={t("login.phone_verify")}
                  value={otp_code}
                  onChangeText={setValueOtpCode}
                  keyboardType="phone-pad"
                  maxLength={6}
                />
              </View>

              {/* Confirm Button */}
              <View style={styles.buttonWrapper}>
                <Btn
                  label={t("common.next")}
                  style={{
                    background: "rgba(0,0,0,1)",
                    pressedBackground: "rgba(0,0,0,.8)",
                    colorText: "white",
                    radius: 48,
                    height: 48,
                    fullWidth: true,
                    animationSpeed: 100,
                    textAlign: "center",
                    animationType: "default",
                  }}
                  onPress={() => { handlePress() }}
                  customize={
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 16, width: 192 }}>
                      <Text
                        style={styles.buttonText}
                      >
                        {t("common.confirm")}
                      </Text>
                    </View>
                  }

                />
              </View>
            </View>
          </Animated.View>
        )}
        {/* Country Selector */}
        <BottomSheet visible={showSheet} onClose={() => setShowSheet(false)}>
          <Input
            iconContent={
              <MagnifyingGlassIcon color={"rgba(0,0,0,0.4)"} size={24} strokeWidth={2} />
            }
            label={t("common.search")}
            value={searchNumber}
            onChangeText={setSearchNumber}
          />
          <CountrySelector
            onSelect={(code, name, dial) => {
              setShowSheet(false);
              setCountryCode(code);
              setSelectedCountry(name);
              setSelectDial(dial);
            }}
          />
        </BottomSheet>
      </CountriesProvider>
    </View >
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  container: {
    flex: 1,
    padding: 24,
    paddingHorizontal: 0,

  },
  menuContainer: {
    height: 52,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 16
  },
  menuTrigger: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  menuOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuOptionText: {
    fontSize: 16,
    color: "#333",
  },
  header: {
    height: 228,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: "rgba(0,0,0,0.6)",
    textAlign: "center",
  },
  form: {
    height: 300,
    padding: 24,
    paddingTop: 0,
    width: "100%",
    gap: 16,
  },
  dialText: {
    fontSize: 18,
    color: "#000",
  },
  buttonWrapper: {
    position: "absolute",
    top: height - 96,
    width: "100%",
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#EE0F38",
    borderRadius: 30,
    overflow: "hidden",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  otpTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
  otpNumber: {
    fontSize: 18,
    color: "#EE0F38",
    textAlign: "center",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.6)",
  },
  resendLink: {
    fontSize: 14,
    color: "#EE0F38",
  },
});
