import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Btn } from "../../reusable";
import { ArrowRightIcon as ArrowRightIconOutline, ArrowLeftIcon as ArrowLeftIconOutline, Cog6ToothIcon, MagnifyingGlassIcon, CheckIcon } from "react-native-heroicons/outline";
import { Cog6ToothIcon as Cog6ToothIconSolid } from "react-native-heroicons/solid";
import { Step, User } from "../../types";
import { useFonts } from "../../utils/font";
import { colors } from "../../../theme/colors";
import { colors as color } from "../../../theme/colors";
import { vibrate } from "../../hook/vibrations";
import { useUser } from "../../contexts/UserContext";
import { useToast } from "../../../providers/ToastProvider";
import { displayNotification } from "../../hook/notifications";
import { useLanguage } from "../../../locales"


type SettingsHeaderProps = {
    step: Step;
    user: User;
    goToStep: (section: string, sub?: string) => void;
    setStep: (step: Step) => void;
    slideOpen: (status: boolean, typeSlide: string) => void;
    title?: string;
    variable: { firstName: any, lastName: any, bio: string }
    children?: React.ReactNode;
};

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ step, user, goToStep,
    setStep, slideOpen, title, variable, children }) => {
    const fonts = useFonts();
    const { lang, t } = useLanguage();
    const { updateUserField } = useUser();
    const { notify } = useToast();

    const handleBackPress = () => {
        if (!step.sub) {
            if (step.section === "settings") {
                slideOpen(false, "settings");
            } else {
                setStep({ section: "settings" });
            }
        } else {
            setStep({ section: step.section });
        }
    };

    return (
        <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                <Btn
                    style={{
                        background: color.white[10],
                        pressedBackground: color.black[1],
                        radius: 16,
                        height: 42,
                        width: 42,
                        fontWeight: "bold",
                        animationSpeed: 100,
                        textAlign: "center",
                        animationType: "default",
                    }}
                    onPress={handleBackPress}
                    customize={
                        lang === "en_us" ? (
                            <ArrowLeftIconOutline color={color.black[6]} size={24} strokeWidth={2} />
                        ) : (
                            <ArrowRightIconOutline color={color.black[6]} size={24} strokeWidth={2} />
                        )
                    }
                />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Cog6ToothIconSolid color={color.black[4]} size={20} strokeWidth={2} />
                    <Text style={[styles.title, { fontFamily: fonts.medium }]}>{title || step.section}</Text>
                </View>
            </View>

            {step.section === "settings" && !step.sub && (
                <Btn
                    style={{
                        background: color.white.hex[10],
                        pressedBackground: color.black.hex[1],
                        radius: 16,
                        height: 42,
                        width: 42,
                        animationSpeed: 100,
                        animationType: "default",
                    }}
                    onPress={() => vibrate(60)}
                    customize={<MagnifyingGlassIcon color={color.black[6]} size={24} strokeWidth={2} />}
                />
            )}

            {children}

            {step.section === "profile" && step.sub && (variable.firstName !== user.firstname || variable.lastName !== user.lastname || variable.bio !== user.bio) && (variable.firstName.length !== 0 || variable.bio.length !== 0) && (
                <Btn
                    style={{
                        background: color.black.hex[10],
                        pressedBackground: color.black.hex[1],
                        radius: 16,
                        height: 42,
                        width: 68,
                        animationSpeed: 100,
                        animationType: "default",
                    }}
                    onPress={async () => {
                        if (user.firstname !== variable.firstName) {
                            await updateUserField("firstname", variable.firstName);
                            notify(`تم تحديث الأسم الأول إلي ${user.firstname}`, { type: "info" })
                        } []
                        if (user.lastname !== variable.lastName) {
                            await updateUserField("lastname", variable.lastName);
                            notify(`تم تحديث الأسم الأخير إلي ${user.lastname}`, { type: "info" })
                        }
                        if (user.bio !== variable.bio) {
                            await updateUserField("bio", variable.bio);
                            notify(`تم تحديث الوصف إلي ${user.bio}`, { type: "info" })
                        }
                        goToStep("profile", undefined)
                        vibrate(60)
                    }}
                    customize={<CheckIcon color={color.white.hex[10]} size={24} strokeWidth={2} />}
                />
            )}
        </View>
    );
};

export default SettingsHeader;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
    },
    title: { fontSize: 16, lineHeight: 24, color: colors.black.hex[5] },
});
