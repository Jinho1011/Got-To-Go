import React from "react";
import { Text, View } from "react-native";
import Icon from "@shared-components/Icon";
import icLogo from "../../assets/images/logo.svg";

const RegisterUserScreen = () => {
  return (
    <View>
      <Icon source={icLogo} width={40} />
      <Text>RegisterUserScreen</Text>
    </View>
  );
};

export default RegisterUserScreen;
