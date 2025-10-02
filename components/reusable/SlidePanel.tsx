import React, { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated, Easing, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors as color } from "../../theme/colors";
import { useLanguage } from "../../locales";

const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const { width, height } = Dimensions.get("window");

export type SlidePanelHandle = {
    open: () => void;
    close: () => void;
};

type SlidePanelProps = {
    children: React.ReactNode;
};

const SlidePanel = forwardRef<SlidePanelHandle, SlidePanelProps>(({ children }, ref) => {
    const { lang } = useLanguage();
    const translateX = useRef(new Animated.Value(lang === "en_us" ? width : -width)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(false);
    const insets = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true);
            Animated.timing(translateX, {
                toValue: 0,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start();
        },
        close: () => {
            Animated.timing(translateX, {
                toValue: lang === "en_us" ? width : -width,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
            });
        },
    }));

    // لون overlay متدرج
    const overlayBackgroundColor = overlayOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [color.transparent, color.black[2]],
    });

    return (
        <Animated.View
            style={[
                styles.overlay,
                {
                    top: -insets.top,
                    display: visible ? "flex" : "none",
                    // backgroundColor: overlayBackgroundColor,
                },
            ]}
        >
            <Animated.View
                style={[
                    styles.panel,
                    {
                        transform: [{ translateX }],
                        top: 0,
                        height: height + insets.top - insets.bottom,
                    },
                ]}
            >
                <View
                    style={{
                        flex: 1,
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                    }}
                >
                    {children}
                </View>
            </Animated.View>
        </Animated.View>
    );
});

export default SlidePanel;

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    panel: {
        position: "absolute",
        left: 0,
        right: 0,
        backgroundColor: "#f6f6f6",
        overflow: "hidden",
    },
});

