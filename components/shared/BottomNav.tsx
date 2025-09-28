import { Text, View, Pressable, StyleSheet, Dimensions, Image, Vibration } from "react-native";
import React, { useEffect } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
    interpolate,
} from "react-native-reanimated";

// Outline Icons
import {
    UserGroupIcon as UserGroupIconOutline,
    UserIcon as UserIconOutline,
    ClipboardDocumentListIcon as ClipboardOutline,
    WalletIcon as WalletOutline,
    Squares2X2Icon as SquaresOutline,
} from "react-native-heroicons/outline";

// Solid Icons
import {
    UserGroupIcon as UserGroupIconSolid,
    UserIcon as UserIconSolid,
    ClipboardDocumentListIcon as ClipboardSolid,
    WalletIcon as WalletSolid,
    Squares2X2Icon as SquaresSolid,
} from "react-native-heroicons/solid";

import { t, getLang } from "../../locales";
import { Fonts } from "../utils/font";
import { Btn } from "../reusable";

type StepType = "services" | "contacts" | "account";

type BottomNavProps = {
    control: (stepTab: StepType) => void;
    activeTab: StepType;
};

export default function BottomNav({ control, activeTab }: BottomNavProps) {
    const isArabic = getLang().startsWith("ar");
    const fontBold = isArabic ? "NotoSansArabic-Bold" : "NotoSans-Bold";
    const fontSemi = isArabic ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold";

    const tabs = [
        { id: "services" as StepType, label: t("common.services"), outline: SquaresOutline, solid: SquaresSolid },
        { id: "contacts" as StepType, label: "جهات الإتصال", outline: UserGroupIconOutline, solid: UserGroupIconSolid },
        // { id: "wallet" as StepType, label: t("common.wallet"), outline: WalletOutline, solid: WalletSolid },
        { id: "account" as StepType, label: t("common.account"), outline: UserIconOutline, solid: UserIconSolid },
    ];

    // SharedValues ثابتة لكل زر مع تحديد النوع number
    const progresses = tabs.reduce((acc, tab) => {
        acc[tab.id] = useSharedValue<number>(activeTab === tab.id ? 1 : 0);
        return acc;
    }, {} as Record<StepType, ReturnType<typeof useSharedValue<number>>>);

    useEffect(() => {
        tabs.forEach(tab => {
            if (tab.id === activeTab) {
                // الزر الجديد يبدأ أنيميشنه
                progresses[tab.id].value = withTiming(1, { duration: 100 });
            } else {
                // كل الأزرار الأخرى ترجع فورًا
                progresses[tab.id].value = 0;
            }
        });
    }, [activeTab]);

    return (
        <View style={styles.container}>
            {/* <View style={{ position: "absolute", top: -149, width: "100%", height: 148, backgroundColor: "rgba(255,255,255,1)", paddingVertical: 16, flexDirection: "row", paddingHorizontal: 32, gap: 32 }}>
                <Image
                    source={{ uri: "https://media.licdn.com/dms/image/v2/D5603AQEnCHBbXlPbtA/profile-displayphoto-shrink_800_800/B56ZRI9QrjGQAc-/0/1736390808114?e=1761177600&v=beta&t=imPPKSTFzNnQBJjTb_ZlkdGJJizFlf9S33Eh2q-BqZ8" }}
                    style={
                        {
                            width: 62,
                            height: 62,
                            borderRadius: 100, // يجعلها دائرية

                        }
                    }
                />
                <View style={{ gap: 8 }}>
                    <View>
                        <Text style={[styles.aLabel, { fontFamily: Fonts["bold"] }]}>
                            محمد
                        </Text>
                        <Text style={[styles.bLabel, { fontFamily: Fonts["medium"] }]}>
                            أرسل إليك دعوة للتنقل معه
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Btn
                            label={`الموافقة`}
                            style={{
                                background: "rgba(0,0,0,0.1)",
                                pressedBackground: "rgba(0,0,0,0.2)",
                                colorText: "#000",
                                fontSize: 14,
                                lineHeight: 14,
                                radius: 32,
                                height: 38,
                                padding: { horizontal: 16 },
                                fontWeight: "bold",
                                animationSpeed: 100,
                                fullWidth: false,
                                animationType: "default",
                                shadow: false,

                            }}
                            onPress={() =>vibrate(60)}
                        />
                        <Btn
                            label={`الرفض`}
                            style={{
                                background: "#EE0F38",
                                pressedBackground: "#EE0F38",
                                colorText: "#fff",
                                fontSize: 14,
                                lineHeight: 14,
                                radius: 32,
                                height: 38,
                                padding: { horizontal: 16 },
                                fontWeight: "bold",
                                animationSpeed: 100,
                                fullWidth: false,
                                animationType: "default",
                                shadow: false,

                            }}
                            onPress={() =>vibrate(60)}
                        />
                    </View>
                </View>
            </View> */}
            {tabs.map(tab => {
                const progress = progresses[tab.id];

                const animatedBg = useAnimatedStyle(() => ({
                    width: 32 + 32 * progress.value,
                    backgroundColor: interpolateColor(progress.value, [0, 0.5], ["transparent", "#f6f6f6"]),
                    borderRadius: interpolate(progress.value, [0, 24], [24, 0])
                }));

                const animatedLabel = useAnimatedStyle(() => ({
                    color: interpolateColor(progress.value, [0, 0.5], ["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]),
                }));

                const isActive = activeTab === tab.id;
                const Icon = isActive ? tab.solid : tab.outline;

                return (
                    <Pressable
                        key={tab.id}
                        style={styles.PressableNav}
                        onPress={() => control(tab.id)}
                    >
                        <Animated.View style={[styles.IconPressNav, animatedBg]}>
                            <Icon
                                size={24}
                                strokeWidth={isActive ? 0 : 2}
                                color={isActive ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)"}
                            />
                        </Animated.View>
                        <Animated.Text
                            style={[
                                styles.Label,
                                animatedLabel,
                                { fontFamily: isActive ? fontBold : fontSemi },
                            ]}
                        >
                            {tab.label}
                        </Animated.Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: 82,
        backgroundColor: "white",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "rgba(0,0,0,0.1)",
    },
    PressableNav: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width / 4,
        paddingVertical: 10,
    },
    IconPressNav: {
        justifyContent: "center",
        alignItems: "center",
        height: 32,
    },
    Label: {
        textAlign: "center",
        fontSize: 13,
    },
    aLabel: {
        justifyContent: "center",
        color: "#EE0F38",
        fontSize: 18,
        lineHeight: 28
    },
    bLabel: {
        color: "#000",
        fontSize: 16,
        lineHeight: 28
    },
    zLabel: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 16,
        lineHeight: 24
    },
});
