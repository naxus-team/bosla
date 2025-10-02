import React, { useRef, useEffect, useState } from "react";
import { Pressable, BackHandler, Animated, PanResponder, Dimensions, Easing } from "react-native";
import { View, TouchableWithoutFeedback } from "react-native";
import SkeletonList from "../utils/SkeletonStack";
import LinearGradient from "react-native-linear-gradient";
import { colors as color } from "../../theme/colors";

const { height } = Dimensions.get("window");

// Snap points: [أعلى, نص, أسفل]
const SNAP_POINTS = [
    0,            // 👆 مفتوح بالكامل (مسافة صغيرة من فوق)
    height / 2,    // ✋ نص الشاشة
    height,   // 👇 تحت خالص (مخفي تقريباً)
];

type enabledProps = {
    panHandler: boolean;
}

type sizeProps = {
    height: number;
}

type BottomSheetProps = {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    height?: number;
    enabled?: enabledProps;
    size?: sizeProps;
};

export default function BottomSheet({
    children,
    visible,
    onClose,
    enabled = { panHandler: true },
    size
}: BottomSheetProps) {
    const translateY = useRef(new Animated.Value(height)).current;
    const [SheetHeight, setSheetHeight] = useState(height);
    const handleColor = useRef(new Animated.Value(0)).current;
    const [snapPoints, setSnapPoints] = useState(SNAP_POINTS);

    useEffect(() => {
        if (typeof size?.height === "number") {
            setSheetHeight(size.height);
        } else {
            setSheetHeight(height);
        }
    }, [size?.height]);

    const radius = translateY.interpolate({
        inputRange: [SNAP_POINTS[0], SNAP_POINTS[1], SNAP_POINTS[2]],
        outputRange: [0, 32, 16],
        extrapolate: "clamp",
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dy) > 2,

            onPanResponderGrant: () => {
                if (SheetHeight === SheetHeight) setSheetHeight(SheetHeight);
            },

            onPanResponderMove: (_, gestureState) => {
                const minY = SNAP_POINTS[0];
                const maxY = height;

                let newY = gestureState.moveY - 48;
                if (newY < minY) newY = minY;
                if (newY > maxY) newY = maxY;

                translateY.setValue(newY);
            },

            onPanResponderRelease: (_, gestureState) => {
                const endValue = gestureState.moveY;
                const middle = SheetHeight;
                const downThreshold = middle + height * 0.2;
                const upThreshold = middle - height * 0.2;

                if (endValue > downThreshold) {
                    Animated.timing(translateY, {
                        toValue: height,
                        duration: 150,
                        useNativeDriver: true,
                        delay: 0,
                    }).start(() => {
                        onClose();
                    });
                } else if (endValue < middle - height * 0.02) {
                    Animated.timing(translateY, {
                        toValue: SNAP_POINTS[0],
                        duration: 150,
                        useNativeDriver: true,
                        delay: 0,
                    }).start();
                } else {
                    Animated.timing(translateY, {
                        toValue: middle,
                        duration: 150,
                        useNativeDriver: true,
                        delay: 0,
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
    }, [visible, onClose]);

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: (size?.height ? height - size.height : height / 2),
                duration: 150,
                useNativeDriver: true,
            }).start();

            setSheetHeight(height);

        } else {
            translateY.setValue(SNAP_POINTS[2]);
            Animated.timing(translateY, {
                toValue: SNAP_POINTS[2],
                duration: 150,
                useNativeDriver: true,
                delay: 0,
            }).start();
        }
    }, [size?.height, visible]);


    if (!visible) return null;

    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => {
                    Animated.timing(translateY, {
                        toValue: snapPoints[2],
                        duration: 150,
                        useNativeDriver: true,
                    }).start(() => onClose());
                }}
                accessible={false}
            >

                <Animated.View
                    style={{
                        position: "absolute",
                        top: 0,
                        flex: 1,
                        width: "100%",
                        height: height,
                    }}
                />


            </TouchableWithoutFeedback>

            <Animated.View
                style={{
                    zIndex: 999999,
                    height: SheetHeight,
                    transform: [{ translateY }],
                    borderTopLeftRadius: radius,
                    borderTopRightRadius: radius,
                    backgroundColor: color.forceground,
                    paddingHorizontal: 16,
                }}
                className={`absolute top-0 w-full shadow-3xl self-center overflow-hidden`}
            >

                {enabled.panHandler &&
                    <View
                        className="w-full min-h-[38px] flex items-center justify-center flex-row"

                        {...panResponder.panHandlers}
                    >
                        <Animated.View
                            style={{
                                width: 58,
                                height: 2.5,
                                borderRadius: 12,
                                backgroundColor: "rgba(0,0,0,0.125)",
                            }}
                        />
                    </View>
                }

                <View style={{ width: "100%" }}>
                    <View style={{ height: height, paddingBottom: 48 }}>{children}</View>
                </View>
            </Animated.View>
        </>
    );
}
