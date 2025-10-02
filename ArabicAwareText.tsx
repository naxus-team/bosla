import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

function isArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

type FontWeight =
  | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
  | "normal" | "bold";

export default function ArabicAwareText({ children, style, ...props }: TextProps) {
  const text = typeof children === "string" ? children : "";

  let fontWeight: FontWeight = "400";
  if (Array.isArray(style)) {
    style.forEach((s) => {
      if (s && (s as TextStyle).fontWeight) {
        fontWeight = (s as TextStyle).fontWeight as FontWeight;
      }
    });
  } else if (style && (style as TextStyle).fontWeight) {
    fontWeight = (style as TextStyle).fontWeight as FontWeight;
  }

  const mapWeight = (weight: FontWeight, arabic: boolean) => {
    switch (weight) {
      case "100": return arabic ? "NotoSansArabic-Thin" : "NotoSans-Thin";
      case "200": return arabic ? "NotoSansArabic-ExtraLight" : "NotoSans-ExtraLight";
      case "300": return arabic ? "NotoSansArabic-Light" : "NotoSans-Light";
      case "400":
      case "normal": return arabic ? "NotoSansArabic-Regular" : "NotoSans-Regular";
      case "500": return arabic ? "NotoSansArabic-Medium" : "NotoSans-Medium";
      case "600": return arabic ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold";
      case "700":
      case "bold": return arabic ? "NotoSansArabic-Bold" : "NotoSans-Bold";
      case "800": return arabic ? "NotoSansArabic-ExtraBold" : "NotoSans-ExtraBold";
      case "900": return arabic ? "NotoSansArabic-Black" : "NotoSans-Black";
      default: return arabic ? "NotoSansArabic-Regular" : "NotoSans-Regular";
    }
  };

  const fontFamily = mapWeight(fontWeight, isArabic(text));

  return (
    <Text {...props} style={[{ fontFamily }, style]}>
      {children}
    </Text>
  );
}
