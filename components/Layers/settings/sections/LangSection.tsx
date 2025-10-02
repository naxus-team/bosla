// /layers/components/LogSection.tsx
import { FlatList, View, Text } from "react-native";
import React, { useState } from "react";

import Animated from "react-native-reanimated";
import SettingsRow from "../SettingsRow";
import { BellAlertIcon, BellSlashIcon, CheckCircleIcon, InformationCircleIcon, XCircleIcon } from "react-native-heroicons/solid";
import { Step } from "../../../types";
import { CheckBox } from "../../../reusable";
import { useStyles } from "../../../utils/styles";
import { vibrate, setVibration } from '../../../hook/vibrations';
import { useLanguage } from "../../../../locales";
import { useToast } from "../../../../providers/ToastProvider";
import { colors as color } from "../../../../theme/colors";


type langSectionProps = {
    step: Step;
    status: boolean;
    setStatus: (v: boolean) => void;
    goToStep: (section: string, sub?: string) => void;
    animation: { entering: any; exiting: any };
};



export default function LangSection({ step, status, setStatus, goToStep, animation }: langSectionProps) {
    const styles = useStyles();
    const { t, setLang } = useLanguage();
    const { notify } = useToast();

    const languages = [
        { code: "default", title: t("common.langs.english"), subtitle: `English (${t("common.langs.default")})`, enabled: true },
        { code: "ar", title: t("common.langs.arabic"), subtitle: "العربية", enabled: false },
        { code: "en", title: t("common.langs.english"), subtitle: "English", enabled: false },
        { code: "fr", title: t("common.langs.french"), subtitle: "Français", enabled: false },
        { code: "es", title: t("common.langs.spanish"), subtitle: "Español", enabled: false },
        { code: "de", title: t("common.langs.german"), subtitle: "Deutsch", enabled: false },
        { code: "zh", title: t("common.langs.chinese"), subtitle: "中文", enabled: false },
        { code: "ko", title: t("common.langs.korean"), subtitle: "한국어", enabled: false },
        { code: "jp", title: t("common.langs.japanese"), subtitle: "日本語", enabled: false },
        { code: "hi", title: t("common.langs.hindi"), subtitle: "हिन्दी", enabled: false },
        // { code: "es", title: "الإسبانية", subtitle: "Spanish", enabled: false },
        // { code: "fr", title: "الفرنسية", subtitle: "French", enabled: false },
        // { code: "de", title: "الألمانية", subtitle: "German", enabled: false },
        // { code: "zh", title: "الصينية", subtitle: "Chinese", enabled: false },
        // { code: "hi", title: "الهندية", subtitle: "Hindi", enabled: false },
        // { code: "pt", title: "البرتغالية", subtitle: "Portuguese", enabled: false },
        // { code: "ru", title: "الروسية", subtitle: "Russian", enabled: false },
        // { code: "ja", title: "اليابانية", subtitle: "Japanese", enabled: false },
        // { code: "ko", title: "الكورية", subtitle: "Korean", enabled: false },
        // { code: "it", title: "الإيطالية", subtitle: "Italian", enabled: false },
        // { code: "tr", title: "التركية", subtitle: "Turkish", enabled: false },
        // { code: "nl", title: "الهولندية", subtitle: "Dutch", enabled: false },
        // { code: "sv", title: "السويدية", subtitle: "Swedish", enabled: false },
        // { code: "no", title: "النرويجية", subtitle: "Norwegian", enabled: false },
        // { code: "da", title: "الدنماركية", subtitle: "Danish", enabled: false },
        // { code: "fi", title: "الفنلندية", subtitle: "Finnish", enabled: false },
        // { code: "pl", title: "البولندية", subtitle: "Polish", enabled: false },
        // { code: "cs", title: "التشيكية", subtitle: "Czech", enabled: false },
        // { code: "el", title: "اليونانية", subtitle: "Greek", enabled: false },
        // { code: "he", title: "العبرية", subtitle: "Hebrew", enabled: false },
        // { code: "th", title: "التايلاندية", subtitle: "Thai", enabled: false },
        // { code: "vi", title: "الفيتنامية", subtitle: "Vietnamese", enabled: false },
        // { code: "id", title: "الإندونيسية", subtitle: "Indonesian", enabled: false },
        // { code: "ms", title: "الملايوية", subtitle: "Malay", enabled: false },
        // { code: "bn", title: "البنغالية", subtitle: "Bengali", enabled: false },
        // { code: "pa", title: "البنجابية", subtitle: "Punjabi", enabled: false },
        // { code: "ur", title: "الأردية", subtitle: "Urdu", enabled: false },
        // { code: "fa", title: "الفارسية", subtitle: "Persian", enabled: false },
        // { code: "sw", title: "السواحلية", subtitle: "Swahili", enabled: false },
    ];
    const [selectedLanguages, setSelectedLanguages] = React.useState(languages);

    const toggleLanguage = async (code: string) => {
        // تحديث حالة اللغات (واحد فقط مفعّل)
        setSelectedLanguages(prev =>
            prev.map(lang =>
                lang.code === code
                    ? { ...lang, enabled: true }
                    : { ...lang, enabled: false }
            )
        );

        try {
            // تغيير اللغة
            await setLang(
                code === "en" ? "en_us" :
                    code === "default" ? "en_us" :
                        "ar_gl"
            );

            // إشعار بالنجاح
            notify(t("lang.message.a.success"), { type: "success" });
            goToStep("settings", undefined)
        } catch (e) {
            // إشعار بالفشل
            notify(t("lang.message.b.failed"), { type: "error" });
        }

        // اهتزاز للتفاعل
        vibrate([0, 60, 100, 60, 0]);
    };


    return (
        <Animated.View
            key={step.section + (step.sub || "")}
            entering={animation.entering}
            exiting={animation.exiting}
            style={styles.animatedScreen}>
            <View style={styles.wrapper}>
                <View style={styles.columns}>
                    <FlatList
                        data={selectedLanguages}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <SettingsRow
                                title={`${item.title}`}
                                subtitle={item.subtitle}
                                onPress={() => toggleLanguage(item.code)}
                                switchComponent={
                                    <CheckBox
                                        checked={item.enabled}
                                        onPress={() => toggleLanguage(item.code)}
                                        size={24}
                                    />
                                }
                            />
                        )}
                        removeClippedSubviews={true}
                        keyboardShouldPersistTaps="handled"
                        decelerationRate="normal"
                        overScrollMode="never"
                        getItemLayout={(_, index) => ({
                            length: 90,
                            offset: 90 * index,
                            index,
                        })}
                      
                    />
                </View>
            </View>
        </Animated.View>
    );
}
