import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Animated from "react-native-reanimated";
import SettingsRow from "../SettingsRow";
import { InformationCircleIcon, XMarkIcon, CheckIcon } from "react-native-heroicons/outline";
import { Step } from "../../../types";
import { Switch } from "../../../reusable";
import { useStyles } from "../../../utils/styles";
import { vibrate } from '../../../hook/vibrations';
import { colors as color } from "../../../../theme/colors";
import { useLanguage } from "../../../../locales";
import { useLog } from "../../../contexts/LogContext";
import { useState } from "react";

type LogSectionProps = {
    step: Step;
    status: boolean;
    setStatus: (v: boolean) => void;
    goToStep: (section: string, sub?: string) => void;
    animation: { entering: any; exiting: any };
};

export default function LogSection({ step, status, setStatus, goToStep, animation }: LogSectionProps) {
    const styles = useStyles();
    const { t } = useLanguage();
    const { logs, addLog } = useLog();

    // state خاص بالـ pagination
    const [visibleLogs, setVisibleLogs] = useState(logs.slice(0, 50));
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const loadMoreLogs = () => {
        if (isLoadingMore) return;
        if (visibleLogs.length >= logs.length) return; // مفيش Logs تاني

        setIsLoadingMore(true);
        setTimeout(() => {
            const next = logs.slice(0, visibleLogs.length + 50);
            setVisibleLogs(next);
            setIsLoadingMore(false);
        }, 200);
    };

    return (
        <Animated.View
            key={step.section + (step.sub || "")}
            entering={animation.entering}
            exiting={animation.exiting}
            style={styles.animatedScreen}
        >
            <View style={styles.wrapper}>
                <View style={styles.columns}>
                    <SettingsRow
                        title={t("settingsItems.log.title")}
                        subtitle={status ? t("settings.toggle.on") : t("settings.toggle.off")}
                        onPress={() => {
                            setStatus(!status)
                            vibrate([0, 60, 100, 60, 0]);
                        }}
                        switchComponent={
                            <Switch
                                value={status}
                                width={32}
                                height={48}
                                thumbSize={32}
                                activeColor="#EE0F38"
                                inactiveColor="#ccc"
                                topIcon={<CheckIcon color={color.primary[10]} size={16} strokeWidth={3} />}
                                bottomIcon={<XMarkIcon color={color.black[4]} size={16} strokeWidth={3} />}
                            />
                        }
                    />
                    <View style={{ height: 2, backgroundColor: color.forceground, width: "100%" }} />

                    <View style={{ maxHeight: 350 }}>
                        {status ? (
                            <FlatList
                                data={visibleLogs}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={step.section === "log"}
                                ItemSeparatorComponent={() => (
                                    <View style={{ height: 1, backgroundColor: color.forceground, width: "100%" }} />
                                )}
                                renderItem={({ item }) => (
                                    <View style={styles.logItem}>
                                        <Text style={styles.logCaption}>
                                            [{item.date} {item.time}] ({item.type})
                                        </Text>
                                        <Text style={styles.logContent}>
                                            [{item.from}]: {item.message}
                                        </Text>
                                    </View>
                                )}
                                initialNumToRender={50}
                                maxToRenderPerBatch={50}
                                windowSize={5}
                                removeClippedSubviews={true}
                                onEndReached={loadMoreLogs}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={
                                    isLoadingMore ? (
                                        <View style={{ padding: 10 }}>
                                            <ActivityIndicator size="large" color={color.primary[10]} />
                                        </View>
                                    ) : null
                                }
                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", padding: 24 }}>
                                        <InformationCircleIcon color={color.black[4]} size={48} strokeWidth={1.5} />
                                        <Text style={[styles.caption, { textAlign: "center", marginTop: 12 }]}>
                                            {t("logs.status.empty")}
                                        </Text>
                                    </View>
                                )}
                            />
                        ) : (
                            <View style={{ alignItems: "center", justifyContent: "center", height: 100 }}>
                                <Text style={[styles.caption]}>{t("logs.status.disabled")}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", width: "100%", gap: 8, padding: 16, flexWrap: "wrap" }}>
                    <InformationCircleIcon color={color.black[4]} size={16} strokeWidth={2} />
                    <Text style={[styles.caption]}>
                        {t("logs.tips.a")}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
}
