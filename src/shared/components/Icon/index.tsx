/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { ViewProps } from "react-native";
import { NumberProp, SvgProps } from "react-native-svg";

interface IconProps extends ViewProps {
  source: React.FC<SvgProps>;
  size?: number;
  width?: NumberProp;
  height?: NumberProp;
  color?: string;
}

const Icon = (props: IconProps) => {
  const {
    source: SvgIcon,
    size = 24,
    width,
    height,
    color,
    ...viewProps
  } = props;
  return (
    <SvgIcon
      width={width ?? size}
      height={height ?? size}
      color={color}
      /* @ts-ignore */
      //   colorLight={Color.Secondary[50]}
      {...viewProps}
    />
  );
};

export default Icon;
