import React from "react";
import { Text, View } from "react-native";
import Icon from "@shared-components/Icon";
import icLogo from "../../assets/images/logo.svg";
import styled from "styled-components";

const RegisterUserScreen = () => {
  return (
    <Container>
      <LogoContainer>
        <Icon source={icLogo} width={50} />
      </LogoContainer>
      <Text style={{ color: "white" }}>RegisterUserScreen</Text>
    </Container>
  );
};

export default RegisterUserScreen;

const Container = styled(View)`
  padding: 40px 20px;
`;

const LogoContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;
