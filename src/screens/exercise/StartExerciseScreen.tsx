import React, { useLayoutEffect, useState } from "react";
import Logo from "@shared-components/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { ExerciseRecord } from "../../shared/exercise";
import { getData, KEY } from "../../utils/storage";

const StartExerciseScreen = () => {
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>([]);

  console.log(exerciseRecords);

  useLayoutEffect(() => {
    getData(KEY.EXERCISE(new Date())).then((v) => setExerciseRecords(v));
  }, []);

  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default StartExerciseScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 10px;
  gap: 20px;
`;
