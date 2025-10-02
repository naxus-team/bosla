// utils/animations.tsx
import { withTiming, withSpring, withDelay } from "react-native-reanimated";

type Options = {
    duration?: number;
    delay?: number;
    damping?: number;
    stiffness?: number;
};

/** Fade In */
export const fadeIn = (options?: Options) => {
    return {
        opacity: options?.delay
            ? withDelay(options.delay, withTiming(1, { duration: options.duration ?? 300 }))
            : withTiming(1, { duration: options?.duration ?? 300 }),
    };
};

/** Fade Out */
export const fadeOut = (options?: Options) => {
    return {
        opacity: options?.delay
            ? withDelay(options.delay, withTiming(0, { duration: options.duration ?? 300 }))
            : withTiming(0, { duration: options?.duration ?? 300 }),
    };
};

/** Slide Up */
export const slideUp = (translateY: number, options?: Options) => {
    return {
        transform: [
            {
                translateY: withSpring(0, {
                    damping: options?.damping ?? 15,
                    stiffness: options?.stiffness ?? 120,
                }),
            },
        ],
        opacity: options?.delay
            ? withDelay(options.delay, withTiming(1, { duration: options.duration ?? 300 }))
            : withTiming(1, { duration: options?.duration ?? 300 }),
    };
};

/** Slide Down */
export const slideDown = (translateY: number, options?: Options) => {
    return {
        transform: [
            {
                translateY: withSpring(translateY, {
                    damping: options?.damping ?? 15,
                    stiffness: options?.stiffness ?? 120,
                }),
            },
        ],
        opacity: options?.delay
            ? withDelay(options.delay, withTiming(0, { duration: options.duration ?? 300 }))
            : withTiming(0, { duration: options?.duration ?? 300 }),
    };
};

export const slideLeft = (translateX: number, options?: Options) => {
    return {
        transform: [
            {
                translateX: withSpring(-translateX, {
                    damping: options?.damping ?? 15,
                    stiffness: options?.stiffness ?? 120,
                }),
            },
        ],
        opacity: options?.delay
            ? withDelay(options.delay, withTiming(1, { duration: options.duration ?? 300 }))
            : withTiming(1, { duration: options?.duration ?? 300 }),
    };
};

/** Slide Right */
export const slideRight = (translateX: number, options?: Options) => {
    return {
        transform: [
            {
                translateX: withSpring(translateX, {
                    damping: options?.damping ?? 15,
                    stiffness: options?.stiffness ?? 120,
                }),
            },
        ],
        opacity: options?.delay
            ? withDelay(options.delay, withTiming(1, { duration: options.duration ?? 300 }))
            : withTiming(0, { duration: options?.duration ?? 300 }),
    };
};