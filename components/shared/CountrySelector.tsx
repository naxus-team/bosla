import React, { useState, useRef } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent, Animated } from "react-native";
import CountryFlag from "react-native-country-flag";
import LinearGradient from "react-native-linear-gradient";
import { getLang } from "../../locales";

import { useCountries } from "../../providers/CountriesProvider";
export type CountryData = {
    code: string;
    flagCode: string;
    name: string;
    dial: string;
};
type Props = {
    onSelect: (code: string, name: string, dial: string) => void;
    onScrollProgress?: (progress: number) => void;
};

export default function CountrySelector({ onSelect, onScrollProgress }: Props) {
    Animated
    const { countries, loading, currentCountry } = useCountries();
    const shadowAnim = useRef(new Animated.Value(0)).current;


    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const scrollY = contentOffset.y;
        const totalHeight = contentSize.height - layoutMeasurement.height;

        if (totalHeight > 0 && onScrollProgress) {
            const progress = scrollY / totalHeight;
            onScrollProgress(progress);
        }

        const offsetY = event.nativeEvent.contentOffset.y;

        Animated.timing(shadowAnim, {
            toValue: offsetY > 1 ? 1 : 0,
            duration: 50,
            useNativeDriver: false,
        }).start();
    };

    const shadowHeight = shadowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 4],
    });

    if (loading) {
        return (
            <View className="flex items-center justify-center h-full">
                <ActivityIndicator size="large" color="#1A1A1A" />
            </View>
        );
    }

    return (
        <>
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: shadowHeight,
                    zIndex: 10,
                }}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        opacity: shadowAnim,
                    }}
                >
                    <LinearGradient
                        colors={["rgba(0,0,0,0.08)", "transparent"]}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            </Animated.View>

            <FlatList<CountryData>
                data={countries}
                style={{ padding: 8 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => onSelect(item.code, item.name, item.dial ?? "eg")}
                        className="flex-row items-center justify-between h-[58px] px-4 border-b border-[rgba(0,0,0,0.04)]"
                    >
                        <View className="flex-row items-center gap-4">
                            <CountryFlag isoCode={item.flagCode.toUpperCase()} size={20} style={{ borderRadius: 4 }} />
                            <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold" }} className="text-lg text-black">{item.name}</Text>
                        </View>
                        <Text style={{ fontFamily: getLang().startsWith("ar") ? "NotoSansArabic-Regular" : "NotoSans-Regular" }} className="text-lg text-black/60">+{item.dial ?? "1"}</Text>
                    </Pressable>
                )}
            />
        </>
    );
}
