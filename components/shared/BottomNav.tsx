import { Text, View, Pressable, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from "react-native-reanimated";

// Outline Icons
import {
    UserGroupIcon as UserGroupIconOutline,
    Cog6ToothIcon as CogOutline,
    ClipboardDocumentListIcon as ClipboardOutline,
    WalletIcon as WalletOutline,
    Squares2X2Icon as SquaresOutline,
} from "react-native-heroicons/outline";

// Solid Icons
import {
    UserGroupIcon as UserGroupIconSolid,
    Cog6ToothIcon as CogSolid,
    ClipboardDocumentListIcon as ClipboardSolid,
    WalletIcon as WalletSolid,
    Squares2X2Icon as SquaresSolid,
} from "react-native-heroicons/solid";

import { t, getLang } from "../../locales";

type StepType = "services" | "requests" | "wallet" | "settings";

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
        { id: "requests" as StepType, label: "جهات الإتصال", outline: UserGroupIconOutline, solid: UserGroupIconSolid },
        { id: "wallet" as StepType, label: t("common.wallet"), outline: WalletOutline, solid: WalletSolid },
        { id: "settings" as StepType, label: t("common.settings"), outline: CogOutline, solid: CogSolid },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const progress = useSharedValue(isActive ? 1 : 0);

                const duration = isActive ? 100 : 70;

                progress.value = withTiming(isActive ? 1 : 0, { duration });

                const animatedBg = useAnimatedStyle(() => ({
                    width: withTiming(isActive ? 64 : 32, { duration }),
                    backgroundColor: interpolateColor(progress.value, [0, 1], ["transparent", "rgba(0,0,0,1)"]),
                }));

                const animatedLabel = useAnimatedStyle(() => ({
                    color: interpolateColor(progress.value, [0, 1], ["rgba(0,0,0,0.6)", "rgba(0,0,0,1)"]),
                }));

                const Icon = isActive ? tab.solid : tab.outline;

                return (
                    <Pressable
                        key={tab.id}
                        style={styles.PressableNav}
                        onPress={() => control(tab.id)}
                    >
                        <Animated.View style={[styles.IconPressNav, animatedBg]}>
                            <Icon size={24} strokeWidth={isActive ? 0 : 2} color={isActive ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.8)"} />
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
        borderTopColor: "rgba(0,0,0,0.125)",
    },
    PressableNav: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width / 4,
        paddingVertical: 10
    },
    IconPressNav: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 24,
        height: 32,
    },
    Label: {
        textAlign: "center",
        fontSize: 13,
    },
});
