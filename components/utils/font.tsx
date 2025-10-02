import { useLanguage } from "../../locales";

export const useFonts = () => {
    const { lang } = useLanguage();
    const isArabic = lang === "ar_gl";

    return {
        regular: isArabic ? "NotoSansArabic-Regular" : "NotoSans-Regular",
        medium: isArabic ? "NotoSansArabic-Medium" : "NotoSans-Medium",
        semibold: isArabic ? "NotoSansArabic-SemiBold" : "NotoSans-SemiBold",
        bold: isArabic ? "NotoSansArabic-Bold" : "NotoSans-Bold",
        light: isArabic ? "NotoSansArabic-Light" : "NotoSans-Light",
    };
};
