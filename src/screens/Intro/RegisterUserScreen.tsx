import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import Input from "./Input";
import SelectInput from "@shared-components/Select/SelectInput";
import SelectSheet from "@shared-components/Select/SelectSheet";
import useSelect from "../../shared/hooks/useSelect";
import RoundButton from "@shared-components/Button/RoundButton";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";
import { KEY, storeData } from "../../utils/storage";
import Logo from "@shared-components/Logo";

const RegisterUserScreen = () => {
  const navigation = useNavigation();
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

  const handleButtonPress = async () => {
    if (name && age && gender && height && weight) {
      await storeData(KEY.USER, { name, age, gender, height, weight });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.navigate(SCREENS.REGISTER_EXERCISE);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate(SCREENS.REGISTER_EXERCISE);
  };

  return (
    <Container>
      <Logo />
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
      <RoundButton title={"확인"} onPress={handleButtonPress} />
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

export const Container = styled(View)`
  flex: 1;
  padding: 50px 20px 0 20px;
  gap: 20px;
`;
