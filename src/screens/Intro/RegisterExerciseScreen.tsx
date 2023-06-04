import React from "react";
import SelectInput from "@shared-components/Select/SelectInput";
import RoundButton from "@shared-components/Button/RoundButton";
import SelectSheet from "@shared-components/Select/SelectSheet";
import { Container } from "@screens/Intro/RegisterUserScreen";
import useSelect from "../../shared/hooks/useSelect";
import { SCREENS } from "@shared-constants";
import { useNavigation } from "@react-navigation/native";
import Logo from "@shared-components/Logo";

const RegisterExerciseScreen = () => {
  const navigation = useNavigation();

  const {
    state: period,
    ref: periodRef,
    onPress: onPressPeriod,
    toggle: togglePeriod,
  } = useSelect<string>();
  const {
    state: freq,
    ref: freqRef,
    onPress: onPressFreq,
    toggle: toggleFreq,
  } = useSelect<string>();

  const handleButtonPress = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate(SCREENS.HOME);
  };

  return (
    <Container>
      <Logo />
      <SelectInput
        value={period}
        label={"운동 기간"}
        placeholder={"운동기간을 선택해주세요"}
        onPress={() => {
          togglePeriod();
        }}
      />
      <SelectInput
        value={freq}
        label={"운동 빈도"}
        placeholder={"운동빈도를 선택해주세요"}
        onPress={() => {
          toggleFreq();
        }}
      />
      <RoundButton title={"확인"} onPress={handleButtonPress} />
      {/*  */}
      <SelectSheet
        ref={periodRef}
        title={"운동 기간을 선택해주세요"}
        data={[
          "운동 경험 없음",
          "1개월 이상",
          "3개월 이상",
          "6개월 이상",
          "1년 이상",
          "3년 이상",
        ]}
        onPress={onPressPeriod}
      />
      <SelectSheet
        ref={freqRef}
        title={"운동 빈도를 선택해주세요"}
        data={[
          "주 1회",
          "주 2회",
          "주 3회",
          "주 4회",
          "주 5회",
          "주 6회",
          "매일",
        ]}
        onPress={onPressFreq}
      />
    </Container>
  );
};

export default RegisterExerciseScreen;
