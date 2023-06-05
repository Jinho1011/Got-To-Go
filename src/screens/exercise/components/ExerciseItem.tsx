import React, { memo } from "react";
import styled from "styled-components";
import { Pressable, Text, View } from "react-native";
import Icon from "@shared-components/Icon";
import icChecked from "@assets/images/checked.svg";
import { Exercise } from "../../../shared/exercise";

interface ExerciseItemProps {
  exercise: Exercise;
  checked: boolean;
  onPressCheck: (exercise: Exercise) => void;
}

const ExerciseItem = ({
  exercise,
  checked,
  onPressCheck,
}: ExerciseItemProps) => {
  return (
    <Container>
      <View>
        <DescText>
          {exercise.muscle} · {exercise.difficulty} · {exercise.equipment}
        </DescText>
        <NameText>{exercise.name}</NameText>
      </View>
      <CheckBtn onPress={() => onPressCheck(exercise)}>
        <Icon source={icChecked} color={checked ? "#ffffff" : "#252525"} />
      </CheckBtn>
    </Container>
  );
};

export default memo(ExerciseItem);

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const DescText = styled(Text)`
  color: #adadad;
  margin-bottom: 4px;
`;

const NameText = styled(Text)`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

const CheckBtn = styled(Pressable)``;
