import Icon from "@shared-components/Icon";
import icLogo from "../../assets/images/logo.svg";
import React from "react";
import styled from "styled-components";
import { View } from "react-native";

const Logo = () => {
  return (
    <LogoContainer>
      <Icon source={icLogo} size={50} />
    </LogoContainer>
  );
};

export default Logo;

export const LogoContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;
