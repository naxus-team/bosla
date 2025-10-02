import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button, StatusBar, Image, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFonts } from "../utils/font";
import { useStyles } from "../utils/styles";
import { Btn } from "../reusable";
import { useLanguage } from "../../locales";

import { MapPinIcon, UserPlusIcon, PhoneIcon, CheckBadgeIcon, Cog6ToothIcon as Cog6ToothIconSolid, BuildingOfficeIcon, EllipsisHorizontalCircleIcon, ShareIcon, PencilIcon, DocumentDuplicateIcon } from "react-native-heroicons/solid";
import { EllipsisVerticalIcon, Cog6ToothIcon, CheckBadgeIcon as CheckBadgeIconOutlone, InformationCircleIcon, MapIcon, HomeIcon, RectangleStackIcon, HashtagIcon } from "react-native-heroicons/outline";

import { useToast } from "../../providers/ToastProvider";
import { useEffect, useState, useRef } from 'react';
import SlidePanel, { SlidePanelHandle } from "../reusable/SlidePanel";
import { setData, getData } from "../storage";
import { formatPhoneWithSpace } from "../types";
import { colors as color } from "../../theme/colors";

import { useClipboard } from "../hook/useClipboard";
import { vibrate } from '../hook/vibrations';
import { useUser } from "../contexts/UserContext";
import Gallery from "../reusable/Gallery";


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
    const fonts = useFonts();
    const styles = useStyles();

    const { lang, t } = useLanguage();
    const insets = useSafeAreaInsets();


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


    if (!user) return <></>;


    const statsData = [
        { title: "الكلي", value: 25, icon: <HashtagIcon color={color.black[4]} size={24} strokeWidth={2} /> },
        { title: "التنقلات", value: 7, icon: <MapIcon color={color.black[4]} size={24} strokeWidth={2} /> },
        { title: "الإقامات", value: 3, icon: <HomeIcon color={color.black[4]} size={24} strokeWidth={2} /> },
        { title: "الطلبات", value: 15, icon: <RectangleStackIcon color={color.black[4]} size={24} strokeWidth={2} /> },
    ];

    const ProfileStats = () => {
        return (
            <View style={styles.Container}>
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
        <View style={{
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: color.white.hex[10],
            gap: 16
        }}>
            <View style={{
                gap: 32
            }}>
                <View style={{
                    flex: 1,
                    position: "absolute",
                    paddingHorizontal: 16,
                    backgroundColor: color.white.hex[10],
                    width: "100%",
                    height: 52,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 4
                }}>
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
                            slideOpen(true, "settings")
                        }}
                        customize={<Cog6ToothIconSolid color={color.black[6]} size={24} />}
                    />
                    <Btn
                        style={{
                            background: color.transparent,
                            pressedBackground: color.black[1],
                            radius: 16,
                            height: 42,
                            width: 42,
                            fontWeight: "bold",
                            animationSpeed: 100,
                            textAlign: "center",
                            animationType: "default",
                        }}
                        onPress={() => {

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
                                    fontFamily: fonts.bold,
                                    color: "rgba(0,0,0,1)",
                                }}
                            >
                                {user.firstname} {user.lastname}
                            </Text>
                            {user.bio && <Text
                                style={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    fontFamily: fonts.medium,
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
                                            fontFamily: fonts.semibold,
                                            color: color.black.hex[10],
                                            direction: "ltr"
                                        }}
                                    >
                                        {user.dial && user.phone && user.dial} {user.dial && user.phone && formatPhoneWithSpace(user.phone)}
                                    </Text>
                                </View>
                            }
                        />
                        <Btn
                            style={{
                                background: color.transparent,
                                pressedBackground: color.black[1],
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
                                    borderWidth: 2,
                                    borderColor: color.black.hex[1]
                                }
                            }}
                            onPress={() => {
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
                                            fontFamily: fonts.semibold,
                                            color: color.black.hex[10],
                                        }}
                                    >
                                        {t("common.editProfile")}
                                    </Text>
                                </View>
                            }
                        />
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
