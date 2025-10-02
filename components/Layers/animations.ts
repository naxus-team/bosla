import { EnteringFromRight, ExitingToRight, EnteringFromLeft, ExitingToLeft } from "../animations";
export type AnimationType = any; // أو اتركها any لو مش مهم التايب

export const Animations: Record<string, AnimationType> = {
    enterFromLeft: EnteringFromLeft,
    exitToRight: ExitingToRight,
    enterFromRight: EnteringFromRight,
    exitToLeft: ExitingToLeft,
};
