import React, { useCallback, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@shared-components/Logo";
import RoundButton from "@shared-components/Button/RoundButton";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import exercises, { Exercise } from "../../shared/exercise";
import ExerciseItem from "@screens/exercise/components/ExerciseItem";
import { KEY, storeData } from "../../utils/storage";
import { SCREENS } from "@shared-constants";

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
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const onPressCategoryButton = (category: string) => {
    setSelectedCategory(category);
  };

  const saveExercise = async () => {
    await storeData(
      KEY.EXERCISE(new Date()),
      selectedExercises.map((v) => {
        return { ...v, sets: [] };
      }),
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: Exercise }) => (
      <ExerciseItem
        exercise={item}
        onPressCheck={(exercise) => {
          if (
            selectedExercises.find((v) => v.name == exercise.name) !== undefined
          ) {
            setSelectedExercises((prev) =>
              prev.filter((v) => v.name !== exercise.name),
            );
          } else {
            setSelectedExercises((prev) => [...prev, exercise]);
          }
        }}
        checked={selectedExercises.findIndex((v) => v.name == item.name) !== -1}
      />
    ),
    [selectedExercises],
  );

  return (
    <Container>
      <Logo />
      <CategoryContainer>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
        </ScrollView>
      </CategoryContainer>
      <FlatList
        data={exercises.filter((v) =>
          selectedCategory === categories[0]
            ? true
            : v.muscle === selectedCategory,
        )}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "#242424", height: 1 }} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <RoundButton
        title={
          selectedExercises.length === 0
            ? "운동을 선택해주세요"
            : `${selectedExercises.length}개의 운동 시작하기`
        }
        onPress={async () => {
          await saveExercise();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          navigation.navigate(SCREENS.START_EXERCISE);
        }}
      />
    </Container>
  );
};

export default SelectExerciseScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 20px;
  gap: 20px;
`;

const CategoryContainer = styled(View)`
  height: 32px;
`;

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
  font-weight: ${({ selected }) => (selected ? "bold" : "500")};
`;
