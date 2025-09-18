import { Keyframe } from "react-native-reanimated";

export const EnteringFromRight = new Keyframe({
    0: { transform: [{ translateX: "100%" }] },
    100: { transform: [{ translateX: "0%" }] },
}).duration(200);

export const ExitingToLeft = new Keyframe({
    0: { transform: [{ translateX: "0%" }] },
    100: { transform: [{ translateX: "-100%" }] },
}).duration(200);

export const EnteringFromLeft = new Keyframe({
    0: { transform: [{ translateX: "-100%" }] },
    100: { transform: [{ translateX: "0%" }] },
}).duration(200);

export const ExitingToRight = new Keyframe({
    0: { transform: [{ translateX: "0%" }] },
    100: { transform: [{ translateX: "100%" }] },
}).duration(200);
