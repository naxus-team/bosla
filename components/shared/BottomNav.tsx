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

import { useLanguage } from "../../locales";
import { useFonts } from "../utils/font";
import { Btn } from "../reusable";
import { colors as color } from "../../theme/colors";


type StepType = "services" | "contacts" | "account";

type BottomNavProps = {
    control: (stepTab: StepType) => void;
    activeTab: StepType;
};

export default function BottomNav({ control, activeTab }: BottomNavProps) {
    const { lang, t } = useLanguage();
    const isArabic = lang.startsWith("ar");
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
                progresses[tab.id].value = withTiming(1, { duration: 100 });
            } else {
                progresses[tab.id].value = 0;
            }
        });
    }, [activeTab]);

    return (
        <View style={styles.container}>

            {tabs.map(tab => {
                const progress = progresses[tab.id];

                const animatedBg = useAnimatedStyle(() => ({
                    width: 32 + 32 * progress.value,
                    backgroundColor: interpolateColor(progress.value, [0, 0.5], [color.white[0], color.forceground]),
                    borderRadius: interpolate(progress.value, [0, 24], [24, 0])
                }));

                const animatedLabel = useAnimatedStyle(() => ({
                    color: interpolateColor(progress.value, [0, 0.5], [color.black[4], color.black[6]]),
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
                                color={!isActive ? color.black[6] : color.black[8]}
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
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: 82,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: color.forceground,
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
