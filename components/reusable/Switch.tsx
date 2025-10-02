import React from "react";
import { View, TouchableOpacity, Animated, StyleSheet, Easing, Pressable } from "react-native";

type SwitchProps = {
    value: boolean;
    onChange?: (val: boolean) => void;
    width?: number;
    height?: number;
    thumbSize?: number;
    activeColor?: string;
    inactiveColor?: string;
    topIcon?: React.ReactNode;
    bottomIcon?: React.ReactNode;
};

const Switch: React.FC<SwitchProps> = ({
    value,
    onChange,
    width = 40,
    height = 100,
    thumbSize = 36,
    activeColor = "#EE0F38",
    inactiveColor = "#ccc",
    topIcon,
    bottomIcon,
}) => {
    const translateY = React.useRef(new Animated.Value(value ? height - thumbSize - 2 : 2)).current;

    React.useEffect(() => {
        Animated.spring(translateY, {
            toValue: value ? height - thumbSize - 0 : -16,
            useNativeDriver: true,
            stiffness: 150,
            damping: 12,
            mass: 0.5,
        }).start();
    }, [value]);

    return (
        <Pressable
            style={[styles.track, { width, height, backgroundColor: value ? activeColor : inactiveColor }]}
        >
            <Animated.View
                style={[
                    styles.thumb,
                    {
                        width: thumbSize,
                        height: thumbSize,
                        borderRadius: thumbSize / 2,
                        transform: [{ translateY }],
                        alignItems: "center",
                        justifyContent: "center"
                    },
                ]}
            >
                {value ? <View>{topIcon}</View> : <View >{bottomIcon}</View>}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    track: {
        borderRadius: 50,
        justifyContent: "center",
        pointerEvents: "none"
    },
    thumb: {
        position: "absolute",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
    },
    iconTop: {
        position: "absolute",
        top: 4,
        alignSelf: "center",
    },
    iconBottom: {
        position: "absolute",
        bottom: 4,
        alignSelf: "center",
    },
});
export default Switch;