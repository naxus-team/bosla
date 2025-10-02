import { useEffect } from "react";
import { BackHandler } from "react-native";

type BackHandlerCallback = () => boolean;

export function useBackHandler(handler: BackHandlerCallback) {
    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            handler
        );

        return () => subscription.remove();
    }, [handler]);
}
