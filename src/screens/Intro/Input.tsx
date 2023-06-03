import React from "react";
import { Text, TextInput as RNInput, View } from "react-native";
import styled from "styled-components";
import { palette } from "@theme/themes";

interface InputProps {
  label: string;
  placeholder: string;
  state: string;
  setState: any;
}

const Input = ({ label, placeholder, state, setState }: InputProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <TextInput
        placeholder={placeholder}
        value={state}
        onChangeText={(t) => setState(t)}
      />
    </Container>
  );
};

export default Input;

const Container = styled(View)``;

const Label = styled(Text)`
  color: ${palette.white};
  margin-bottom: 8px;
`;

const TextInput = styled(RNInput)`
  background: #252525;
  border: 0.5px solid #484848;
  border-radius: 10px;
  padding: 12px 10px;
  color: ${palette.white};
`;
