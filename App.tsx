import "./global.css"
import { Text, SafeAreaView as Div } from "react-native";
import Svg, { Path } from 'react-native-svg';


export default function App() {
  return (
    <Div className="flex-1 items-center justify-center bg-white">
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Path d="M10,10 L90,10 L90,90 L10,90 Z" fill="blue" />
      </Svg>
      <Text className="text-xl font-bold text-blue-500">
        توكلنا علي الله
      </Text>
    </Div>
  );
}