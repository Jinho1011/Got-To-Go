import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text } from "react-native";
import { SCREENS } from "@shared-constants";
import Logo from "@shared-components/Logo";
import RoundButton from "@shared-components/Button/RoundButton";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const categories = [
  "all",
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

const SelectExerciseScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0],
  );
  // const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const onPressCategoryButton = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Logo />
      <CategoryContainer horizontal>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            onPress={() => onPressCategoryButton(category)}
          >
            <CategoryText selected={selectedCategory === category}>
              {category}
            </CategoryText>
          </CategoryButton>
        ))}
      </CategoryContainer>
      <RoundButton
        title={"운동 시작하기"}
        onPress={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          navigation.navigate(SCREENS.SELECT_EXERCISE);
        }}
      />
    </Container>
  );
};

export default SelectExerciseScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 10px;
  gap: 20px;
`;

const CategoryContainer = styled(ScrollView)``;

const CategoryButton = styled(Pressable)`
  justify-content: center;
  align-items: center;
  background-color: #252525;
  padding: 0 10px;
  height: 32px;
  margin-right: 10px;
  border-radius: 6px;
`;

const CategoryText = styled(Text)<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? "#ffffff" : "#bdbdbd")};
`;
