import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import { ViewStyle, StyleProp } from "react-native";

type RadialShadowProps = {
    size?: number;                     // حجم الـ SVG العام
    innerColor?: string;               // اللون الداخلي
    outerColor?: string;               // اللون الخارجي
    innerRadius?: string;              // نصف القطر الداخلي للـ gradient (مثلاً "30%")
    outerRadius?: string;              // نصف القطر الخارجي للـ gradient (مثلاً "80%")
    style?: StyleProp<ViewStyle>;      // أي style خارجي (position, top, left, ...)
};

export default function RadialShadow({
    size = 52,
    innerColor = "rgba(0,0,0,0.2)",
    outerColor = "transparent",
    innerRadius = "30%",
    outerRadius = "60%",
    style,
}: RadialShadowProps) {
    return (
        <Svg height={size} width={size} style={style}>
            <Defs>
                <RadialGradient
                    id="grad"
                    cx="50%"
                    cy="50%"
                    r={outerRadius}     // التحكم في نصف القطر الخارجي
                    fx="50%"
                    fy="50%"
                >
                    <Stop offset="0%" stopColor={innerColor} stopOpacity={1} />
                    <Stop offset={innerRadius} stopColor={innerColor} stopOpacity={0.3} />
                    <Stop offset="100%" stopColor={outerColor} stopOpacity={0} />
                </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width={size} height={size} fill="url(#grad)" />
        </Svg>
    );
}
