import { StyleSheet } from "react-native";
import { useLanguage } from "../../locales";
import { useFonts } from "./font";
import { colors as color } from "../../theme/colors";

export const useStyles = () => {
    const { lang } = useLanguage();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        Container: {
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%",
            overflow: "hidden",
        },
        card: {
            width: "50%",
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 5,
            borderColor: color.white[10],
            borderWidth: 1

        },
        value: { fontSize: 18, lineHeight: 28, fontFamily: fonts.bold, marginVertical: 5 },
        animatedScreen: {
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
        },
        wrapper: {
            width: "100%",
            gap: 8
        },
        header: {
            paddingHorizontal: 16,
            height: 52,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8
        },
        box: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 16,
            gap: 16,
        },
        columns: {
            overflow: "hidden",
            backgroundColor: color.background,
            borderColor: color.transparent,
            borderWidth: 0,
        },
        title: { fontSize: 16, lineHeight: 24, fontFamily: fonts.medium, color: "#555" },

        name: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: fonts.semibold,
            color: color.black[10]
        },
        phone: {
            flexDirection: "row",
            textAlign: lang === "ar_gl" ? "right" : "left",
            fontSize: 14,
            lineHeight: 22,
            fontFamily: fonts.medium,
            direction: "ltr",
            color: color.black.hex[6]
        },
        overline: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: fonts.semibold,
            color: color.black.hex[10]
        },
        caption: {
            fontSize: 14,
            lineHeight: 22,
            fontFamily: fonts.medium,
            color: color.black.hex[4]
        },
        gap8: {
            gap: 8
        },
        gap4: {
            gap: 2
        },
        Gallery: {
            flex: 1,
            position: "absolute",
            justifyContent: "center",
            top: 0,
            bottom: 0,
            width: "100%",
            overflow: "hidden",
            backgroundColor: color.black[10],
        },
        ContentGallery: {
            paddingHorizontal: 16
        },
        modal: {
            backgroundColor: "rgba(0,0,0,1)",
            justifyContent: "center",
            alignItems: "center",
        },
        closeButton: {
            position: "absolute",
            top: 50,
            right: 20,
        },
        container: { flex: 1, padding: 20, backgroundColor: "#fff" },
        button: {
            backgroundColor: "#007BFF",
            padding: 12,
            borderRadius: 8,
            marginBottom: 10,
        },
        buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
        logItem: { padding: 8 },
        logCaption: { fontSize: 14, color: color.black.hex[6], fontFamily: fonts.regular },
        logContent: { fontSize: 14, color: color.black.hex[10], fontFamily: fonts.medium },
    });

    return styles;
};
