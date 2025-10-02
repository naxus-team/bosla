import { Keyframe } from "react-native-reanimated";
import { useLanguage } from "../../locales";

export function useDirectionalAnimations() {
    const { lang } = useLanguage();
    const isRTL = lang === "en_us"; // أو أي شرط يعكس اللغة

    const EnteringFromRight = new Keyframe({
        0: { transform: [{ translateX: isRTL ? "-100%" : "100%" }] },
        100: { transform: [{ translateX: "0%" }] },
    }).duration(150);

    const ExitingToLeft = new Keyframe({
        0: { transform: [{ translateX: "0%" }] },
        100: { transform: [{ translateX: isRTL ? "100%" : "-100%" }] },
    }).duration(150);

    const EnteringFromLeft = new Keyframe({
        0: { transform: [{ translateX: isRTL ? "100%" : "-100%" }] },
        100: { transform: [{ translateX: "0%" }] },
    }).duration(150);

    const ExitingToRight = new Keyframe({
        0: { transform: [{ translateX: "0%" }] },
        100: { transform: [{ translateX: isRTL ? "-100%" : "100%" }] },
    }).duration(150);

    return { EnteringFromRight, ExitingToLeft, EnteringFromLeft, ExitingToRight };
}
