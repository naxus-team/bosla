import { useState, useCallback } from "react";
import Clipboard from "@react-native-clipboard/clipboard";

export function useClipboard() {
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const copyToClipboard = useCallback((text: string) => {
        Clipboard.setString(text);
        setCopiedText(text);
    }, []);

    const getClipboardContent = useCallback(async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
        return text;
    }, []);

    return { copiedText, copyToClipboard, getClipboardContent };
}
