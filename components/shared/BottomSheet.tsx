import React, { useRef, useEffect, useState } from "react";
import { Pressable, BackHandler, Animated, PanResponder, Dimensions } from "react-native";
import { View, TouchableWithoutFeedback } from "react-native";

const { height } = Dimensions.get("window");

// Snap points: [أعلى, نص, أسفل]
const SNAP_POINTS = [
    0,            // 👆 مفتوح بالكامل (مسافة صغيرة من فوق)
    height / 2,    // ✋ نص الشاشة
    height - 38,   // 👇 تحت خالص (مخفي تقريباً)
];

type BottomSheetProps = {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    height?: number;
};

export default function BottomSheet({
    children,
    visible,
    onClose,
    height: sheetHeight = height,
}: BottomSheetProps) {
    const translateY = useRef(new Animated.Value(height)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const [lastHeight, setLastHeight] = useState(false);
    const [SheetHeight, setSheetHeight] = useState(height);
    const handleColor = useRef(new Animated.Value(0)).current;

    const interpolatedColor = handleColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0,0,0,0.125)", "rgba(238,15,56,1)"], // رمادي → أزرق
    });

    const onHandlePressIn = () => {
        Animated.timing(handleColor, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const onHandlePressOut = () => {
        Animated.timing(handleColor, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };


    const radius = translateY.interpolate({
        inputRange: [SNAP_POINTS[0], SNAP_POINTS[1], height],
        outputRange: [0, 32, 16],
        extrapolate: "clamp",
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dy) > 2,

            onPanResponderGrant: () => {
                onHandlePressIn();
                translateY.stopAnimation(); // وقف أي أنيميشن شغال
                if (SheetHeight === height / 2) setSheetHeight(height);
            },

            onPanResponderMove: (_, gestureState) => {
                const minY = SNAP_POINTS[0]; // أعلى نقطة
                const maxY = height;         // آخر الشاشة

                let newY = gestureState.moveY - 48;
                if (newY < minY) newY = minY;
                if (newY > maxY) newY = maxY;

                translateY.setValue(newY);
            },

            onPanResponderRelease: (_, gestureState) => {
                onHandlePressOut();
                const endValue = gestureState.moveY;
                const middle = height / 2;
                const downThreshold = middle + height * 0.2;
                const upThreshold = middle - height * 0.2;

                if (endValue > downThreshold) {
                    Animated.timing(translateY, {
                        toValue: height,
                        duration: 60,
                        useNativeDriver: true,
                    }).start(() => {
                        onClose();
                    });
                } else if (endValue < middle - height * 0.02) {
                    Animated.spring(translateY, {
                        toValue: SNAP_POINTS[0],
                        useNativeDriver: true,
                    }).start();
                } else {
                    Animated.spring(translateY, {
                        toValue: middle,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        const backAction = () => {
            if (visible) {
                onClose();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [visible]);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: SNAP_POINTS[1], // يفتح في النص أول ما يظهر
                    useNativeDriver: true,
                }),
            ]).start();
            setSheetHeight(height + 32);
        } else {
            handleColor.setValue(0);
            setSheetHeight(height / 2);
            translateY.setValue(SNAP_POINTS[2]);
        }
    }, [visible]);


    if (!visible) return null;

    return (
        <>
            {/* الخلفية */}
            <TouchableWithoutFeedback>
                <Animated.View
                    className="absolute top-0 left-0 right-0 bottom-0 bg-black/30"
                />
            </TouchableWithoutFeedback>

            {/* الـ BottomSheet */}
            <Animated.View
                style={{
                    height: SheetHeight,
                    transform: [{ translateY }],
                    borderTopLeftRadius: radius,
                    borderTopRightRadius: radius,
                }}
                className={`absolute top-0 w-full bg-white shadow-3xl self-center overflow-hidden`}
            >
                {/* المقبض */}
                <View
                    className="w-full min-h-[38px] flex items-center justify-center flex-row"

                    {...panResponder.panHandlers}
                >
                    <Animated.View
                        style={{
                            width: 96,
                            height: 4,
                            borderRadius: 12,
                            backgroundColor: "rgba(0,0,0,0.125)",
                        }}
                    />
                </View>

                {/* المحتوى */}
                <View className="w-full" style={{ height: height - 32 }}>{children}</View>
            </Animated.View>
        </>
    );
}
