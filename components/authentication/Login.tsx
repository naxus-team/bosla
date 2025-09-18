import { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from "react-native-popup-menu";
import * as Animatable from "react-native-animatable";
import Animated, {
  Keyframe,
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
  SlideInRight,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
  runOnJS
} from "react-native-reanimated";
import { EnteringFromRight, ExitingToLeft, ExitingToRight, EnteringFromLeft } from "../animations";


import Orientation from 'react-native-orientation-locker';
import { t, getLang } from "../../locales";
import * as Ico from "lucide-react-native";
import BottomSheet from "../shared/BottomSheet";
import CountrySelector from "../shared/CountrySelector";
import { countryCodeMap } from "../../locales/countryCodeMap";
import Logo from "../utils/Logo"

import { setData, getData, removeData } from "../storage";


import { CountriesProvider, useCountries } from "../../providers/CountriesProvider";
import { Input, Dropdown } from "../reusable";

const { height } = Dimensions.get("window");


export function AuthLogin() {
  const [isAnimating, setIsAnimating] = useState(false);

  const [number_phone, setValueNumberPhone] = useState("");
  const [otp_code, setValueOtpCode] = useState("");

  const [showSheet, setShowSheet] = useState(false);
  const [countries, setCountries] = useState<[string, string][]>([]);
  const [countryCode, setCountryCode] = useState("eg");

  useEffect(() => {
    // تحميل البيانات (محلي أو من API)
    const loadData = async () => {
      // لو من API هتستخدم fetch هنا
      const entries = Object.entries(countryCodeMap);
      setCountries(entries);
    };

    loadData();
  }, []);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const { currentCountry } = useCountries();
  const [SelectedCountry, setSelectedCountry] = useState("");
  const [SelectDial, setSelectDial] = useState("");


  const [step, setStep] = useState<"phone" | "otp">("phone");
  const goToStep = (newStep: "phone" | "otp") => {
    setIsAnimating(true); // قفل اللمس
    setStep(newStep);

    // بعد 300ms (مدة الانيميشن) افتح اللمس تاني
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handlePress = async () => {
    Vibration.vibrate(60);
    await setData("token", "abc123xyz");
  };

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const t = await getData("token");
      setToken(t);
    };
    fetchToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} pointerEvents={isAnimating ? "none" : "auto"}>
      <CountriesProvider>
        {step === "phone" && (
          <Animated.View
            key="phone"
            entering={EnteringFromRight}
            exiting={ExitingToRight}
          >


            <MenuProvider>
              <View className='flex-1 w-full items-center justify-center bg-background overflow-auto gap-8'>

                <View className="h-screen w-full items-center px-6 gap-8" style={{ height: height - 128 }}>
                  <View style={{ flexDirection: "row", justifyContent: "flex-end" }} className='flex w-full'>

                    <Menu>
                      <MenuTrigger style={{
                        width: 24,
                        height: 38,
                        borderRadius: 200
                      }}>
                        <Ico.EllipsisVertical size={24} color="#242424" />
                      </MenuTrigger>
                      <MenuOptions
                        customStyles={{
                          optionsContainer: {
                            marginTop: 35, // ينزل المنيو تحت الزرار
                            borderRadius: 16,
                            padding: 0,
                            elevation: 24,
                            overflow: "hidden", // عشان الانيميشن يبان نضيف
                          },
                        }}
                      >
                        <Animatable.View animation="fadeInDown" duration={200}>

                          <MenuOption>
                            <View className="active:bg-black/10 rounded-xl">
                              <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-Regular" : "NotoSans-Regular", padding: 10 }}>مساعدة</Text>
                            </View>
                          </MenuOption>
                          <MenuOption>
                            <View className="active:bg-black/10 rounded-xl">
                              <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-Regular" : "NotoSans-Regular", padding: 10 }}>الإعدادات</Text>
                            </View>
                          </MenuOption>
                          <MenuOption>
                            <View className="active:bg-black/10 rounded-xl">
                              <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-Regular" : "NotoSans-Regular", padding: 10 }}>حول التطبيق</Text>
                            </View>
                          </MenuOption>
                        </Animatable.View>

                      </MenuOptions>

                    </Menu>
                  </View>
                  <View className="flex-1 justify-center items-center w-full h-full gap-8">
                    <View className='flex items-center'>
                      <Logo />
                    </View>
                    <View className='gap-4'>
                      <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold" }} className="text-xl text-center text-black"
                      >
                        {t("login.default")} {t("common.to")} {t("app.name")}
                      </Text >
                      <View>
                        <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-Regular" : "NotoSans-Regular" }} className="text-sm text-center text-black/60"
                        >
                          {t("login.phone_confirm.a")} {t("login.phone_confirm.b")}
                        </Text >

                      </View>
                    </View>
                  </View>

                  <View className="flex-1 justify-center items-start w-full gap-8"
                    style={[

                      { justifyContent: "flex-start" }, // { justifyContent: keyboardVisible ? "flex-start" : "center" },
                    ]}>
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
                      keyboardType="phone-pad"
                      maxLength={11}
                      pressableContent={
                        <Text
                          style={{
                            fontFamily: getLang().startsWith("ar")
                              ? "NotoSansArabic-SemiBold"
                              : "NotoSans-SemiBold",
                          }}
                          className="text-xl text-black bg-white"
                          numberOfLines={1}
                          ellipsizeMode="clip"
                        >
                          {SelectDial}+
                        </Text>
                      }
                    />
                  </View>
                </View>

                <View className={`relative flex ${getLang().startsWith("ar") ? "flex-row-reverse" : "flex-row"} ${getLang().startsWith("ar") ? "items-start" : "items-end"} justify-center w-full`}>
                  <Pressable
                    className='flex bg-primary rounded-full'
                    android_ripple={{ color: "rgba(0,0,0,1)", radius: 200, borderless: false }}
                    style={{ overflow: "hidden" }}
                    onPress={() => {
                      Vibration.vibrate(60);
                      goToStep("otp");
                    }}
                  >
                    <Animated.View
                      className="flex flex-row items-center justify-center px-4 py-3 rounded-full w-[148px] h-[52px] gap-4"
                    >
                      <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold" }} className="text-lg text-white">
                        {t("common.next")}
                      </Text >
                      <Ico.ArrowLeft size={24} color="#ffffff" />
                    </Animated.View>
                  </Pressable>
                </View>
                <BottomSheet
                  visible={showSheet}
                  onClose={() => setShowSheet(false)}
                  height={400}
                >
                  <CountrySelector onSelect={(code, name, dial) => { setShowSheet(false); setCountryCode(code); setSelectedCountry(name); setSelectDial(dial) }} />
                </BottomSheet>
              </View>
            </MenuProvider>
          </Animated.View>

        )}

        {step === "otp" && (
          <Animated.View
            key="otp"
            entering={EnteringFromLeft}
            exiting={ExitingToLeft}
            style={{ width: "100%" }}
          >
            <MenuProvider>
              <View className='flex-1 w-full items-center justify-center bg-background overflow-auto gap-8'>

                <View className="h-screen w-full items-center px-6 gap-8" style={{ height: height - 182 }}>
                  <View className="flex-1 justify-center items-center w-full h-full gap-8">
                    <View className='gap-4'>
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Ico.Smartphone size={32} color={`rgba(0,0,0,0.25)`} />
                      </View>
                      <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold" }} className="text-xl text-center text-black"
                      >
                        {t("login.phone_confirm.z")}
                      </Text >
                      <View>
                        <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-Regular" : "NotoSans-Regular" }} className="text-sm text-center text-black/60"
                        >
                          {t("login.phone_confirm.c")} {t("login.phone_confirm.d")}
                        </Text >


                      </View>
                      <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold", direction: "ltr" }} className="text-lg text-center text-primary"
                        onPress={() => {
                          Vibration.vibrate(60);
                          goToStep("phone");
                        }}
                      >
                        +{SelectDial}{number_phone}
                      </Text >
                    </View>
                  </View>

                  <View className="flex-1 justify-center items-start w-full gap-4"
                    style={[

                      { justifyContent: "flex-start" },
                    ]}>
                    <Input
                      label={t("login.phone_verify")}
                      value={otp_code}
                      onChangeText={setValueOtpCode}
                      keyboardType="phone-pad"
                      maxLength={6}
                    />
                    <View className='px-4 flex items-center flex-row gap-2'>
                      <Text
                        style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-Regular" : "NotoSans-Regular" }} className="text-base text-center text-black/60">
                        {t("login.phone_confirm.n")}
                      </Text>
                      <Pressable>
                        <Text
                          style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold" }} className="text-base text-center text-primary">
                          {t("login.phone_confirm.resend")}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View className={`relative flex ${getLang().startsWith("ar") ? "flex-row-reverse" : "flex-row"} ${getLang().startsWith("ar") ? "items-start" : "items-end"} justify-center w-full`}>
                  <Pressable
                    className='flex bg-primary rounded-full'
                    android_ripple={{ color: "rgba(0,0,0,1)", radius: 200, borderless: false }}
                    style={{ overflow: "hidden" }}
                    onPress={() => handlePress}
                  >
                    <Animated.View
                      className="flex flex-row items-center justify-center px-4 py-3 rounded-full w-[148px] h-[52px] gap-4"

                    >
                      <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold" }} className="text-lg text-white">
                        {t("common.confirm")}
                      </Text >
                      <Ico.ArrowLeft size={24} color="#ffffff" />
                    </Animated.View>
                  </Pressable>
                </View>
              </View>
            </MenuProvider >
          </Animated.View>
        )}
      </CountriesProvider >
    </View>

  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  layer: { width: "100%", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 20 },
});