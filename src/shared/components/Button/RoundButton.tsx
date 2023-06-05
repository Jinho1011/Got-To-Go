import React from "react";
import { Pressable, Text } from "react-native";
import styled from "styled-components";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const RoundButton = ({ title, onPress }: ButtonProps) => {
  return (
    <Button onPress={onPress}>
      <Text>{title}</Text>
    </Button>
  );
};

export default RoundButton;

const Button = styled(Pressable)`
  position: absolute;
  bottom: 40px;
  left: 20px;
  width: 100%;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 14px;
`;
