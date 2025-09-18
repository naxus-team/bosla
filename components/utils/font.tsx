import { getLang } from "../../locales";

const isArabic = getLang().startsWith("ar");

export const Fonts = {
    regular: isArabic ? "NotoSansArabic-Regular" : "NotoSans-Regular",
    medium: isArabic ? "NotoSansArabic-Medium" : "NotoSans-Medium",
    semibold: isArabic ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold",
    bold: isArabic ? "NotoSansArabic-Bold" : "NotoSans-Bold",
    light: isArabic ? "NotoSansArabic-Light" : "NotoSans-Light",
};
