// /layers/components/ProfileSection.tsx
import { View, Text, Image } from "react-native";
import Animated from "react-native-reanimated";
import { Input } from "../../../reusable";
import { useStyles } from "../../../utils/styles";
import { User, Step } from "../../../types";

type BioProps = {
    step: Step;
    user: User;
    goToStep: (section: string, sub?: string) => void;
    setUser: {
        setBio: (value: string) => void;
    };
    animation: { entering: any; exiting: any };
    variable: { bio: any }
};

export default function Bio({ step, user, goToStep, setUser, animation, variable }: BioProps) {
    const styles = useStyles();
    return (
        <Animated.View
            key={step.section + (step.sub || "")}
            entering={animation.entering}
            exiting={animation.exiting}
            style={styles.animatedScreen}
        >
            <View style={styles.wrapper}>
                <View style={styles.columns}>
                    <Input
                        label="الوصف"
                        value={variable.bio}
                        onChangeText={setUser.setBio}
                    />
                </View>
            </View>
        </Animated.View>
    );
}
