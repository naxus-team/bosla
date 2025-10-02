import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    Pressable,
    TextInputProps,
    GestureResponderEvent,
    Keyboard,
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { useLanguage } from "../../locales";

type InputProps = {
    iconContent?: React.ReactNode;
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: TextInputProps["keyboardType"];
    secureTextEntry?: boolean;
    maxLength?: number;
    pressableContent?: React.ReactNode;
    onPressablePress?: (event: GestureResponderEvent) => void;
};

export default function Input({
    iconContent,
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    maxLength,
    pressableContent,
    onPressablePress,
}: InputProps) {
    const { lang } = useLanguage();
    const [focused, setFocused] = useState(false);

    // الحالة: لو في value أو focused
    const isActive = value.length > 0 || focused;

    // shared values
    const labelY = useSharedValue(isActive ? -20 : 0);
    const labelFont = useSharedValue(isActive ? 12 : 18);

    useEffect(() => {
        labelY.value = withTiming(isActive ? -20 : 0, { duration: 100 });
        labelFont.value = withTiming(isActive ? 12 : 18, { duration: 100 });
    }, [isActive]);

    const animatedLabelStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: labelY.value }],
        fontSize: labelFont.value,
        color: "rgba(0,0,0,0.6)",
    }));

    useEffect(() => {
        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            // لو الكيبورد اتقفل و الـ input فاضي
            if (value.length === 0) {
                setFocused(false);
            }
        });

        return () => {
            hideSub.remove();
        };
    }, [value]);

    return (
        <View style={
            {
                height: 72,
                borderRadius: 24,
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                gap: 8
            }
        }>
            {iconContent && iconContent}
            <View style={{
                position: "relative",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                height: 70
            }}>
                {/* Floating Label */}
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
                    {label}
                </Animated.Text>

                {/* Input */}
                <TextInput
                    className="w-full placeholder:text-transparent"
                    style={{
                        marginTop: 16,
                        fontFamily: lang.startsWith("ar")
                            ? "NotoSansArabic-SemiBold"
                            : "NotoSans-SemiBold",
                        fontSize: 18,
                        lineHeight: 18,
                        color: value ? "#111" : "transparent",
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder ?? label}
                    selectionColor="#EDEDED"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    spellCheck={false}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onSubmitEditing={(e) => {
                        // هنا هيتفعل نفس وظيفة onPressablePress لو موجود
                        if (onPressablePress) {
                            onPressablePress(e.nativeEvent as any);
                        }
                    }}
                    returnKeyType="done" // يظهر زر الصح على الكيبورد
                />
            </View>

            {/* Divider + Pressable (اختياري) */}
            {pressableContent && onPressablePress && (
                <>
                    <Pressable
                        onPress={onPressablePress}
                        className="flex justify-center h-[70px] px-2"
                    >
                        {pressableContent}
                    </Pressable>
                </>
            )}
        </View>
    );
}
