import BottomNav from "../shared/BottomNav";
import SlidePanel, { SlidePanelHandle } from "../reusable/SlidePanel";
import MapView from "../shared/Map/MapView";
import { Btn } from "../reusable";
import { ArrowRightIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Frame } from "../frame";
import { useFonts } from "../utils/font";
import { colors as color } from "../../theme/colors";
import { UserProvider } from "../contexts/UserContext";
import Gallery from "../reusable/Gallery";
import { SquareServices } from "../layers";
import { vibrate } from "../hook/vibrations"
import Account from "../layers/Account";
import { useLanguage } from "../../locales";
import statusNetwork from "../hook/statusNetwork";
import Settings from "../layers/Settings";
import { Camera, useCameraDevices, CameraDevice, CameraPermissionStatus, useCameraDevice } from 'react-native-vision-camera';

const { width, height } = Dimensions.get("window");

type StepType = "services" | "contacts" | "account";

type DashboardProps = {
    slideOpen?: (status: boolean, typeSlide: string) => void
};


export function Dashboard({ slideOpen }: DashboardProps) {
    const steps: StepType[] = ["services", "account"];
    const fonts = useFonts();
    const { lang, t } = useLanguage();
    const images: string[] = ["https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/552195197_1301750204741436_4684378411474012091_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=cn3Tb8PK1JcQ7kNvwGC2dy-&_nc_oc=Adl00It8JAFfHLna6ln3cHgZysyNz-RLTwuWpqdTBeWMFvFUhsLrvE6h7IyhKSzP8pQ&_nc_zt=23&_nc_ht=scontent.fcai30-1.fna&_nc_gid=AsCkkskeyXY27lvkmJav3A&oh=00_AfZpy7p74aeL0WuHSiksn7cXzvVewpa99pBHdxbTUXscSQ&oe=68DBF8CC", "https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/552195197_1301750204741436_4684378411474012091_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=cn3Tb8PK1JcQ7kNvwGC2dy-&_nc_oc=Adl00It8JAFfHLna6ln3cHgZysyNz-RLTwuWpqdTBeWMFvFUhsLrvE6h7IyhKSzP8pQ&_nc_zt=23&_nc_ht=scontent.fcai30-1.fna&_nc_gid=AsCkkskeyXY27lvkmJav3A&oh=00_AfZpy7p74aeL0WuHSiksn7cXzvVewpa99pBHdxbTUXscSQ&oe=68DBF8CC", "https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/552195197_1301750204741436_4684378411474012091_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=cn3Tb8PK1JcQ7kNvwGC2dy-&_nc_oc=Adl00It8JAFfHLna6ln3cHgZysyNz-RLTwuWpqdTBeWMFvFUhsLrvE6h7IyhKSzP8pQ&_nc_zt=23&_nc_ht=scontent.fcai30-1.fna&_nc_gid=AsCkkskeyXY27lvkmJav3A&oh=00_AfZpy7p74aeL0WuHSiksn7cXzvVewpa99pBHdxbTUXscSQ&oe=68DBF8CC"];
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
    const [step, setStep] = useState<StepType>("account");
    const SettingsRef = useRef<SlidePanelHandle>(null);
    const translateX = useRef(new Animated.Value(0)).current;
    const [activeContent, setActiveContent] = useState<StepType | null>(step);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [section, setSection] = useState<{ status: boolean }>();

    const handleSlideOpen = (status: boolean, typeSlide?: string) => {
        let toValue = 0;

        if (status) {
            // فتح Settings أو أي panel
            toValue = lang === "en_us" ? -width : width;
            if (typeSlide === "map") MapRef.current?.open();
            if (typeSlide === "notifications") NotificationsRef.current?.open();
            if (typeSlide === "settings") SettingsRef.current?.open();

            Animated.timing(translateX, {
                toValue,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                // بعد الانيميشن للأمام نخفي المحتوى
                setActiveContent(null);
            });
        } else {
            // الرجوع
            setActiveContent(step); // يظهر المحتوى فوراً
            toValue = 0;
            if (typeSlide === "map") MapRef.current?.close();
            if (typeSlide === "notifications") NotificationsRef.current?.close();
            if (typeSlide === "settings") SettingsRef.current?.close();

            Animated.timing(translateX, {
                toValue,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    };


    return (
        <UserProvider>
            <View style={[styles.safeArea, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                direction: lang === "ar_gl" ? "rtl" : "ltr",
            }]}>
                <View style={{ position: "absolute", width: "100%", top: 0, bottom: 0 }}>
                    <Animated.View
                        style={[
                            styles.animatedBox,
                            {
                                height: height,
                                transform: [{ translateX }],
                            },
                        ]}
                    >
                        <View style={{
                            top: -insets.top,
                            paddingTop: insets.top,
                            height: height - 52,
                            overflow: "hidden",
                            backgroundColor: color.white.hex[10]
                        }}>
                            {steps.map((s) => (
                                <View key={s}>
                                    {(step === s) && s === "services" && <SquareServices slideOpen={handleSlideOpen} />}
                                    {(step === s) && s === "account" && <Account slideOpen={handleSlideOpen} />}
                                </View>
                            ))}
                        </View>
                        <BottomNav control={(stepTab) => setStep(stepTab)} activeTab={step} />
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
                        <Settings slideOpen={() => { handleSlideOpen(false, "settings"); }} />
                    </View>
                </SlidePanel>
            </View >
            {false && <Gallery images={images} initialIndex={0} showThumbnails={true} />}
        </UserProvider>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        height: "100%",           // يغطي الشاشة كلها
    },
    container: {
        width: "100%",
    },
    animatedBox: { position: "absolute", width: "100%" },
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
        color: color.black[10]
    },
});