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
import { getLang } from "../../locales";

type InputProps = {
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
    const [focused, setFocused] = useState(false);

    const isActive = value.length > 0 || focused;

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
            if (value.length === 0) {
                setFocused(false);
            }
        });

        return () => {
            hideSub.remove();
        };
    }, [value]);

    return (
        <View className="relative flex flex-row items-center justify-between border border-[rgba(0,0,0,.125)] rounded-2xl h-[70px] w-full px-4 gap-4">
            <View className="flex-1 flex-col justify-center h-full">
                <Animated.Text
                    style={[
                        animatedLabelStyle,
                        {
                            fontFamily: getLang().startsWith("ar")
                                ? "NotoSansArabic-Regular"
                                : "NotoSans-Regular",
                        },
                    ]}
                    numberOfLines={1}
                    className="absolute bg-white px-1 w-full"
                >
                    {label}
                </Animated.Text>
                <TextInput
                    className="w-full placeholder:text-transparent"
                    style={{
                        marginTop: 16,
                        fontFamily: getLang().startsWith("ar")
                            ? "NotoSansArabic-SemiBold"
                            : "NotoSans-SemiBold",
                        fontSize: 18,
                        lineHeight: 18,
                        color: value ? "#111" : "transparent",
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder ?? label}
                    selectionColor="#E1E1E1"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    spellCheck={false}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    textAlign="right"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </View>
            {pressableContent && onPressablePress && (
                <>
                    <View className="w-[1.5px] h-[16px] bg-[rgba(0,0,0,.125)]" />
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
