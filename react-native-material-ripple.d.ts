declare module "react-native-material-ripple" {
  import { ComponentType } from "react";
  import { ViewProps } from "react-native";

  export interface RippleProps extends ViewProps {
    rippleColor?: string;
    rippleOpacity?: number;
    rippleDuration?: number;
    rippleSize?: number;
    rippleContainerBorderRadius?: number;
    rippleCentered?: boolean;
    rippleSequential?: boolean;
    rippleFades?: boolean;
    disabled?: boolean;
    onRippleAnimation?: () => void;
  }

  const Ripple: ComponentType<RippleProps>;

  export default Ripple;
}
