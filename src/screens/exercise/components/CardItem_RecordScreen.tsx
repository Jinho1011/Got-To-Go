import React, { useMemo } from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import createStyles from "./CardItem_RecordScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface exerciseCardItemProps {
  style?: CustomStyleProp;
  nameData: string;
  onPress: () => void;
}

const CardItem: React.FC<exerciseCardItemProps> = ({
  style,
  nameData,
  onPress,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [number, onChangeNumber] = React.useState("");

  const Header = () => (
    <>
      <Text style={{ color: "white", fontSize: 25, marginBottom: 5 }}>
        {nameData}
      </Text>
    </>
  );

  const Set = () => (
    <View style={styles.setContainer}>
      <Text style={styles.textStyle}>Set</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Input Set"
        keyboardType="numeric"
      />
    </View>
  );

  const Weight = () => (
    <View style={styles.weightContainer}>
      <Text style={styles.textStyle}>lbs/kg</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Input weight"
        keyboardType="numeric"
      />
    </View>
  );

  const Count = () => (
    <View style={styles.countContainer}>
      <Text style={styles.textStyle}>Count</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Input count"
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      <Header />
      <View style={styles.contentContainer}>
        <View style={styles.setContainer}>
          <Set />
        </View>
        <View style={styles.weightContainer}>
          <Weight />
        </View>
        <View style={styles.countContainer}>
          <Count />
        </View>
      </View>
    </RNBounceable>
  );
};

export default CardItem;
