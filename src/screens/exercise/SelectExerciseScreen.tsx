import { useTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CheckboxCardItem from "./components/CheckboxCardItem";
import { SCREENS } from "@shared-constants";
import createStyles from "./SelectExerciseScreen.style";
import { IExerciseData } from "./ExerciseData.interface";
import Logo from "@shared-components/Logo";
import RoundButton from "@shared-components/Button/RoundButton";

const categories = [
  "All",
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

interface SelectExerciseScreenProps {}

const SelectExerciseScreen: React.FC<SelectExerciseScreenProps> = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [exercises, setExercises] = useState<IExerciseData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // const [checkedExerciseData, setCheckedExerciseData] = useState<string[]>([]);

  // Get API Data
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(
        "https://api.api-ninjas.com/v1/exercises?muscle=",
      );
      const { data } = response;
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  // Categories

  const filterExercisesByCategory = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const Categories = () => (
    <ScrollView horizontal>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => filterExercisesByCategory(category)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor:
              selectedCategory === category ? "gray" : "lightgray",
            marginRight: 10,
            borderRadius: 10,
          }}
        >
          <Text>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // List

  const ExerciseList = () => {
    let filteredExercises = exercises;
    if (selectedCategory) {
      filteredExercises = exercises.filter(
        (exercises) => exercises.muscle === selectedCategory,
      );
    }

    return (
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <CheckboxCardItem
            exerciseData={item}
            onPress={(checked: boolean) => {
              console.log("Checked: ", checked);
              if (checked) {
                setCheckedExerciseData((prevItems) => [
                  ...prevItems,
                  item.name,
                ]);
              } else {
                setCheckedExerciseData((prevItems) =>
                  prevItems.filter((prevItem) => prevItem !== item.name),
                );
              }
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    );
  };

  /*----------------------------------------------------------------------------
    
                                        Button

    ----------------------------------------------------------------------------*/

  // const handleRecordBtnPress = () => {
  //   NavigationService.navigate(SCREENS.START_EXERCISE, { checkedExerciseData });
  // };

  /* 뒤로가기 버튼

    const handleBackBtnPress = () => {
        NavigationService.push(SCREENS.HOME);
    };

    const BackBtn = () => {
        return (
            <RNBounceable style={} onPress={handleBackBtnPress}>
                <Text>
                    <Icon
                        name="chevron-back"
                        type={IconType.Ionicons}
                        color="white"
                        size={30}  
                    />
                </Text>
            </RNBounceable>
        )
    }

    */

  // 큰 틀로 정리

  const Content = () => (
    <View style={styles.contentContainer}>
      <Categories />
      <ExerciseList />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Content />
      <RoundButton
        title={"운동 시작하기"}
        onPress={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          navigation.navigate(SCREENS.SELECT_EXERCISE);
        }}
      />
    </SafeAreaView>
  );
};

export default SelectExerciseScreen;
