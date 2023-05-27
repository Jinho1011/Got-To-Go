export {};

declare module "react-native-walkthrough-tooltip" {
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  interface TooltipStyleProps {
    children?: React.ReactNode;
  }
}

declare module "react-native-svg-charts" {
  interface ProgressCircleProps {
    children?: React.ReactNode;
    svg?: {
      stroke?: string;
      strokeWidth?: number;
      fill?: string;
    };
  }
}
