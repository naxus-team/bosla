import { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLang } from "../../locales";
import { Btn } from "../reusable";
import { Cog6ToothIcon, BellIcon } from "react-native-heroicons/outline";
import { Fonts } from "../utils/font";
import Logo from "../utils/Logo"

export default function SquareServices() {
    const isArabic = getLang().startsWith("ar");
    const fontBold = isArabic ? "NotoSansArabic-Bold" : "NotoSans-Bold";
    const fontSemiBold = isArabic ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold";
    const [color, setColor] = useState("rgba(0,0,0,1)");

    return (
        <View style={styles.Container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 8, paddingTop: 0 }}>
                <Logo color={"#a1a1a1"} />
                <Btn
                    label={`بدء الرحله`}
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
                        shadow: true,
                        elevation: 4,
                    }}
                    onPress={() => Vibration.vibrate(60)}
                    customize={
                        <BellIcon color={"rgba(0,0,0,0.8)"} size={24} strokeWidth={2} />
                    }

                />
            </View>
            <View style={[styles.cardSquare, { backgroundColor: color }]}>
                <View style={{ gap: 38, width: 250 }}>
                    <View style={{ gap: 8 }}>
                        <Text style={[styles.aLabel, { fontFamily: fontBold }]}>
                            Drive
                        </Text>
                        <Text style={[styles.bLabel, { fontFamily: fontSemiBold }]}>
                            ابدأ رحلتك الآن
                        </Text>
                    </View>
                    <Btn
                        label={`بدء الرحله`}
                        style={{
                            background: "#fff",
                            pressedBackground: "#eaeaea",
                            colorText: "#000",
                            radius: 16,
                            height: 62,
                            fontSize: 18,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            padding: { horizontal: 32 },
                            fullWidth: true,
                            textAlign: "center",
                            animationType: "default",
                            shadow: false,
                            elevation: 4,
                        }}
                        onPress={() => Vibration.vibrate(60)}
                    />
                </View>





            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        padding: 16,
        paddingTop: 0,
        backgroundColor: "white",
        gap: 16
    },
    cardSquare: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 48,
        borderRadius: 32,
        gap: 16
    },
    aLabel: {
        textAlign: "center",
        color: "#fff",
        fontSize: 32,
        lineHeight: 38
    },
    bLabel: {
        textAlign: "center",
        color: "rgba(255,255,255,0.8)",
        fontSize: 18,
        lineHeight: 28
    }
});
