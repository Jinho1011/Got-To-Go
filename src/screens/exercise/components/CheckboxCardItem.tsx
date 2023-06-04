import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import styles, {
  _cardStyle,
  _circleCheckContainer,
} from "./CheckboxCardItem.style";
import { IExerciseData } from "../ExerciseData.interface";

const { width: ScreenWidth } = Dimensions.get("window");

// const defaultCheckIcon = require("./local-assets/check-icon-dark.png");

export interface ISource {
  source: string | { uri: string };
}

export interface ICheckboxCardProps {
  exerciseData: IExerciseData;
  width?: number;
  height?: number;
  quantity?: string;
  darkMode?: boolean;
  isChecked?: boolean;
  circleSize?: number;
  ImageComponent?: any;
  borderRadius?: number;
  backgroundColor?: string;
  checkedTextColor?: string;
  circleBorderColor?: string;
  circleBorderRadius?: number;
  uncheckedTextColor?: string;
  enableQuantityText?: boolean;
  circleBackgroundColor?: string;
  checkImageSource?: ISource;
  sortIconImageSource?: ISource;
  textStyle?: any;
  quantityTextStyle?: any;
  rightIconComponent?: React.ReactElement;
  checkIconComponent?: React.ReactElement;
  onPress: (checked: boolean) => void;
}

interface IState {
  checked: boolean;
}

export default class RNCheckboxCard extends React.Component<
  ICheckboxCardProps,
  IState
> {
  constructor(props: ICheckboxCardProps) {
    super(props);
    this.state = {
      checked: props.isChecked || false,
    };
  }

  handleOnPress = () => {
    this.setState({ checked: !this.state.checked }, () => {
      // ? Outside onPress Callback
      this.props.onPress && this.props.onPress(this.state.checked);
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  // renderCheckIcon = () => {
  //   const {
  //     checkIconComponent,
  //     ImageComponent = Image,
  //     checkImageSource = defaultCheckIcon,
  //   } = this.props;
  //   return (
  //     checkIconComponent || (
  //       <ImageComponent
  //         resizeMode="contain"
  //         source={checkImageSource}
  //         style={styles.checkIconImageStyle}
  //       />
  //     )
  //   );
  // };

  renderCircleCheck = () => {
    const { checked } = this.state;
    const {
      circleSize = 25,
      circleBorderRadius = 25,
      circleBackgroundColor = "#2b2b2c",
      circleBorderColor = "#e5e5e5",
    } = this.props;
    return (
      <View
        style={_circleCheckContainer(
          checked,
          circleSize,
          circleBorderRadius,
          circleBackgroundColor,
          circleBorderColor,
        )}
      >
        {/*{checked && this.renderCheckIcon()}*/}
      </View>
    );
  };

  renderTextContainer = () => {
    const { name, type, muscle, equipment, difficulty, instructions } =
      this.props.exerciseData;
    return (
      <View style={styles.textContainer}>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          {name}
        </Text>
        <Text style={{ color: "white", fontSize: 10 }}>
          {[type, muscle, equipment, difficulty].join(" / ")}
        </Text>
        <Text style={{ color: "white", fontSize: 10 }}>{instructions}</Text>
      </View>
    );
  };

  render() {
    const {
      borderRadius = 10,
      width = ScreenWidth * 0.9,
      backgroundColor = "#2b2b2c",
    } = this.props;
    return (
      <RNBounceable
        bounceEffectIn={0.97}
        bouncinessIn={3}
        {...this.props}
        style={styles.container}
        onPress={this.handleOnPress}
      >
        <View style={_cardStyle(borderRadius, width, backgroundColor)}>
          {this.renderTextContainer()}
          {this.renderCircleCheck()}
        </View>
      </RNBounceable>
    );
  }
}
