import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import Input from "./Input";
import Icon from "@shared-components/Icon";
import icLogo from "../../assets/images/logo.svg";
import SelectInput from "@shared-components/Select/SelectInput";
import SelectSheet from "@shared-components/Select/SelectSheet";
import useSelect from "../../shared/hooks/useSelect";

const RegisterUserScreen = () => {
  const [name, setName] = useState<string>("");
  const {
    state: age,
    ref: ageRef,
    onPress: onPressAge,
    toggle: toggleAge,
  } = useSelect<string>();
  const {
    state: gender,
    ref: genderRef,
    onPress: onPressGender,
    toggle: toggleGender,
  } = useSelect<string>();
  const {
    state: height,
    ref: heightRef,
    onPress: onPressHeight,
    toggle: toggleHeight,
  } = useSelect<string>();
  const {
    state: weight,
    ref: weightRef,
    onPress: onPressWeight,
    toggle: toggleWeight,
  } = useSelect<string>();

  return (
    <Container>
      <LogoContainer>
        <Icon source={icLogo} width={50} />
      </LogoContainer>
      <Input
        label={"이름"}
        placeholder={"이름을 입력해주세요"}
        state={name}
        setState={setName}
      />
      <SelectInput
        value={age}
        label={"나이"}
        placeholder={"나이를 선택해주세요"}
        onPress={() => {
          toggleAge();
        }}
      />
      <SelectInput
        value={gender}
        label={"성별"}
        placeholder={"성별을 선택해주세요"}
        onPress={() => {
          toggleGender();
        }}
      />
      <SelectInput
        value={height}
        label={"키"}
        placeholder={"키를 선택해주세요"}
        onPress={() => {
          toggleHeight();
        }}
      />
      <SelectInput
        value={weight}
        label={"몸무게"}
        placeholder={"몸무게를 선택해주세요"}
        onPress={() => {
          toggleWeight();
        }}
      />
      {/**/}
      <SelectSheet
        ref={ageRef}
        title={"나이를 선택해주세요"}
        data={Array.from({ length: 86 }, (_, i) => `${i + 15}`)}
        onPress={onPressAge}
      />
      <SelectSheet
        ref={genderRef}
        title={"성별을 선택해주세요"}
        data={["남자", "여자"]}
        onPress={onPressGender}
      />
      <SelectSheet
        ref={heightRef}
        title={"키를 선택해주세요(cm)"}
        data={Array.from({ length: 70 }, (_, i) => `${i + 140}`)}
        onPress={onPressHeight}
      />
      <SelectSheet
        ref={weightRef}
        title={"몸무게를 선택해주세요(Kg)"}
        data={Array.from({ length: 70 }, (_, i) => `${i + 40}`)}
        onPress={onPressWeight}
      />
    </Container>
  );
};

export default RegisterUserScreen;

const Container = styled(View)`
  flex: 1;
  padding: 50px 10px 0 10px;
  gap: 20px;
`;

const LogoContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;
