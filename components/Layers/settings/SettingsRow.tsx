// /layers/components/SettingsRow.tsx
import { View, Text } from "react-native";
import { Btn } from "../../reusable";
import { Switch } from "../../reusable";
import { useStyles } from "../../utils/styles";
import { colors as color } from "../../../theme/colors";

type SettingsRowProps = {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
    switchComponent?: React.ReactNode;
};

export default function SettingsRow({ title, subtitle, icon, onPress, switchComponent }: SettingsRowProps) {
    const styles = useStyles();

    return (
        <Btn
            style={{
                background: color.transparent,
                pressedBackground: color.black[1],
                radius: 0,
                height: 72,
                fontWeight: "bold",
                animationSpeed: 150,
                fullWidth: true,
                animationType: "default",
            }}
            onPress={onPress}
            customize={
                <View style={[styles.box, { justifyContent: "space-between" }]}>
                    <View style={[styles.gap4]}>
                        <Text style={styles.overline}>{title}</Text>
                        {subtitle && <Text style={styles.caption}>{subtitle}</Text>}
                    </View>
                    {icon && <View style={{ width: 32, alignItems: "center" }}>{icon}</View>}
                    {switchComponent}
                </View>
            }
        />
    );
}
