import { Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get("window");

export function Frame() {
    const insets = useSafeAreaInsets();
    return height - insets.top - insets.bottom;
}