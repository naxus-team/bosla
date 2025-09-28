import { useEffect, useState, useRef } from "react";
import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button, Image, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
    interpolate,
} from "react-native-reanimated";
import { t, getLang } from "../../locales";
import { Btn } from "../reusable";
import { Bars3Icon, BellIcon, DocumentTextIcon, ChevronLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Fonts } from "../utils/font";
import LinearGradient from "react-native-linear-gradient";
import Logo from "../utils/Logo"
import { vibrate } from "../hook/vibrations";
type SquareServices = {
    slideOpen: (status: boolean, typeSlide: string) => void
}

export default function SquareServices({ slideOpen }: SquareServices) {
    const isArabic = getLang().startsWith("ar");
    const fontBold = isArabic ? "NotoSansArabic-Bold" : "NotoSans-Bold";
    const fontSemiBold = isArabic ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold";
    const [color, setColor] = useState("rgba(255,255,255,1)");

    const services = [
        { title: "تنقل", subtitle: "أطلب سائق للتنقل", iconLabel: "Drive" },
    ];


    return (
        <View style={styles.Container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 4, paddingHorizontal: 16 }}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Text style={{
                        color: "rgba(283,15,56,1)",
                        fontSize: 30,
                        lineHeight: 45,
                        fontFamily: Fonts["medium"]
                    }}>
                        {t("app.name")}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <Btn
                        style={{
                            background: "#fff",
                            pressedBackground: "#eaeaea",
                            colorText: "#000",
                            radius: 16,
                            height: 48,
                            width: 48,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            textAlign: "center",
                            animationType: "default",
                            shadow: false,

                        }}
                        onPress={() => { vibrate(60); slideOpen(true, "notifications") }}
                        customize={
                            <BellIcon color={"rgba(0,0,0,0.8)"} size={24} strokeWidth={2} />
                        }

                    />
                    <Btn
                        style={{
                            background: "#fff",
                            pressedBackground: "#eaeaea",
                            colorText: "#000",
                            radius: 16,
                            height: 48,
                            width: 48,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            textAlign: "center",
                            animationType: "default",
                            shadow: false,

                        }}
                        onPress={() => vibrate(60)}
                        customize={
                            <MagnifyingGlassIcon color={"rgba(0,0,0,0.8)"} size={24} strokeWidth={2} />
                        }

                    />
                </View>
            </View>
            <View style={[styles.cardSquare, { backgroundColor: color }]}>
                <View
                    className=" min-h-[32px] flex items-center justify-center"
                >
                    <Animated.View
                        style={{
                            width: 48,
                            height: 4,
                            borderRadius: 12,
                            backgroundColor: "rgba(0,0,0,0.125)",
                        }}
                    />
                </View>
                <View style={{ flexDirection: "column", paddingHorizontal: 8, gap: 16 }}>
                    {services.map((service, index) => (
                        <Btn
                            key={index}
                            label=""
                            style={{
                                background: "#f6f6f6",
                                pressedBackground: "#fefefe",
                                radius: 24,
                                height: 250,
                                animationSpeed: 100,
                                fullWidth: false,
                                shadow: false,
                                elevation: 0,
                                padding: { vertical: 4 },
                            }}
                            customize={
                                <View style={styles.row}>
                                    <View style={styles.leftRow}>
                                        <View style={styles.texts}>
                                            <Text style={styles.title}>{service.title}</Text>
                                            <Text style={styles.subtitle}>{service.subtitle}</Text>
                                        </View>
                                    </View>

                                    <ChevronLeftIcon color={"rgba(0,0,0,1)"} size={28} strokeWidth={2} />
                                </View>
                            }
                            onPress={() => {
                                vibrate(60);
                                slideOpen(true, "map");
                            }}
                        />
                    ))}
                </View>


            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        gap: 8
    },
    cardSquare: {
        width: "100%",
        height: "100%",
        padding: 8,
        borderRadius: 24
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        width: "100%",
    },
    leftRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 21,
    },
    iconBox: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        width: 68,
        height: 68,
        borderRadius: 21,
        backgroundColor: "rgba(0,0,0,1)",
    },
    iconLabel: {
        color: "#fff",
        fontSize: 18,
        lineHeight: 24,
        fontFamily: Fonts["semibold"]
    },
    texts: {
        gap: 4,
    },
    title: {
        fontSize: 20,
        lineHeight: 32,
        fontFamily: Fonts["semibold"],
        color: "rgba(0,0,0,1)"
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 28,
        fontFamily: Fonts["medium"],
        color: "rgba(0,0,0,1)"
    },
});
