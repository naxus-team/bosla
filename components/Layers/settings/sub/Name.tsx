// /layers/components/Name.tsx
import { View, Text, Image } from "react-native";
import Animated from "react-native-reanimated";
import { Input } from "../../../reusable";
import { useStyles } from "../../../utils/styles";
import { User, Step } from "../../../types";

type NameProps = {
    step: Step;
    user: User;
    goToStep: (section: string, sub?: string) => void;
    setUser: {
        setFirstName: (value: string) => void;
        setLastName: (value: string) => void;
    };
    animation: { entering: any; exiting: any };
    variable: { firstName: any, lastName: any }
};

export default function Name({ step, user, goToStep, setUser, animation, variable }: NameProps) {
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
                        label="الأسم الأول"
                        value={variable.firstName}
                        onChangeText={setUser.setFirstName}
                    />
                    <View style={{ width: "100%", height: 2, backgroundColor: "#f6f6f6" }} />
                    <Input
                        label={`الأسم الأخير`}
                        value={variable.lastName}
                        onChangeText={setUser.setLastName}
                    />
                </View>
            </View>
        </Animated.View>
    );
}
