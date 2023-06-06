import React, { memo, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ExerciseRecord, Set } from "../../../shared/exercise";
import styled from "styled-components";

import Icon from "@shared-components/Icon";
import icChecked from "@assets/images/checked.svg";

interface ExerciseRecordItemProps {
  record: ExerciseRecord;
  setRecord: (record: ExerciseRecord) => void;
}

const ExerciseRecordItem = ({ record, setRecord }: ExerciseRecordItemProps) => {
  const [sets, setSets] = useState<Set[]>([]);
  const volume = sets.reduce(
    (acc, cur) => acc + (cur.complete ? cur.weight * cur.reps : 0),
    0,
  );

  useEffect(() => {
    setRecord({ ...record, sets });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  const addSet = () => {
    setSets((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        weight: prev[prev.length - 1]?.weight || 0,
        reps: prev[prev.length - 1]?.reps || 0,
        complete: false,
      },
    ]);
  };

  return (
    <RecordContainer>
      <RecordHeader>
        <Name>{record.name}</Name>
        <Volume>
          volume {volume.toLocaleString()}
          kg
        </Volume>
      </RecordHeader>
      <SetsContainer>
        {sets.map((set) => {
          return <SetItem set={set} setSets={setSets} key={set.id} />;
        })}
        <AddRepButton onPress={addSet}>
          <AddRepText>Add Set</AddRepText>
        </AddRepButton>
      </SetsContainer>
    </RecordContainer>
  );
};

const SetItem = ({
  set,
  setSets,
}: {
  set: Set;
  setSets: React.Dispatch<React.SetStateAction<Set[]>>;
}) => {
  const [weight, setWeight] = useState(set.weight.toString());
  const [reps, setReps] = useState(set.reps.toString());

  const onPressCheck = () => {
    if (set.complete) {
      setSets((prev) =>
        prev.map((v) => {
          if (v.id === set.id) {
            return {
              ...v,
              complete: false,
            };
          } else {
            return v;
          }
        }),
      );
    } else {
      setSets((prev) =>
        prev.map((v) => {
          if (v.id === set.id) {
            return {
              ...v,
              weight: Number(weight),
              reps: Number(reps),
              complete: true,
            };
          } else {
            return v;
          }
        }),
      );
    }
  };

  return (
    <SetContainer>
      <Row>
        <Idx>{set.id}</Idx>
        <Row>
          <Input
            value={weight}
            onChangeText={setWeight}
            keyboardType={"numeric"}
          />
          <Unit>Kg</Unit>
        </Row>
        <Row>
          <Input value={reps} onChangeText={setReps} keyboardType={"numeric"} />
          <Unit>Reps</Unit>
        </Row>
      </Row>
      <CheckBox onPress={onPressCheck}>
        {set.complete ? (
          <Icon source={icChecked} color={"#ffffff"} size={12} />
        ) : (
          <View style={{ width: 12, height: 12 }} />
        )}
      </CheckBox>
    </SetContainer>
  );
};

const SetContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Idx = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 18px;
`;

const Input = styled(TextInput)`
  width: 50px;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: #252525;
  color: #ffffff;
  text-align: center;
  margin-right: 8px;
`;

const Unit = styled(Text)`
  color: #ffffff;
  margin-right: 18px;
`;

const CheckBox = styled(Pressable)`
  padding: 6px;
  border-radius: 6px;
  background-color: #252525;
`;

export default memo(ExerciseRecordItem);

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecordContainer = styled(View)`
  margin-bottom: 20px;
`;

const RecordHeader = styled(View)`
  background-color: #252525;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 12px;
`;

const Name = styled(Text)`
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 4px;
`;

const Volume = styled(Text)`
  color: #adadad;
`;

const SetsContainer = styled(View)`
  background-color: #333333;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 12px;
`;

const AddRepButton = styled(Pressable)`
  background-color: #252525;
  border-radius: 6px;
  padding: 8px;
`;

const AddRepText = styled(Text)`
  color: #ffffff;
  text-align: center;
`;
