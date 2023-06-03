import { palette } from "@theme/themes";
import React from "react";
import { Pressable, Text, View, TextInput as RNInput } from "react-native";
import styled from "styled-components";
import icArrowDown from "@assets/images/arrow-down.svg";
import Icon from "@shared-components/Icon";

interface SelectInputProps {
  label: string;
  value: any;
  placeholder: string;
  onPress: () => void;
}

const SelectInput = ({
  label,
  value,
  placeholder,
  onPress,
}: SelectInputProps) => {
  const handleOnPressIn = () => {
    onPress();
  };

  return (
    <View>
      <Label>{label}</Label>
      <Pressable onPress={onPress}>
        <InputContainer>
          <TextInput
            // defaultValue={`${value}`}
            value={`${value || ""}`}
            placeholder={placeholder}
            onPressIn={handleOnPressIn}
            editable={false}
            selectTextOnFocus={false}
          />
          <InputIcon source={icArrowDown} />
        </InputContainer>
      </Pressable>
    </View>
  );
};

export default SelectInput;

const Label = styled(Text)`
  color: ${palette.white};
  margin-bottom: 10px;
`;

const InputContainer = styled(View)``;

const TextInput = styled(RNInput)`
  background: #252525;
  border: 0.5px solid #484848;
  border-radius: 10px;
  padding: 12px 10px;
  color: ${palette.white};
`;

const InputIcon = styled(Icon)`
  position: absolute;
  right: 10px;
  bottom: 8px;
`;
