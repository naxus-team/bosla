import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
    interpolate
} from "react-native-reanimated";
import { fadeIn, fadeOut, slideUp, slideDown } from "../utils/animations";
import { Fonts } from "../utils/font";

type Padding = number | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    vertical?: number;
    horizontal?: number;
};

type Border = void | {
    borderColor?: string;
    borderWidth?: number;
};

export type BtnStyle = {
    background?: string;
    pressedBackground?: string;
    colorText?: string;
    radius?: number;
    height?: number;
    width?: number;
    fullWidth?: boolean;
    animationSpeed?: number;
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: "regular" | "medium" | "bold" | "light";
    fontFamily?: string;
    padding?: Padding;
    textAlign?: "left" | "center" | "right";
    shadow?: boolean;
    elevation?: number;
    animationType?: "default" | "fadeIn" | "fadeOut" | "scaleIn" | "scaleOut" | "slideUp" | "slideDown";
    border?: Border;
};

type BtnProps = {
    label?: string;
    style?: BtnStyle;
    onPress?: () => void;
    customize?: React.ReactNode;
    animScale?: boolean;
};

export default function Btn({ label, style, onPress, customize, animScale = false }: BtnProps) {
    const pressed = useSharedValue(0);
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(0);
    const speed = style?.animationSpeed ?? 120;

    const getPadding = (): ViewStyle => {
        if (!style?.padding) return {};
        if (typeof style.padding === "number") return { padding: style.padding };
        return {
            paddingTop: style.padding.top ?? style.padding.vertical ?? 12,
            paddingBottom: style.padding.bottom ?? style.padding.vertical ?? 12,
            paddingLeft: style.padding.left ?? style.padding.horizontal ?? 20,
            paddingRight: style.padding.right ?? style.padding.horizontal ?? 20,
        };
    };

    const getBorder = (): ViewStyle => {
        if (!style?.border) return {};
        return {
            borderColor: style.border?.borderColor ?? "",
            borderWidth: style.border?.borderWidth ?? 0,
        };
    };

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            pressed.value,
            [0, 1],
            [style?.background || "#007AFF", style?.pressedBackground || "#005BBB"]
        );

        const scale = interpolate(pressed.value, [0, 1], [1, 0.95]);

        return {
            backgroundColor,
            transform: [
                animScale
                    ? { scale: scale } // هتستخدم sharedValue
                    : { scale: 1 },          // القيمة العادية
            ],
            height: style?.height ?? undefined,
            width: style?.fullWidth ? "100%" : style?.width ?? undefined,
            borderRadius: style?.radius ?? 8,
        };
    });

    const applyAnimation = (type: string, isPressIn = true) => {
        switch (type) {
            case "fadeIn":
                opacity.value = isPressIn ? fadeIn({ duration: speed }).opacity : fadeOut({ duration: speed }).opacity;
                break;
            case "fadeOut":
                opacity.value = isPressIn ? fadeOut({ duration: speed }).opacity : fadeIn({ duration: speed }).opacity;
                break;
            case "scaleIn":
            case "default":
                pressed.value = withTiming(isPressIn ? 1 : 0, { duration: speed });
                break;
            case "scaleOut":
                pressed.value = withTiming(isPressIn ? -0.05 : 0, { duration: speed });
                break;
            case "slideUp":
                translateY.value = withTiming(isPressIn ? -10 : 0, { duration: speed });
                break;
            case "slideDown":
                translateY.value = withTiming(isPressIn ? 10 : 0, { duration: speed });
                break;
            default:
                pressed.value = withTiming(isPressIn ? 1 : 0, { duration: speed });
        }
    };

    return (
        <Pressable
            onPressIn={() => {
                if (style?.animationType) {
                    applyAnimation(style.animationType, true);
                } else {
                    pressed.value = withTiming(1, { duration: speed });
                }
            }}
            onPressOut={() => {
                if (style?.animationType) {
                    applyAnimation(style.animationType, false);
                } else {
                    pressed.value = withTiming(0, { duration: speed });
                }
            }}
            onPress={onPress}
        >
            <Animated.View
                style={[
                    styles.btn,
                    animatedStyle,
                    !style?.width && !style?.fullWidth
                        ? { ...getPadding(), alignSelf: "flex-start" } // ✅ padding + يمنع التمدد
                        : {},
                    style?.shadow
                        ? {
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }
                        : {},
                    style?.elevation ? { elevation: style.elevation } : {},
                    getBorder(),
                ]}
            >
                {customize ?
                    customize :
                    <Text
                        style={{
                            color: style?.colorText || "#fff",
                            fontSize: style?.fontSize ?? 16,
                            lineHeight: style?.lineHeight ?? (style?.fontSize ? style.fontSize * 1.2 : 20),
                            fontFamily: style?.fontFamily || Fonts[style?.fontWeight ?? "regular"],
                            textAlign: style?.textAlign ?? "center",
                            fontWeight: style?.fontWeight ? undefined : "500",
                        }}
                    >
                        {label}
                    </Text>}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        justifyContent: "center",
    },
});
