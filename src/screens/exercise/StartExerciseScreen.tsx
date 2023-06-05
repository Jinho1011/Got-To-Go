import React, { useLayoutEffect, useState } from "react";
import Logo from "@shared-components/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { ExerciseRecord } from "../../shared/exercise";
import { getData, KEY } from "../../utils/storage";
import { FlatList, Text, View } from "react-native";
import Timer from "@screens/exercise/components/TImer";
import ExerciseRecordItem from "@screens/exercise/components/ExerciseRecordItem";

const StartExerciseScreen = () => {
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>([]);
  const totalVolume = exerciseRecords.reduce(
    (setAcc, curSet) =>
      setAcc +
      curSet.sets.reduce(
        (repAcc, curRep) =>
          repAcc + (curRep.complete ? curRep.weight * curRep.reps : 0),
        0,
      ),
    0,
  );

  console.log(exerciseRecords);

  useLayoutEffect(() => {
    getData(KEY.EXERCISE(new Date())).then((v) => setExerciseRecords(v));
  }, []);

  const setRecord = (record: ExerciseRecord) => {
    setExerciseRecords((prev) =>
      prev.map((v) => {
        if (v.name === record.name) {
          return record;
        } else {
          return v;
        }
      }),
    );
  };

  const renderItem = ({ item }: { item: ExerciseRecord }) => {
    return <ExerciseRecordItem record={item} setRecord={setRecord} />;
  };

  return (
    <Container>
      <Logo />
      <HeaderContainer>
        <Timer />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#adadad", marginRight: 6 }}>total volume</Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {totalVolume}kg
          </Text>
        </View>
      </HeaderContainer>
      <FlatList
        data={exerciseRecords}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default StartExerciseScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 20px;
  gap: 20px;
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
