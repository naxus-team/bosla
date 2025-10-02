import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Btn } from "../reusable";
import { useLog } from "../../components/contexts/LogContext";
import * as ImagePicker from "react-native-image-picker";
import RNFS from "react-native-fs";
import { useFonts } from "../utils/font";
import { colors as color } from "../../theme/colors";
import { vibrate } from "../hook/vibrations";
import { PencilIcon } from "react-native-heroicons/solid";
import { useToast } from "../../providers/ToastProvider";
import { useLanguage } from "../../locales";

type AvatarPickerProps = {
    initialPath?: string;
    onChange: (path: string) => void;
    size?: number;
    avatar?: string;
};

export default function AvatarPicker({ initialPath, onChange, size = 120, avatar }: AvatarPickerProps) {
    const fonts = useFonts();
    const { t } = useLanguage();
    const { addLog } = useLog();
    const [avatarPath, setAvatarPath] = useState(initialPath || null);
    const { notify } = useToast();

    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: "photo" }, async (res) => {
            if (res.assets && res.assets.length > 0) {
                const sourcePath = res.assets[0].uri!.replace("file://", "")
                const destPath = `${RNFS.DocumentDirectoryPath}/avatar_${Date.now()}.jpg`

                try {
                    if (avatarPath) {
                        const oldPath = avatarPath.replace("file://", "")
                        const exists = await RNFS.exists(oldPath)
                        if (exists) {
                            await RNFS.unlink(oldPath)
                        }
                    }

                    await RNFS.copyFile(sourcePath, destPath)
                    const fullPath = "file://" + destPath
                    setAvatarPath(fullPath)
                    onChange(fullPath)
                    addLog({ type: "info", from: "PICTURE", message: `Your profile picture has been changed` })
                } catch (err) {
                    console.error("[Fatal:AP]:", err)
                    addLog({ type: "error", from: "PICTURE", message: `Fatal: ${err}` })
                }
            }
        });
    };

    return (
        <View style={{ alignItems: "center" }}>
            <Btn
                style={{
                    background: color.white.hex[10],
                    pressedBackground: color.black.hex[1],
                    radius: 16,
                    height: 38,
                    padding: { horizontal: 16 },
                    fontWeight: "bold",
                    fullWidth: true,
                    animationSpeed: 100,
                    textAlign: "center",
                    animationType: "default",
                }}
                onPress={() => {
                    pickImage();
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
                        <PencilIcon color={color.black[10]} size={16} />
                        <Text
                            style={{
                                fontSize: 14,
                                lineHeight: 20,
                                fontFamily: fonts.semibold,
                                color: color.black[10],
                            }}
                        >
                            {t("profile.change.picture")}
                        </Text>
                    </View>
                }
            />
        </View>
    );
}