import { ViewStyle, StyleSheet, TextStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  header: ViewStyle;
  footer: ViewStyle;
  contentContainer: ViewStyle;
  listContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    titleTextStyle: {
      fontSize: 32,
    },
    buttonStyle: {
      width: ScreenWidth * 0.9,
      height: 50,
      marginTop: 32,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#dc143c",
    },
    buttonTextStyle: {
      color: colors.white,
      fontWeight: "700",
    },
    header: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    footer: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    contentContainer: {
      flex: 1,
      marginTop: 16,
      alignItems: "center",
    },
    listContainer: {
      marginTop: 8,
    },
  });
};
