// Dropdown.tsx
import React, { useEffect, useState } from "react";
import {
    Pressable,
    Text,
    View,
    StyleProp,
    ViewStyle,
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useLanguage } from "../../locales";

import CountryFlag from "../utils/countryFlag";
import * as Ico from "lucide-react-native";

type DropdownProps = {
    label: string;
    value?: string | null;
    onPress: () => void;
    data?: string;
    style?: StyleProp<ViewStyle>;
    placeholder?: string;
};

export default function Dropdown({
    label,
    placeholder,
    value,
    onPress,
    data,
    style,
}: DropdownProps) {
    const { lang } = useLanguage();

    const [focused, setFocused] = useState(false);

    const isActive = !!value || focused;

    // shared values
    const labelY = useSharedValue(isActive ? -20 : 0);
    const labelFont = useSharedValue(isActive ? 12 : 18);

    useEffect(() => {
        labelY.value = withTiming(isActive ? -20 : 0, { duration: 0 });
        labelFont.value = withTiming(isActive ? 12 : 18, { duration: 0 });
    }, [isActive]);

    const animatedLabelStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: labelY.value }],
        fontSize: labelFont.value,
        color: "rgba(0,0,0,0.6)",
    }));

    return (
        <Pressable
            onPress={onPress}
            style={[
                {
                    height: 72,
                    borderRadius: 24,
                    paddingHorizontal: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                },
                style,
            ]}
        >
            <View style={{ flex: 1, height: "100%", justifyContent: "center" }}>
                {/* animated label */}
                <Animated.Text
                    style={[
                        animatedLabelStyle,
                        {
                            fontFamily: lang.startsWith("ar")
                                ? "NotoSansArabic-Regular"
                                : "NotoSans-Regular",
                        },
                    ]}
                    numberOfLines={1}
                    className="absolute bg-white px-1 w-full"
                >
                    {placeholder ?? label}
                </Animated.Text>

                {/* selected value */}
                {value && (

                    <View className="flex items-center mt-4 flex-row gap-2">
                        <CountryFlag code={data || ""} size={24} />

                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                flex: 1,
                                alignItems: "flex-start",
                                fontFamily: lang.startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold",
                                fontSize: 18,
                                lineHeight: 28,
                                color: "#000"
                            }}
                        >
                            {value}
                        </Text>
                    </View>
                )}
            </View>

            {/* chevron icon */}
            <View style={{ paddingLeft: 8, paddingRight: 2 }}>
                <Ico.ChevronDown size={22} color="#1A1A1A" />
            </View>
        </Pressable>
    );
}
