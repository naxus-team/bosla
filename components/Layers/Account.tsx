import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button, StatusBar, Image, FlatList } from 'react-native';
import { Fonts } from "../utils/font";
import { Btn } from "../reusable";
import { t } from "../../locales";

import { MapPinIcon, UserPlusIcon, PhoneIcon, CheckBadgeIcon, Cog6ToothIcon as Cog6ToothIconSolid, BuildingOfficeIcon, EllipsisHorizontalCircleIcon, ShareIcon, PencilIcon, DocumentDuplicateIcon } from "react-native-heroicons/solid";
import { EllipsisVerticalIcon, Cog6ToothIcon, CheckBadgeIcon as CheckBadgeIconOutlone, InformationCircleIcon, MapIcon, HomeIcon, RectangleStackIcon, HashtagIcon } from "react-native-heroicons/outline";

import { useToast } from "../../providers/ToastProvider";
import { useEffect, useState, useRef } from 'react';
import SlidePanel, { SlidePanelHandle } from "../reusable/SlidePanel";
import { setData, getData } from "../storage";
import { User, StorageKeys } from "../types";
import { colors as color } from "../../theme/colors";

import { useClipboard } from "../hook/useClipboard";
import { Loader } from 'lucide-react-native';
import { vibrate } from '../hook/vibrations';
import { displayNotification } from '../hook/notifications';
import { useUser } from "../contexts/UserContext";

const { width, height } = Dimensions.get("window");


type AccountProf = {
    slideOpen: (status: boolean, typeSlide: string, section?: string) => void,
}

type StatCardProps = {
    title: string;
    icon: string;
    value: number;
};

export default function Account({ slideOpen }: AccountProf) {
    const date = new Date(Date.now());

    const { user, loading, refreshUser } = useUser();
    const panelRef = useRef<SlidePanelHandle>(null);


    const { copiedText, copyToClipboard, getClipboardContent } = useClipboard();
    const { notify } = useToast();

    const handleSlideOpen = (status: boolean) => {
        if (status) {
            panelRef.current?.open();
        } else {
            panelRef.current?.close();
        }
    };

    function formatPhoneWithSpace(number: string): string {
        const clean = number.replace(/\s+/g, "");
        const prefix = clean.slice(0, 3);    // +20
        const first = clean.slice(3, 5);     // 15
        const rest = clean.slice(5);         // 50396217
        return `${prefix} ${first} ${rest}`;
    }

    function formatPhoneNoSpace(number: string): string {
        return number.replace(/\s+/g, "");
    }

    if (!user) return <></>;


    const statsData = [
        { title: "الكلي", value: 25, icon: <HashtagIcon color={color.black[4]} size={24} strokeWidth={2} /> },
        { title: "التنقلات", value: 7, icon: <MapIcon color={color.black[4]} size={24} strokeWidth={2} /> },
        { title: "الإقامات", value: 3, icon: <HomeIcon color={color.black[4]} size={24} strokeWidth={2} /> },
        { title: "الطلبات", value: 15, icon: <RectangleStackIcon color={color.black[4]} size={24} strokeWidth={2} /> },
    ];

    const ProfileStats = () => {
        return (
            <View style={styles.container}>
                {statsData.map((item, index) => (
                    <View key={index} style={styles.card}>
                        {item.icon}
                        <Text style={styles.value}>{item.value}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.Container}>
            <View style={{
                backgroundColor: "rgba(255,255,255,1)",
                gap: 32
            }}>
                <View style={styles.header}>
                    <Btn
                        style={{
                            background: color.transparent,
                            pressedBackground: color.black[1],
                            colorText: "#000",
                            radius: 16,
                            height: 42,
                            width: 42,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            textAlign: "center",
                            animationType: "default",
                        }}
                        onPress={() => {
                            vibrate(60);
                            slideOpen(true, "settings")
                        }}
                        customize={<Cog6ToothIconSolid color={color.black[6]} size={24} />}
                    />
                    <Btn
                        style={{
                            background: color.transparent,
                            pressedBackground: color.black[1],
                            colorText: "#000",
                            radius: 16,
                            height: 42,
                            width: 42,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            textAlign: "center",
                            animationType: "default",
                        }}
                        onPress={() => {
                            vibrate(60);
                        }}
                        customize={<EllipsisVerticalIcon color={color.black[6]} fill={color.black[6]} size={24} strokeWidth={2} />}
                    />
                </View>
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 16
                }}>
                    <View>
                        <Image
                            source={{ uri: user.avatar }} // لينك صورة تجريبية
                            style={{
                                width: 200,
                                height: 200,
                                resizeMode: "cover", borderRadius: 200
                            }}
                        />
                        {user.verify && (
                            <View style={{
                                position: "absolute",
                                margin: 8,
                                bottom: 0
                            }}>
                                <CheckBadgeIconOutlone style={{
                                    position: "absolute",
                                }} color={"rgba(255,255,255,1)"} size={38} strokeWidth={5} />
                                <CheckBadgeIcon color={"rgba(238,15,56,1)"} size={38} />
                            </View>
                        )}
                    </View>
                    <View style={{
                        alignItems: "center",
                        gap: 16
                    }}>
                        <View style={{
                            alignItems: "center",
                            gap: 8
                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    lineHeight: 38,
                                    fontFamily: Fonts["bold"],
                                    color: "rgba(0,0,0,1)",
                                }}
                            >
                                {user.firstname} {user.lastname}
                            </Text>
                            {user.bio && <Text
                                style={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    fontFamily: Fonts["medium"],
                                    color: color.black.hex[6],
                                }}
                            >
                                {user.bio}
                            </Text>}
                        </View>
                        <Btn
                            style={{
                                background: "#fff",
                                pressedBackground: "#eaeaea",
                                colorText: "#000",
                                radius: 16,
                                height: 32,
                                fullWidth: false,
                                fontWeight: "bold",
                                animationSpeed: 100,
                                textAlign: "center",
                                animationType: "default",
                            }}
                            onPress={() => {
                                if (user.phone) {
                                    vibrate(60);
                                    copyToClipboard(user.phone);
                                    notify("تم نسخ الرقم", { type: "info" });
                                } else {
                                    notify("حدث مشكلة, حاول لاحقاً", { type: "info" });
                                }
                            }}
                            customize={
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 8,
                                        gap: 4
                                    }}
                                >
                                    <DocumentDuplicateIcon color={"rgba(0,0,0,0.6)"} size={16} />

                                    <Text
                                        style={{

                                            fontSize: 16,
                                            lineHeight: 24,
                                            fontFamily: Fonts["semibold"],
                                            color: color.black.hex[10], // يبان فوق الخلفية السودا
                                            direction: "ltr"
                                        }}
                                    >
                                        {formatPhoneWithSpace(user.phone || "")}
                                    </Text>
                                </View>
                            }
                        />
                        <Btn
                            style={{
                                background: "rgba(0,0,0,0)",
                                pressedBackground: "rgba(0,0,0,.08)",
                                colorText: "#000",
                                radius: 16,
                                height: 38,
                                padding: { horizontal: 16 },
                                fontWeight: "bold",
                                fullWidth: true,
                                animationSpeed: 100,
                                textAlign: "center",
                                animationType: "default",
                                border: {
                                    borderWidth: 1,
                                    borderColor: color.black.hex[1]
                                }
                            }}
                            onPress={() => {
                                vibrate(60);
                                slideOpen(true, "settings", "profile");
                            }}
                            customize={
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 8,
                                        paddingHorizontal: 16,
                                    }}
                                >
                                    <PencilIcon color={color.black.hex[6]} size={16} />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            lineHeight: 20,
                                            fontFamily: Fonts["semibold"],
                                            color: color.black.hex[10],
                                        }}
                                    >
                                        تعديل الملف الشخصي
                                    </Text>
                                </View>
                            }
                        />
                        <View style={[styles.border]}>
                            <ProfileStats />
                        </View>
                        {/* <View style={{
                                    alignItems: "center"
                                }}>
                                    <Btn
                                        style={{
                                            background: "rgba(0,0,0,1)",
                                            pressedBackground: "rgba(0,0,0,.8)",
                                            colorText: "#000",
                                            radius: 16,
                                            height: 38,
                                            width: 158,
                                            fontWeight: "bold",
                                            animationSpeed: 100,
                                            textAlign: "center",
                                            animationType: "default",
        
                                        }}
                                        onPress={() => { }}
                                        customize={
        
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 8
                                            }}>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        lineHeight: 20,
                                                        fontFamily: Fonts["semibold"],
                                                        color: "rgba(255,255,255,1)",
                                                    }}
                                                >
                                                    Art reflections
                                                </Text>
                                                <BuildingOfficeIcon color={"rgba(255,255,255,1)"} size={18} />
                                            </View>
                                        }
                                    />
                                </View> */}
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        top: -30,
        width: "100%",
        height: height,
        gap: 16
    },
    header: {
        flex: 1,
        position: "absolute",
        marginTop: 30,
        paddingHorizontal: 16,
        backgroundColor: color.white.hex[10],
        width: "100%",
        height: 52,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4
    },
    border: {
        overflow: "hidden",
        borderRadius: 24,
        backgroundColor: "#f6f6f6",
        borderWidth: 0,
        marginHorizontal: 24
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap-reverse",
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
    title: { fontSize: 16, lineHeight: 24, fontFamily: Fonts["medium"], color: "#555" },
    value: { fontSize: 18, lineHeight: 28, fontFamily: Fonts["bold"], marginVertical: 5 },
});
