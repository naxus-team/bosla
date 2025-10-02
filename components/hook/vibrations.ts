import { Vibration } from "react-native";
import { getData, setData } from "../storage";

export async function vibrate(duration: number | number[] = 60) {
    const enabled = await isVibrationEnabled();
    if (enabled) {
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

export async function isVibrationEnabled(): Promise<boolean> {
    let settings = await getData<{ vibrationEnabled?: boolean }>("settings");

    if (!settings) {
        settings = { vibrationEnabled: true };
        await setData("settings", settings);
    }

    return !!settings.vibrationEnabled;
}