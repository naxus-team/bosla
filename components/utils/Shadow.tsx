import React from "react";
import { ViewStyle } from "react-native";
import Svg, { Rect, Defs, Filter, FeGaussianBlur } from "react-native-svg";

type SvgShadowProps = {
    width?: number;
    height?: number;
    borderRadius?: number;
    shadowColor?: string;
    blurStdDeviation?: number; // مقدار الـ blur
    fillColor?: string;
    style?: ViewStyle;
};

export default function SvgShadow({
    width = 52,
    height = 52,
    borderRadius = 26,
    shadowColor = "rgba(0,0,0,0.25)",
    blurStdDeviation = 4,
    fillColor = "rgba(0,0,0,1)",
    style,
}: SvgShadowProps) {
    return (
        <Svg width={width + blurStdDeviation * 2} height={height + blurStdDeviation * 2} style={style}>
            <Defs>
                <Filter id="blur">
                    <FeGaussianBlur stdDeviation={blurStdDeviation} />
                </Filter>
            </Defs>

            {/* Shadow */}
            <Rect
                x={blurStdDeviation}
                y={blurStdDeviation}
                width={width}
                height={height}
                rx={borderRadius}
                ry={borderRadius}
                fill={shadowColor}
                filter="url(#blur)"
            />

            {/* العنصر الأساسي */}
            <Rect
                x={blurStdDeviation}
                y={blurStdDeviation}
                width={width}
                height={height}
                rx={borderRadius}
                ry={borderRadius}
                fill={fillColor}
            />
        </Svg>
    );
}
