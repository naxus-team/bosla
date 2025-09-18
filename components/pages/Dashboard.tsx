import BottomNav from "../shared/BottomNav";
import Animated, {
    Keyframe,
    FadeIn,
    FadeOut,
    SlideInLeft,
    SlideOutLeft,
    SlideInRight,
    SlideOutRight,
    ZoomIn,
    ZoomOut,
    runOnJS
} from "react-native-reanimated";

import { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, Dimensions, Vibration, Keyboard, StyleSheet, Button } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Frame } from "../frame";
import { EnteringFromRight, ExitingToLeft, ExitingToRight, EnteringFromLeft } from "../animations";

import { SquareServices } from "../Layers";
import Settings from "../Layers/Settings";



const { height } = Dimensions.get("window");

type StepType = "services" | "requests" | "wallet" | "settings";

export function Dashboard() {
    const [isAnimating, setIsAnimating] = useState(false);
    const insets = useSafeAreaInsets();

    const [step, setStep] = useState<StepType>("settings");

    const goToStep = (newStep: "services" | "settings") => {
        setIsAnimating(true); // قفل اللمس
        setStep(newStep);

        // بعد 300ms (مدة الانيميشن) افتح اللمس تاني
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    useEffect(() => {
        console.log(height);
    }, []);
    return (
        <SafeAreaView style={styles.safeArea}>
            {step === "services" && (
                <Animated.View
                    key="services"
                    style={[styles.container, { height: Frame() - 82 }]}>

                    <SquareServices />
                </Animated.View>)
            }
            {step === "requests" && (
                <Animated.View
                    key="requests"
                    style={[styles.container, { height: Frame() - 82 }]}>

                    {/* محتوى الداشبورد */}
                    <Text>
                        test2
                    </Text>
                </Animated.View>)
            }
            {step === "wallet" && (
                <Animated.View
                    key="wallet"
                    style={[styles.container, { height: Frame() - 82 }]}>

                    {/* محتوى الداشبورد */}
                    <Text>
                        test3
                    </Text>
                </Animated.View>)
            }
            {step === "settings" && (
                <Animated.View
                    key="settings"
                    style={[styles.container, { height: Frame() - 82 }]}>

                    <Settings />
                </Animated.View>)
            }
            <BottomNav
                control={(stepTab) => setStep(stepTab)} activeTab={step}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        width: "100%",
        backgroundColor: "white",
    },
});