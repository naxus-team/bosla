import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button, StatusBar, Image, BackHandler } from 'react-native';
import { name, version } from "react-native/package.json";
import Animated from "react-native-reanimated";
import { EnteringFromRight, ExitingToRight, EnteringFromLeft, ExitingToLeft } from "../animations";
import { Fonts } from "../utils/font";
import { Btn, Input } from "../reusable";
import { t } from "../../locales";

import { MapPinIcon, UserPlusIcon, PhoneIcon, CheckBadgeIcon, Cog6ToothIcon as Cog6ToothIconSolid, BuildingOfficeIcon, EllipsisHorizontalCircleIcon, ShareIcon, PencilIcon, DocumentDuplicateIcon, UserIcon, BellIcon, KeyIcon, QuestionMarkCircleIcon, PaintBrushIcon, ArrowRightEndOnRectangleIcon, ArrowRightOnRectangleIcon, MapIcon, ArrowRightIcon, WrenchScrewdriverIcon, BellSlashIcon, BellAlertIcon, LanguageIcon, GlobeAltIcon } from "react-native-heroicons/solid";
import { EllipsisVerticalIcon, Cog6ToothIcon, CheckBadgeIcon as CheckBadgeIconOutlone, ArrowRightStartOnRectangleIcon, ArrowRightIcon as ArrowRightIconOutline, MagnifyingGlassIcon, ArrowLeftIcon } from "react-native-heroicons/outline";

import { useToast } from "../../providers/ToastProvider";
import { useEffect, useState, useRef } from 'react';
import SlidePanel, { SlidePanelHandle } from "../reusable/SlidePanel";
import { setData, getData } from "../storage";
import { User, StorageKeys } from "../types";
import Logo from "../utils/Logo";

import { colors as color } from "../../theme/colors";

import { useClipboard } from "../hook/useClipboard";
import { ChevronLeft, Container, Loader } from 'lucide-react-native';
import { vibrate, setVibration } from '../hook/vibrations';
import { displayNotification } from '../hook/notifications';
import { VerticalSwitch } from "../reusable/Switch";
import { useUser } from "../contexts/UserContext";


type SettingsProf = {
    slideOpen: (status: boolean, typeSlide: string) => void,
}

const titles: Record<string, string> = {
    "settings": "الإعدادات",
    "preferences": "التفضيلات",
    "profile": "الملف الشخصي",
    "profile.name": "الاسم",
    "profile.about": "عني",
    "preferences.theme": "المظهر",
};

type Step = {
    section: "settings" | "preferences" | "profile";
    sub?: string;
};


export default function Settings({ slideOpen }: SettingsProf) {
    const { notify } = useToast();


    const { user, loading, refreshUser, updateUserField } = useUser();
    const [title, setTitle] = useState("");
    const date = new Date(Date.now());
    const [isAnimating, setIsAnimating] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [bio, setBio] = useState("");


    const [inSub, setInSub] = useState(false);


    const [step, setStep] = useState<Step>({ section: "settings" });
    const [animation, setAnimation] = useState<{ entering: any; exiting: any }>({
        entering: EnteringFromLeft,
        exiting: ExitingToRight,
    });

    const prevStepRef = useRef<Step>({ section: "settings" });

    const prev = prevStepRef.current;
    const curr = step;
    const inSubRef = useRef(false);



    useEffect(() => {
        if (user) {
            setFirstName(user.firstname)
            setLastName(user.lastname)
            setBio(user.bio)
        }
    }, [user]);

    function formatPhoneWithSpace(number: string): string {
        const clean = number.replace(/\s+/g, "");
        const prefix = clean.slice(0, 3);    // +20
        const first = clean.slice(3, 5);     // 15
        const rest = clean.slice(5);         // 50396217
        return `${prefix} ${first} ${rest}`;
    }

    const goToStep = (newStep: Step["section"], newSub?: Step["sub"]) => {
        const key = newSub ? `${newStep}.${newSub}` : newStep;
        setInSub(!step.sub)
        const prev = step; // نسخة من الخطوة الحالية قبل التغيير
        const next = { section: newStep, sub: newSub };
        console.log(`${newStep} | ${newSub}`);

        let entering: any = EnteringFromLeft;
        let exiting: any = ExitingToLeft;
        if (newStep === "profile" && newSub) {
            console.log("entering name sub");
            entering = EnteringFromLeft;
            exiting = ExitingToLeft;
        } else if (newStep === "profile" && !newSub) {
            entering = EnteringFromRight;
            exiting = ExitingToRight;
        }


        setAnimation({ entering, exiting });

        const prevStep = step;
        prevStepRef.current = prevStep;

        setTitle(titles[key] || "");
        setIsAnimating(true);
        setStep({ section: newStep, sub: newSub });
        setTimeout(() => setIsAnimating(false), 300);
    };


    useEffect(() => {
        const backAction = () => {
            if (step.section === "settings") {
                slideOpen(false, "settings"); // اخفاء الـ settings
                return true; // منع الخروج من التطبيق
            }
            if (prevStepRef.current) {
                console.log(curr.section)
                goToStep(!prevStepRef.current.sub ? prevStepRef.current.section : "settings"); // ارجع للـ previous step
                return true; // منع الخروج
            }


            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [step]);
    if (!user) return <></>;
    return (
        <View style={styles.Container} pointerEvents={isAnimating ? "none" : "auto"}>
            <View style={[styles.header]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                    <Btn
                        style={{
                            background: "#fff",
                            pressedBackground: "#eaeaea",
                            colorText: "#000",
                            radius: 16,
                            height: 42,
                            width: 42,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            textAlign: "center",
                            animationType: "default",
                        }}
                        onPress={() => {
                            vibrate(60);
                            if (!step.sub) {
                                if (step.section === "settings") {
                                    slideOpen(false, "settings");
                                    goToStep("settings");
                                } else {
                                    goToStep("settings");
                                }
                            } else {
                                if (!step.sub) {
                                    goToStep(step.section, step.sub);
                                } else {
                                    goToStep(step.section, undefined);
                                }
                            }

                        }}
                        customize={<ArrowRightIconOutline color={color.black[6]} size={24} strokeWidth={2} />}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Cog6ToothIconSolid color={color.black[4]} size={20} strokeWidth={2} />
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>
                </View>
                {step.section === "settings" && !step.sub && (
                    <Btn
                        style={{
                            background: "#fff",
                            pressedBackground: "#eaeaea",
                            colorText: "#000",
                            radius: 16,
                            height: 42,
                            width: 42,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            textAlign: "center",
                            animationType: "default",
                        }}
                        onPress={() => {
                            vibrate(60);
                        }}
                        customize={<MagnifyingGlassIcon color={color.black[6]} size={24} strokeWidth={2} />}
                    />
                )}
            </View>
            {step.section === "settings" && !step.sub && (
                <Animated.View key="settings" entering={EnteringFromRight} exiting={ExitingToRight} style={[styles.animatedScreen]}>
                    <View style={styles.wrapper}>
                        <Btn
                            style={{
                                background: "#fff",
                                pressedBackground: "#eaeaea",
                                colorText: "#000",
                                radius: 24,
                                height: 100,
                                fontWeight: "bold",
                                animationSpeed: 100,
                                fullWidth: true,
                                textAlign: "center",
                                animationType: "default",
                                shadow: false,

                            }}
                            onPress={() => { goToStep("profile", undefined); vibrate(60) }}
                            customize={
                                <View style={styles.box}>

                                    <View>
                                        <Image
                                            source={{ uri: user.avatar }} // لينك صورة تجريبية
                                            style={{
                                                width: 58,
                                                height: 58,
                                                resizeMode: "cover", borderRadius: 200
                                            }}
                                        />
                                        {user.verify && (
                                            <View style={{
                                                position: "absolute",
                                                margin: -4,
                                                bottom: 0
                                            }}>
                                                <CheckBadgeIconOutlone style={{
                                                    position: "absolute",
                                                }} color={"rgba(255,255,255,1)"} size={24} strokeWidth={5} />
                                                <CheckBadgeIcon color={"rgba(238,15,56,1)"} size={24} />
                                            </View>
                                        )}
                                    </View>
                                    <View style={[styles.gap4]}>
                                        <Text style={styles.name}>
                                            {user.firstname} {user.lastname}
                                        </Text>
                                        <Text style={styles.phone}>
                                            {user.phone}
                                        </Text>
                                    </View>
                                </View>
                            }

                        />
                        <View style={styles.columns}>
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => { goToStep("profile", ""); vibrate(60) }}
                                customize={
                                    <View style={styles.box}>

                                        <View style={{ alignItems: "center", justifyContent: "center", width: 32, height: "100%" }}>
                                            <KeyIcon color={"rgba(0,0,0,0.6)"} size={22} />
                                        </View>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                الحساب
                                            </Text>
                                            <Text style={styles.caption}>
                                                أشعارات الآمان · معلومات الحساب
                                            </Text>
                                        </View>
                                    </View>
                                }

                            />
                            <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => vibrate(60)}
                                customize={
                                    <View style={styles.box}>

                                        <View style={{ alignItems: "center", justifyContent: "center", width: 32, height: "100%" }}>
                                            <BellIcon color={"rgba(0,0,0,0.6)"} size={22} />
                                        </View>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                الإشعارات
                                            </Text>
                                            <Text style={styles.caption}>
                                                رسائل لإشعارات
                                            </Text>
                                        </View>
                                    </View>
                                }

                            />
                            <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => {
                                    goToStep("preferences", "");
                                    vibrate(60);
                                }}
                                customize={
                                    <View style={styles.box}>

                                        <View style={{ alignItems: "center", justifyContent: "center", width: 32, height: "100%" }}>
                                            <WrenchScrewdriverIcon color={"rgba(0,0,0,0.6)"} size={22} />
                                        </View>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                التفضيلات
                                            </Text>
                                            <Text style={styles.caption}>
                                                إعدادات · تخصيص التطبيق
                                            </Text>
                                        </View>
                                    </View>
                                }

                            />
                            <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => vibrate(60)}
                                customize={
                                    <View style={styles.box}>

                                        <View style={{ alignItems: "center", justifyContent: "center", width: 32, height: "100%" }}>
                                            <MapIcon color={"rgba(0,0,0,0.6)"} size={22} />
                                        </View>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                الخريطة
                                            </Text>
                                            <Text style={styles.caption}>
                                                تخصيص الخريطة · حزم الخرائط · الوضعية
                                            </Text>
                                        </View>
                                    </View>
                                }

                            />
                            <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => vibrate(60)}
                                customize={
                                    <View style={styles.box}>

                                        <View style={{ alignItems: "center", justifyContent: "center", width: 32, height: "100%" }}>
                                            <LanguageIcon color={"rgba(0,0,0,0.6)"} size={22} />
                                        </View>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                اللغة
                                            </Text>
                                            <Text style={styles.caption}>
                                                لغة التطبيق ({t("app.lang")})
                                            </Text>
                                        </View>
                                    </View>
                                }

                            />
                            <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => vibrate(60)}
                                customize={
                                    <View style={styles.box}>

                                        <View style={{ alignItems: "center", justifyContent: "center", width: 32, height: "100%" }}>
                                            <QuestionMarkCircleIcon color={"rgba(0,0,0,0.6)"} size={22} />
                                        </View>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                المساعدة
                                            </Text>
                                            <Text style={styles.caption}>
                                                مركز المساعدة, التواصل معنا
                                            </Text>
                                        </View>
                                    </View>
                                }

                            />
                        </View>
                        <View style={{ height: 100, alignItems: "center", justifyContent: "center", gap: 8 }}>
                            <Logo width={38} height={26.78} />
                            <Text style={styles.caption}>
                                {name} · v{version}
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            )}


            {step.section === "profile" && !step.sub && (
                <Animated.View
                    key={step.section + (step.sub || "")} // key فريد لكل حالة
                    entering={animation.entering}
                    exiting={animation.exiting}
                    style={[styles.animatedScreen]}>
                    <View style={styles.wrapper}>
                        <View style={{ alignItems: "center", marginVertical: 32 }}>
                            <Image
                                source={{ uri: user.avatar }} // لينك صورة تجريبية
                                style={{
                                    width: 200,
                                    height: 200,
                                    resizeMode: "cover", borderRadius: 200
                                }}
                            />
                        </View>
                        <Btn
                            style={{
                                background: "#fff",
                                pressedBackground: "#eaeaea",
                                radius: 16,
                                height: 38,
                                padding: { horizontal: 16 },
                                fontWeight: "bold",
                                fullWidth: true,
                                animationSpeed: 100,
                                textAlign: "center",
                                animationType: "default",
                            }}
                            onPress={() => {
                                vibrate(60);
                            }}
                            customize={
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 8,
                                        paddingHorizontal: 16,
                                    }}
                                >
                                    <PencilIcon color={color.black[10]} size={16} />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            lineHeight: 20,
                                            fontFamily: Fonts["semibold"],
                                            color: color.black[10],
                                        }}
                                    >
                                        تغيير الصورة
                                    </Text>
                                </View>
                            }
                        />
                        <View style={styles.columns}>
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => { goToStep("profile", "name"); vibrate(60) }}
                                customize={
                                    <View style={[styles.box, { justifyContent: "space-between" }]}>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                الأسم
                                            </Text>
                                            <Text style={styles.caption}>
                                                {user.firstname} {user.lastname}
                                            </Text>
                                        </View>
                                        <ChevronLeft color={color.black[6]} strokeWidth={2} />
                                    </View>
                                }

                            />
                            <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => { goToStep("profile", "about"); vibrate(60) }}
                                customize={
                                    <View style={[styles.box, { justifyContent: "space-between" }]}>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                عني
                                            </Text>
                                            <Text style={[styles.caption, { direction: "ltr" }]}>
                                                {!user.bio ? "اكتب شيئاً عنك..." : user.bio}
                                            </Text>
                                        </View>
                                        <ChevronLeft color={color.black[6]} strokeWidth={2} />
                                    </View>
                                }

                            />
                        </View>
                    </View>
                </Animated.View>
            )}

            {step.section === "profile" && step.sub === "name" && (
                <Animated.View key="profile.name" entering={EnteringFromLeft} exiting={ExitingToLeft} style={[styles.animatedScreen]}>
                    <View style={styles.wrapper}>
                        <View style={styles.columns}>
                            <Input
                                label={`الأسم الأول`}
                                value={firstName}
                                onChangeText={setFirstName}
                                onPressablePress={async () => {
                                    await updateUserField("firstname", firstName);
                                    displayNotification("تم تغيير أسمك!", `أصبح اسمك الأول ${firstName}`);
                                    notify(`أصبح اسمك الأول ${firstName}`)
                                }}
                            />
                            <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                            <Input
                                label={`الأسم الأخير`}
                                value={lastName}
                                onChangeText={setLastName}
                                onPressablePress={async () => {
                                    await updateUserField("lastname", lastName);
                                    displayNotification("تم تغيير أسمك!", `أصبح اسمك الأخير ${lastName}`);

                                }}
                            />
                        </View>
                    </View>
                </Animated.View>
            )}


            {step.section === "profile" && step.sub === "about" && (
                <Animated.View key="profile.about" entering={EnteringFromLeft} exiting={ExitingToLeft} style={[styles.animatedScreen]}>
                    <View style={styles.wrapper}>
                        <View style={styles.columns}>
                            <Input
                                label={`عني`}
                                value={bio}
                                onChangeText={setBio}
                                onPressablePress={async () => {
                                    await updateUserField("bio", bio);
                                    displayNotification("تم تغيير الوصف!", `${bio}`);
                                }}
                            />
                        </View>
                    </View>
                </Animated.View>
            )}


            {/* Preferences */}


            {step.section === "preferences" && !step.sub && (
                <Animated.View key="preferences" entering={EnteringFromLeft} exiting={ExitingToLeft} style={[styles.animatedScreen]}>
                    <View style={styles.wrapper}>
                        <View style={styles.columns}>
                            <Btn
                                style={{
                                    background: "#fff",
                                    pressedBackground: "#eaeaea",
                                    colorText: "#000",
                                    radius: 0,
                                    height: 86,
                                    fontWeight: "bold",
                                    animationSpeed: 100,
                                    fullWidth: true,
                                    textAlign: "center",
                                    animationType: "default",
                                    shadow: false,

                                }}
                                onPress={() => { setVibrationEnabled(!vibrationEnabled); setVibration(!vibrationEnabled); vibrate([0, 60, 100, 60, 0]); }}
                                customize={
                                    <View style={[styles.box, { justifyContent: "space-between" }]}>
                                        <View style={[styles.gap4]}>
                                            <Text style={styles.overline}>
                                                الاهتزاز
                                            </Text>
                                            <Text style={styles.caption}>
                                                {!vibrationEnabled ? "تفعيل" : "إيقاف"} الاهتزاز
                                            </Text>
                                        </View>
                                        <VerticalSwitch
                                            value={vibrationEnabled}
                                            width={32}
                                            height={48}
                                            thumbSize={32}
                                            activeColor="#EE0F38"
                                            inactiveColor="#ccc"
                                            topIcon={<BellAlertIcon color="#fff" size={16} />}
                                            bottomIcon={<BellSlashIcon color="#fff" size={16} />}
                                        />
                                    </View>
                                }

                            />
                        </View>
                    </View>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%",
        overflow: "hidden",
    },
    animatedScreen: {
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wrapper: {
        position: "absolute",
        width: "100%",
        paddingHorizontal: 16,
        gap: 8
    },
    header: {
        paddingHorizontal: 16,
        height: 52,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4
    },
    box: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
        gap: 16,
    },
    columns: {
        overflow: "hidden",
        borderRadius: 24,
        backgroundColor: color.background,
        borderColor: color.transparent,
        borderWidth: 0,
    },
    title: { fontSize: 16, lineHeight: 24, fontFamily: Fonts["medium"], color: "#555" },

    name: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: Fonts["semibold"],
        color: "rgba(0,0,0,1)"
    },
    phone: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: Fonts["medium"],
        direction: "ltr",
        color: color.black.hex[6]
    },
    overline: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: Fonts["medium"],
        color: color.black.hex[10]
    },
    caption: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: Fonts["medium"],
        color: color.black.hex[6]
    },
    gap8: {
        gap: 8
    },
    gap4: {
        gap: 2
    }
});