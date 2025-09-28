import { Vibration } from "react-native";
import { getData, setData } from "../storage";

export async function vibrate(duration: number | number[] = 60) {
    const settings = (await getData<{ vibrationEnabled?: boolean }>("settings")) || {};
    if (settings.vibrationEnabled) {
        Vibration.vibrate(duration);
    }
}


export async function setVibration(enabled: boolean) {
    const settings = (await getData<{ vibrationEnabled?: boolean }>("settings")) || {};

    const updatedSettings = {
        ...settings,
        vibrationEnabled: enabled,
    };

    await setData("settings", updatedSettings);
}