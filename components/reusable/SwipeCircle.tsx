import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, PanResponder, Vibration } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { getLang } from "../../locales";

interface SwipeCircleProps {
    width: number;
    onSwipeComplete: () => void;
    label?: string;
}

export default function SwipeCircle({ width, onSwipeComplete, label }: SwipeCircleProps) {
    const handleWidth = 60;
    const maxTranslate = width - handleWidth;

    const lang = getLang();
    const isRTL = lang === "ar_gl";
    const fontBold = isRTL ? "NotoSansArabic-Bold" : "NotoSans-Bold";
    const fontSemiBold = isRTL ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold";
    const initialX = 0;
    const translateX = useRef(new Animated.Value(initialX)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,

            onPanResponderMove: (_, gestureState) => {
                let x = isRTL ? -gestureState.dx : gestureState.dx;
                x = Math.max(0, Math.min(x, maxTranslate));
                translateX.setValue(x);
            },
            onPanResponderRelease: (_, gestureState) => {
                const threshold = maxTranslate * 0.95;

                if ((!isRTL && gestureState.dx > threshold) || (isRTL && gestureState.dx < -threshold)) {
                    Animated.timing(translateX, {
                        toValue: maxTranslate,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        Vibration.vibrate(60);
                        onSwipeComplete();
                        Animated.timing(translateX, {
                            toValue: initialX,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    });
                } else {
                    Animated.timing(translateX, {
                        toValue: initialX,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;
    return (
        <View style={[styles.container, { width, overflow: "hidden" }]}>
            <Text style={[styles.label, { paddingHorizontal: 16, fontFamily: fontSemiBold }]}>
                {label || (isRTL ? "اسحب لليسار" : "اسحب لليمين")}
            </Text>
            <View style={{ marginRight: "auto", paddingHorizontal: 16, flexDirection: "row" }}>
                <ChevronLeftIcon color={"rgba(255,255,255,0.3)"} size={16} strokeWidth={2} />
                <ChevronLeftIcon color={"rgba(255,255,255,0.6)"} size={16} strokeWidth={2} />

            </View>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: width,
                        transform: [{
                            translateX: translateX.interpolate({
                                inputRange: [0, maxTranslate],
                                outputRange: [maxTranslate, 0],
                            })
                        }],
                    },
                ]}
            >
                <Text style={[styles.label, { color: "black", fontFamily: fontSemiBold }]}>
                    بدء
                </Text>
            </Animated.View>
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.circle,
                    {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        elevation: 16,
                        transform: [{
                            translateX: translateX.interpolate({
                                inputRange: [0, maxTranslate],
                                outputRange: [0, -maxTranslate],
                            })
                        }],
                    },
                ]}
            >
                <ChevronLeftIcon size={24} strokeWidth={2.5} />
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#333",
        borderRadius: 24,
        justifyContent: "center",
        paddingHorizontal: 5,
        marginTop: 20,
    },
    label: {
        position: "absolute",
        alignSelf: "center",
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});
