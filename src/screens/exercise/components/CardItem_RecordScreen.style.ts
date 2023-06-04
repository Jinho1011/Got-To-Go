import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  contentContainer: ViewStyle;
  setContainer: ViewStyle;
  weightContainer: ViewStyle;
  countContainer: ViewStyle;

  textStyle: TextStyle;
  textInputStyle: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 16,
      marginTop: 16,
      borderWidth: 1,
      borderRadius: 8,
      width: ScreenWidth * 0.9,
      borderColor: colors.borderColor,
      backgroundColor: colors.dynamicBackground,
    },
    contentContainer: {
      marginTop: 16,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    setContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    weightContainer: {
      marginLeft: 16,
      flexDirection: "column",
      alignItems: "center",
    },
    countContainer: {
      marginLeft: 16,
      flexDirection: "column",
      alignItems: "center",
    },
    textStyle: {
      color: "white",
      fontSize: 15,
      marginBottom: 5,
    },
    textInputStyle: {
      color: "white",
      fontSize: 15,
      marginBottom: 5,
    },
  });
};
