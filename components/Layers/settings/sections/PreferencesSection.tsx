// /layers/components/PreferencesSection.tsx
import { View } from "react-native";
import Animated from "react-native-reanimated";
import SettingsRow from "../SettingsRow";
import { BellAlertIcon, BellSlashIcon } from "react-native-heroicons/solid";
import { Step } from "../../../types";
import { Switch } from "../../../reusable";
import { useStyles } from "../../../utils/styles";
import { colors as color } from "../../../../theme/colors";
import { vibrate, setVibration } from '../../../hook/vibrations';
import { useToast } from "../../../../providers/ToastProvider";
import { useLanguage } from "../../../../locales";


type PreferencesSectionProps = {
    step: Step;
    vibrationEnabled: boolean;
    setVibrationEnabled: (v: boolean) => void;
    goToStep: (section: string, sub?: string) => void;
    animation: { entering: any; exiting: any };
};

export default function PreferencesSection({ step, vibrationEnabled, setVibrationEnabled, goToStep, animation }: PreferencesSectionProps) {
    const styles = useStyles();
    const { lang, t } = useLanguage();
    const { notify } = useToast();
    return (
        <Animated.View
            key={step.section + (step.sub || "")}
            entering={animation.entering}
            exiting={animation.exiting}
            style={styles.animatedScreen}>
            <View style={styles.wrapper}>
                <View style={styles.columns}>

                    <SettingsRow
                        title={t("settings.vibration")}
                        subtitle={!vibrationEnabled ? t("settings.toggle.on") : t("settings.toggle.off")}
                        onPress={() => {
                            setVibrationEnabled(!vibrationEnabled);
                            setVibration(!vibrationEnabled);
                            notify(`${!vibrationEnabled ? t("settings.toggle.on") : t("settings.toggle.off")} ${t("settings.vibration")}`, { type: "info" })
                            vibrate([0, 60, 100, 60, 0]);
                        }}
                        switchComponent={
                            <Switch
                                value={vibrationEnabled}
                                width={32}
                                height={48}
                                thumbSize={32}
                                activeColor="#EE0F38"
                                inactiveColor="#ccc"
                                topIcon={<BellAlertIcon color={color.primary[10]} size={16} />}
                                bottomIcon={<BellSlashIcon color={color.black[4]} size={16} />}
                            />
                        }
                    />
                </View>
            </View>
        </Animated.View>
    );
}
