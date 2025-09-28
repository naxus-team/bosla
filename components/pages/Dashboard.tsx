import BottomNav from "../shared/BottomNav";
import SlidePanel, { SlidePanelHandle } from "../reusable/SlidePanel";
import MapView from "../shared/Map/MapView";

import { Btn } from "../reusable";
import { ArrowRightIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button, Animated, Easing } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Frame } from "../frame";
import { Fonts } from "../utils/font";
import { colors as color } from "../../theme/colors";
import { UserProvider } from "../contexts/UserContext";
import { SettingsProvider } from "../contexts/SettingsContext";



import { EnteringFromRight, ExitingToLeft, ExitingToRight, EnteringFromLeft } from "../animations";

import { SquareServices } from "../layers";
import { vibrate } from "../hook/vibrations"
import Account from "../layers/Account";
import { t, getLang } from "../../locales";

import statusNetwork from "../hook/statusNetwork";
import Settings from "../layers/Settings";

import { Camera, useCameraDevices, CameraDevice, CameraPermissionStatus, useCameraDevice } from 'react-native-vision-camera';
import { Cog6ToothIcon } from "react-native-heroicons/solid";


const { width, height } = Dimensions.get("window");

type StepType = "services" | "contacts" | "account";

type DashboardProps = {
    slideOpen?: (status: boolean, typeSlide: string) => void
};


export function Dashboard({ slideOpen }: DashboardProps) {

    const [permission, setPermission] = useState<"pending" | "granted" | "denied">("pending");
    const device = useCameraDevice("back");

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setPermission(status); // "granted" | "denied"
        })();
    }, []);


    const isOnline = statusNetwork();

    const [isAnimating, setIsAnimating] = useState(false);
    const insets = useSafeAreaInsets();
    const MapRef = useRef<SlidePanelHandle>(null);
    const NotificationsRef = useRef<SlidePanelHandle>(null);

    const SettingsRef = useRef<SlidePanelHandle>(null);
    const translateX = useRef(new Animated.Value(0)).current;


    const [section, setSection] = useState<{ status: boolean }>();

    const handleSlideOpen = (status: boolean, typeSlide?: string) => {
        let toValue = 0;

        if (status) {
            toValue = width / 6;
            if (typeSlide === "map") MapRef.current?.open();
            if (typeSlide === "notifications") NotificationsRef.current?.open();

            if (typeSlide === "contacts") SettingsRef.current?.open();
            if (typeSlide === "settings") {
                SettingsRef.current?.open();
            };
        } else {
            toValue = 0;
            if (typeSlide === "map") MapRef.current?.close();
            if (typeSlide === "notifications") NotificationsRef.current?.close();

            if (typeSlide === "contacts") SettingsRef.current?.close();
            if (typeSlide === "settings") SettingsRef.current?.close();
        }

        Animated.timing(translateX, {
            toValue,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };


    const [step, setStep] = useState<StepType>("account");

    return (
        <UserProvider>
            <SettingsProvider>
                <View style={[styles.safeArea, {
                    paddingTop: insets.top,   // محتوى بعيد عن status bar
                    paddingBottom: insets.bottom, // بعيد عن bottom safe area
                }]}>
                    <View style={{ position: "absolute", width: "100%", top: 0, bottom: 0 }}>
                        <Animated.View
                            style={[
                                styles.animatedBox,
                                {
                                    transform: [{ translateX }],
                                },
                            ]}
                        >
                            {step === "services" &&
                                <View
                                    key="services"
                                    style={[styles.container, { height: Frame() - 52 }]}>

                                    <SquareServices slideOpen={handleSlideOpen} />
                                </View>
                            }


                            {step === "account" &&
                                <View
                                    key="account"
                                    style={[styles.container, { height: Frame() - 52 }]}>

                                    <Account slideOpen={handleSlideOpen} />
                                </View>
                            }

                            <BottomNav
                                control={(stepTab) => setStep(stepTab)} activeTab={step}
                            />
                        </Animated.View>
                    </View>
                    <SlidePanel ref={MapRef}>
                        <MapView />
                        <View style={[styles.header, { top: 30 }]}>
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 16,
                                    height: 38,
                                    width: 38,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    textAlign: "center",
                                    animationType: "default",
                                    elevation: 4
                                }}
                                onPress={() => {
                                    vibrate(60);
                                    handleSlideOpen(false, "map");
                                }}
                                customize={<ArrowRightIcon color={"rgba(0,0,0,1)"} size={24} strokeWidth={2} />}
                            />
                        </View>
                    </SlidePanel>

                    <SlidePanel ref={NotificationsRef}>
                        <View style={[styles.header]}>
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 16,
                                    height: 38,
                                    width: 38,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    textAlign: "center",
                                    animationType: "default",
                                }}
                                onPress={() => {
                                    vibrate([0, 60, 100, 60]);
                                    handleSlideOpen(false, "notifications");
                                }}
                                customize={<ArrowRightIcon color={"rgba(0,0,0,0.6)"} size={24} strokeWidth={2} />}
                            />
                        </View>
                        {/* {(!device || permission === "pending") && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ marginTop: 10 }}>Loading camera...</Text>
                    </View>
                )}

                {device && permission === "denied" && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>No camera permission</Text>
                        <Button
                            title="Try Again"
                            onPress={async () => {
                                const status = await Camera.requestCameraPermission();
                                setPermission(status);
                            }}
                        />
                    </View>
                )}

                {device && permission === "granted" && (
                    <Camera style={{ flex: 1 }} device={device} isActive={true} />
                )} */}
                    </SlidePanel>


                    <SlidePanel ref={SettingsRef}>
                        <View style={styles.topFixed}>
                            <Settings slideOpen={() => handleSlideOpen(false, "settings")} />
                        </View>
                    </SlidePanel>
                </View >
            </SettingsProvider>
        </UserProvider>

    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        height: "100%",           // يغطي الشاشة كلها
        backgroundColor: "#f6f6f6"
    },
    container: {
        width: "100%",
    },
    animatedBox: { position: "absolute", width: "100%", top: 0 },
    topFixed: {
        position: "absolute",
        top: 30,
        bottom: 0,
        width: "100%"
    },
    header: {
        position: "absolute",
        paddingHorizontal: 16,
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4
    },
    title: {
        fontSize: 18,
        lineHeight: 28,
        fontFamily: Fonts["medium"],
        color: color.black[10]
    },
});