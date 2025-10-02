declare module "react-native-inset-shadow" {
  import { ComponentType } from "react";
  import { ViewProps } from "react-native";

  interface InsetShadowProps extends ViewProps {
    shadowColor?: string;
    shadowOpacity?: number;
    shadowRadius?: number;
    shadowOffset?: { width: number; height: number };
    containerStyle?: object;
  }

  const InsetShadow: ComponentType<InsetShadowProps>;
  export default InsetShadow;
}
