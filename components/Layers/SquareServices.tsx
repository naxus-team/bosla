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
import { useLanguage } from "../../locales";
import { Btn } from "../reusable";
import { Bars3Icon, BellIcon, DocumentTextIcon, ChevronLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useFonts } from "../utils/font";
import LinearGradient from "react-native-linear-gradient";
import Logo from "../utils/Logo"
import { vibrate } from "../hook/vibrations";
import { colors } from "../../theme/colors";

type SquareServices = {
    slideOpen: (status: boolean, typeSlide: string) => void
}
const { width, height } = Dimensions.get("window");

export default function SquareServices({ slideOpen }: SquareServices) {
    const { lang, t } = useLanguage();
    const fonts = useFonts();
    const insets = useSafeAreaInsets();
    const isArabic = lang.startsWith("ar");
    const fontBold = isArabic ? "NotoSansArabic-Bold" : "NotoSans-Bold";
    const fontSemiBold = isArabic ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold";
    const [color, setColor] = useState("rgba(255,255,255,1)");

    const services = [
        { title: "تنقل", subtitle: "أطلب سائق للتنقل", iconLabel: "Drive" },

    ];


    return (
        <View style={[styles.Container]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 4, paddingHorizontal: 16 }}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Text style={{
                        color: "rgba(283,15,56,1)",
                        fontSize: 30,
                        lineHeight: 45,
                        fontFamily: fonts.medium
                    }}>
                        {t("app.name")}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <Btn
                        style={{
                            background: colors.forceground,
                            pressedBackground: colors.black.hex[1],
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
                            <BellIcon color={colors.black.hex[8]} size={24} strokeWidth={2} />
                        }

                    />
                    <Btn
                        style={{
                            background: colors.forceground,
                            pressedBackground: colors.black.hex[1],
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
                            <MagnifyingGlassIcon color={colors.black.hex[8]} size={24} strokeWidth={2} />
                        }

                    />
                </View>
            </View>
            <View style={[styles.cardSquare, { backgroundColor: color }]}>
                <View style={{ flexDirection: "column", borderRadius: 24, borderColor: colors.black.hex[1], borderWidth: 2, overflow: "hidden" }}>
                    {services.map((service, index, arr) => (
                        <>
                            <Btn
                                key={index}
                                label=""
                                style={{
                                    background: colors.white[10],
                                    pressedBackground: colors.black.hex[1],
                                    radius: 0,
                                    height: 128,
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
                                                <Text style={[styles.title, { fontFamily: fonts.semibold, }]}>{[service.title]}</Text>
                                                <Text style={[styles.subtitle, { fontFamily: fonts.medium }]}>{service.subtitle}</Text>
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
                            {index + 1 && <View style={{ height: 2, backgroundColor: colors.forceground, width: "100%" }} />}
                        </>
                    ))}
                </View>


            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        top: 0,
        width: "100%",
        height: height - 82,
        gap: 8
    },
    cardSquare: {
        width: "100%",
        height: "100%",
        padding: 16,
        paddingTop: 0,
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
    },
    texts: {
        paddingHorizontal: 8,
        gap: 4,
    },
    title: {
        fontSize: 24,
        lineHeight: 36,
        color: "rgba(0,0,0,1)"
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 28,
        color: "rgba(0,0,0,1)"
    },
});
