// /layers/Settings.tsx
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { Btn } from "../reusable";
import { colors as color } from "../../theme/colors";
import { useFonts } from "../utils/font";
import SettingsContent from "./settings/SettingsContent";
import SettingsHeader from "./settings/SettingsHeader";
import ProfileSection from "./settings/sections/ProfileSection";
import PreferencesSection from "./settings/sections/PreferencesSection";
import LogSection from "./settings/sections/LogSection";
import LangSection from "./settings/sections/LangSection";
import Name from "./settings/sub/Name";
import Bio from "./settings/sub/Bio";
import { useLanguage } from "../../locales"
import { name, version } from "../../package.json";
import { Animations } from './animations';
import { useDirectionalAnimations } from "../animations";
import { ArrowRightEndOnRectangleIcon } from "react-native-heroicons/outline";
import { useStyles } from "../utils/styles";
import { Step } from "../types";
import BottomSheet from "../shared/BottomSheet";
import { isVibrationEnabled } from "../hook/vibrations";
import { TrashIcon } from "react-native-heroicons/outline";
import { useLog } from "../contexts/LogContext";
import { useToast } from "../../providers/ToastProvider";


export default function Settings({ slideOpen }: { slideOpen: (status: boolean, typeSlide: string) => void }) {
    const { EnteringFromRight, ExitingToLeft, EnteringFromLeft, ExitingToRight } = useDirectionalAnimations();

    const { clearLogs } = useLog();
    const { notify } = useToast();


    const fonts = useFonts();
    const styles = useStyles();
    const { lang, t } = useLanguage();
    const { user } = useUser();
    const [showSheet, setShowSheet] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    useEffect(() => {
        if (user) {
            setFirstName(user.firstname)
            setLastName(user.lastname)
            setBio(user.bio)
        }
    }, [user]);
    const [step, setStep] = useState<Step>({ section: "settings" });
    const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
    useEffect(() => {
        async function fetchVibration() {
            const enabled = await isVibrationEnabled();
            setVibrationEnabled(enabled);
        }
        fetchVibration();
    }, []);
    const [animation, setAnimation] = useState({ entering: Animations.EnteringFromLeft, exiting: Animations.ExitingToLeft });
    const [isAnimating, setIsAnimating] = useState(false);
    const titles: Record<string, string> = {
        settings: t("settingsItems.settings.title"),
        preferences: t("settingsItems.preferences.title"),
        language: t("settingsItems.language.title"),
        log: t("settingsItems.log.title"),
        profile: t("common.profile"),
    };
    const goToStep = (newSection: string, newSub?: string) => {
        if (isAnimating) return;
        setIsAnimating(true);
        let IsSub = newSub;
        if (newSection === "profile") {
            IsSub = undefined; // force no sub for profile
        }
        let entering = EnteringFromLeft;
        if (!step.sub && newSub) {
            entering = newSub === undefined ? EnteringFromRight : EnteringFromLeft;
        }
        let exiting = ExitingToLeft;
        if (!step.sub && newSub) {
            exiting = newSection !== "settings" ? newSub !== undefined ? ExitingToLeft : ExitingToRight : ExitingToLeft;
        } else if (step.sub && !newSub) {
            exiting = newSection !== "settings" ? ExitingToLeft : ExitingToLeft;
            exiting = newSection === "settings" ? ExitingToLeft : ExitingToRight;
        }
        setAnimation({ entering, exiting });
        setTimeout(() => {
            setStep({ section: newSection, sub: newSub });
            setIsAnimating(false);
        }, 200);
    };
    if (!user) return null;
    return (
        <View style={styles.Container}>
            <SettingsHeader step={step} user={user} goToStep={goToStep} setStep={setStep} slideOpen={slideOpen} title={titles[step.section]} variable={{ firstName, lastName, bio }}>
                {step.section === "log" && (
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
                        onPress={async () => {
                            try {
                                await clearLogs();
                                notify(t("logs.message.a.success"), { type: "success" });
                            } catch (error: any) {
                                const code = error.code || error.name || "UNKNOWN_ERROR";
                                notify(`${t("logs.message.a.failed")} ${code}`, { type: "error" });
                            }
                        }}
                        customize={<TrashIcon color={color.black.hex[6]} size={24} strokeWidth={2} />}
                    />
                )}
            </SettingsHeader>
            {step.section === "settings" && !step.sub && (
                <SettingsContent
                    user={user}
                    openSheet={setShowSheet}
                    goToStep={goToStep}
                    t={t}
                    name={name}
                    version={version}
                />
            )}
            <BottomSheet visible={showSheet} onClose={() => setShowSheet(false)} enabled={{ panHandler: false }} size={{ height: 92 }}>
                <View style={[styles.wrapper, { paddingTop: 16 }]}>
                    <Btn
                        style={{
                            background: color.black.hex[1],
                            pressedBackground: color.black.hex[2],
                            radius: 24,
                            height: 58,
                            animationSpeed: 150,
                            fullWidth: true,
                            animationType: "default",
                        }}
                        onPress={() => {
                        }}
                        customize={
                            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", gap: 16, paddingHorizontal: 16 }}>
                                <ArrowRightEndOnRectangleIcon color={color.primary.hex[10]} size={24} strokeWidth={2} />
                                <Text style={{ fontFamily: fonts.medium, color: color.primary.hex[10], fontSize: 16, lineHeight: 24 }}>
                                    تسجيل الخروج
                                </Text>
                            </View>
                        }
                    />
                </View>
            </BottomSheet>
            {step.section === "profile" && !step.sub && <ProfileSection
                step={step}
                user={user}
                goToStep={goToStep}
                animation={{ entering: animation.entering, exiting: animation.exiting }}
            />}
            {step.section === "profile" && step.sub === "name" && <Name
                step={step}
                user={user}
                goToStep={goToStep}
                animation={{ entering: EnteringFromRight, exiting: ExitingToRight }}
                setUser={{
                    setFirstName,
                    setLastName
                }}
                variable={{ firstName, lastName }}
            />}
            {step.section === "profile" && step.sub === "bio" && <Bio
                step={step}
                user={user}
                goToStep={goToStep}
                animation={{ entering: EnteringFromRight, exiting: ExitingToRight }}
                setUser={{
                    setBio
                }}
                variable={{ bio }}
            />}
            {step.section === "preferences" && !step.sub && <PreferencesSection step={step} vibrationEnabled={vibrationEnabled} setVibrationEnabled={setVibrationEnabled} goToStep={goToStep}
                animation={{ entering: animation.entering, exiting: animation.exiting }} />}
            {step.section === "language" && !step.sub && <LangSection step={step} status={vibrationEnabled} setStatus={setVibrationEnabled} goToStep={goToStep}
                animation={{ entering: animation.entering, exiting: animation.exiting }} />}
            {step.section === "log" && !step.sub && <LogSection step={step} status={vibrationEnabled} setStatus={setVibrationEnabled} goToStep={goToStep}
                animation={{ entering: animation.entering, exiting: animation.exiting }} />}
        </View>
    );
}
