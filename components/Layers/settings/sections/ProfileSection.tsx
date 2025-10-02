// /layers/components/ProfileSection.tsx
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Animated from "react-native-reanimated";
import SettingsRow from "../SettingsRow";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useStyles } from "../../../utils/styles";
import { User, Step } from "../../../types";
import { vibrate } from "../../../hook/vibrations";
import AvatarPicker from "../../../reusable/AvatarPicker";
import { useUser } from "../../../contexts/UserContext";
import { useLanguage } from "../../../../locales";
import { colors as color } from "../../../../theme/colors";
import { useToast } from "../../../../providers/ToastProvider";


type ProfileSectionProps = {
    step: Step;
    user: User;
    goToStep: (section: string, sub?: string) => void;
    animation: { entering: any; exiting: any };
};

export default function ProfileSection({ step, user, goToStep, animation }: ProfileSectionProps) {
    const styles = useStyles();
    const { t, lang } = useLanguage();
    const { notify } = useToast();

    const { updateUserField } = useUser();
    const [avatar, setAvatar] = useState<string | null>(null);

    const profileItems = [
        {
            key: "name",
            title: t("profile.name"),
            subtitle: `${user.firstname} ${user.lastname}`,
            onPress: () => { vibrate(60); goToStep("profile", "name"); },
        },
        {
            key: "bio",
            title: t("profile.bio"),
            subtitle: user.bio || t("profile.alter.a"),
            onPress: () => { vibrate(60); goToStep("profile", "bio"); },
        },
    ];
    return (
        <Animated.View
            key={step.section + (step.sub || "")}
            entering={animation.entering}
            exiting={animation.exiting}
            style={styles.animatedScreen}
        >
            <View style={styles.wrapper}>
                <View style={{ alignItems: "center", marginVertical: 16 }}>
                    <Image
                        source={{ uri: user.avatar }}
                        style={{ width: 200, height: 200, borderRadius: 200 }}
                    />
                </View>


                <AvatarPicker
                    initialPath={avatar || undefined}
                    onChange={(path) => {
                        setAvatar(path);
                        updateUserField("avatar", path)
                        notify(t("profile.message.a.success"), { type: "success" });
                    }}
                    size={96}
                    avatar={user.avatar}
                />
                <View style={styles.columns}>
                    {profileItems.map((item, index) => (
                        <View key={item.key}>
                            <SettingsRow
                                title={item.title}
                                subtitle={item.subtitle}
                                onPress={item.onPress}
                                icon={!lang ? <ChevronLeft color={color.black[6]} /> : <ChevronRight color={color.black[6]} />}
                            />
                            {index < profileItems.length - 1 && (
                                <View style={{ width: "100%", height: 2, backgroundColor: color.forceground }} />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </Animated.View>
    );
}
