// components/reusable/CheckBox.tsx
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { CheckIcon } from "react-native-heroicons/outline";
import { colors } from "../../theme/colors";

type CheckBoxProps = {
    checked?: boolean;
    onPress?: () => void;
    size?: number;
    color?: string;
    disabled?: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({
    checked = false,
    onPress,
    size = 24,
    color = colors.primary.hex[10],
    disabled = false,
}) => {
    return (
        <Pressable
            onPress={() => !disabled && onPress?.()}
            style={[
                styles.container,
                { width: size, height: size, borderColor: colors.black[1] },
                checked && { backgroundColor: color, borderColor: colors.primary.hex[10] },
                
                disabled && { opacity: 0.5 },
            ]}
        >
            {checked && <CheckIcon color={colors.white.hex[10]} size={size * 0.6} strokeWidth={2.5} />}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2.5,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default CheckBox;
