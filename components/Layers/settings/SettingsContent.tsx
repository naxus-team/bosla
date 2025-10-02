// components/layers/settings/SettingsContent.tsx

import React, { useState } from "react";
import { View, Text, Image, ScrollView, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import { Btn } from "../../reusable";
import {
    CheckBadgeIcon as CheckBadgeIconOutline,
    KeyIcon,
    BellIcon,
    WrenchScrewdriverIcon,
    MapIcon,
    LanguageIcon,
    QuestionMarkCircleIcon,
    InformationCircleIcon,
    CalendarDaysIcon,
    UserCircleIcon,
    WrenchIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    ChevronDownIcon,
} from "react-native-heroicons/outline";
import { useDirectionalAnimations } from "../../animations";
import {
    CheckBadgeIcon as CheckBadgeIconSolid,
    CheckBadgeIcon,
    EllipsisVerticalIcon,
} from "react-native-heroicons/solid";
import { useStyles } from "../../utils/styles";
import { User, formatPhoneWithSpace } from "../../types";
import { vibrate } from "../../hook/vibrations";
import { colors as color } from "../../../theme/colors";

interface SettingsContentProps {
    user: User;
    openSheet: (status: boolean) => void;
    goToStep: (section: string, sub?: string) => void;
    t: (key: string) => string;
    name: string;
    version: string;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
    user,
    openSheet,
    goToStep,
    t,
    name,
    version,
}) => {
    const styles = useStyles();
    const { EnteringFromRight, ExitingToLeft, EnteringFromLeft, ExitingToRight } = useDirectionalAnimations();
    const settingsItems = [
        {
            icon: UserCircleIcon,
            title: t("settingsItems.account.title"),
            subtitle: t("settingsItems.account.subtitle"),
            action: () => goToStep("profile"),
        },
        {
            icon: WrenchIcon,
            title: t("settingsItems.preferences.title"),
            subtitle: t("settingsItems.preferences.subtitle"),
            action: () => goToStep("preferences"),
        },
        {
            icon: MapIcon,
            title: t("settingsItems.map.title"),
            subtitle: t("settingsItems.map.subtitle"),
            action: () => vibrate(60),
        },
        {
            icon: BellIcon,
            title: t("settingsItems.notifications.title"),
            subtitle: t("settingsItems.notifications.subtitle"),
            action: () => vibrate(60),
        },
        {
            icon: LanguageIcon,
            title: t("settingsItems.language.title"),
            subtitle: t("settingsItems.language.subtitle"),
            action: () => goToStep("language"),
        },
        {
            icon: CalendarDaysIcon,
            title: t("settingsItems.log.title"),
            subtitle: t("settingsItems.log.subtitle"),
            action: () => goToStep("log"),
        },
        {
            icon: QuestionMarkCircleIcon,
            title: t("settingsItems.help.title"),
            subtitle: t("settingsItems.help.subtitle"),
            action: () => vibrate(60),
        },
        {
            icon: DocumentTextIcon,
            title: t("settingsItems.terms.title"),
            subtitle: t("settingsItems.terms.subtitle"),
            action: () => goToStep("terms"),
        },
        {
            icon: ShieldCheckIcon,
            title: t("settingsItems.privacy.title"),
            subtitle: t("settingsItems.privacy.subtitle"),
            action: () => goToStep("privacy"),
        },
        {
            icon: InformationCircleIcon,
            title: t("settingsItems.about.title"),
            subtitle: t("settingsItems.about.subtitle"),
            action: () => vibrate(60),
        },
    ];
    return (
        <Animated.View
            key="settings"
            entering={EnteringFromRight}
            exiting={ExitingToRight}
            style={[styles.animatedScreen]}
        >
            <FlatList
                data={settingsItems}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Btn
                        style={{
                            background: color.white[0],
                            pressedBackground: color.black[1],
                            radius: 0,
                            height: 86,
                            animationSpeed: 100,
                            fullWidth: true,
                            animationType: "default",
                        }}
                        onPress={item.action}
                        customize={
                            <View style={styles.box}>
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 58,
                                        height: "100%",
                                    }}
                                >
                                    <item.icon color={color.black.hex[5]} size={24} strokeWidth={2} />
                                </View>
                                <View style={styles.gap4}>
                                    <Text style={styles.overline}>{item.title}</Text>
                                    <Text style={styles.caption}>{item.subtitle}</Text>
                                </View>
                            </View>
                        }
                    />
                )}

                ListHeaderComponent={
                    <>
                        {/* Profile Btn */}
                        <Btn
                            style={{
                                background: color.white[0],
                                pressedBackground: color.black.hex[1],
                                colorText: "#000",
                                radius: 0,
                                width: "100%",
                                height: 86,
                                fontWeight: "bold",
                                animationSpeed: 100,
                                fullWidth: true,
                                animationType: "default",
                            }}
                            onPress={() => goToStep("profile")}
                            customize={
                                <View
                                    style={[
                                        styles.box,
                                        { justifyContent: "space-between", gap: 0, paddingHorizontal: 0 },
                                    ]}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 16,
                                            paddingHorizontal: 16,
                                        }}
                                    >
                                        <View>
                                            <Image
                                                source={{ uri: user.avatar }}
                                                style={{
                                                    width: 58,
                                                    height: 58,
                                                    resizeMode: "cover",
                                                    borderRadius: 200,
                                                }}
                                            />
                                            {user.verify && (
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        margin: -4,
                                                        bottom: 0,
                                                    }}
                                                >
                                                    <CheckBadgeIconOutline
                                                        style={{ position: "absolute" }}
                                                        color={"rgba(255,255,255,1)"}
                                                        size={24}
                                                        strokeWidth={5}
                                                    />
                                                    <CheckBadgeIconSolid
                                                        color={"rgba(238,15,56,1)"}
                                                        size={24}
                                                    />
                                                </View>
                                            )}
                                        </View>
                                        <View style={styles.gap4}>
                                            <Text style={styles.name}>
                                                {user.firstname}
                                                {user.lastname && ` ${user.lastname}`}
                                            </Text>
                                            <Text style={styles.phone}>
                                                {user.dial && user.phone && user.dial}{" "}
                                                {user.dial &&
                                                    user.phone &&
                                                    formatPhoneWithSpace(user.phone)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            height: "100%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingHorizontal: 16,
                                        }}
                                    >
                                        <Btn
                                            style={{
                                                background: color.white[10],
                                                pressedBackground: color.black[1],
                                                radius: 16,
                                                width: 42,
                                                height: 42,
                                                animationSpeed: 150,
                                                animationType: "default",
                                                border: {
                                                    borderWidth: 2,
                                                    borderColor: color.black.hex[1],
                                                },
                                            }}
                                            onPress={() => openSheet(true)}
                                            customize={
                                                <View
                                                    style={{ alignItems: "center", justifyContent: "center" }}
                                                >
                                                    <ChevronDownIcon size={24} color={color.black.hex[6]} strokeWidth={2} />
                                                </View>
                                            }
                                        />
                                    </View>
                                </View>
                            }
                        />
                        <View
                            style={{
                                width: "100%",
                                height: 2,
                                backgroundColor: color.forceground,
                            }}
                        />
                    </>
                }
                // ListFooterComponent={
                //     <View
                //         style={{
                //             height: 90,
                //             alignItems: "center",
                //             justifyContent: "center",
                //             gap: 8,
                //         }}
                //     >
                //         <Logo color={color.black.hex[4]} width={38} height={26.78} />
                //         <Text style={styles.caption}>
                //             {name} · v{version}
                //         </Text>
                //     </View>
                // }
                style={{ backgroundColor: color.white[10] }}
                showsVerticalScrollIndicator={false}
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

        </Animated.View>
    );
};

export default SettingsContent;
