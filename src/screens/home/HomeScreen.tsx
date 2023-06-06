import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@shared-components/Logo";
import { getData, KEY } from "../../utils/storage";
import User from "../../shared/types/User";
import { FlatList, Pressable, Text, View } from "react-native";
import styled from "styled-components";
import Icon from "@shared-components/Icon";
import icAchievement from "../../assets/images/achievement.svg";
import RoundButton from "@shared-components/Button/RoundButton";
import { SCREENS } from "@shared-constants";
import { ExerciseRecord } from "../../shared/exercise";
import icComplete from "@assets/images/complete.svg";
import icIncomplete from "@assets/images/incomplete.svg";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const [user, setUser] = useState<User>();
  const [day, setDay] = useState(daysOfWeek[new Date().getDay()]);
  const [exerciseRecords, setExerciseRecords] = useState<
    ExerciseRecord[] | undefined
  >([]);

  useFocusEffect(
    useCallback(() => {
      const initData = async () => {
        const storedUser = (await getData(KEY.USER)) as User;
        const storedExercises = (await getData(
          KEY.EXERCISE(new Date()),
        )) as ExerciseRecord[];

        setExerciseRecords(storedExercises);
        setUser(storedUser);
      };

      initData();
    }, []),
  );

  useEffect(() => {
    const dayIdx = daysOfWeek.findIndex((v) => v === day);
    const todayIdx = new Date().getDay();
    const dayDiff = dayIdx - todayIdx;

    const thatDay = new Date();
    thatDay.setDate(new Date().getDate() + dayDiff);

    getData(KEY.EXERCISE(dayDiff === 0 ? new Date() : thatDay)).then((v) =>
      setExerciseRecords(v),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const onPressDay = (item: string) => {
    setDay(item);
  };

  const renderItem = useCallback(({ item }: { item: ExerciseRecord }) => {
    return (
      <RecordContainer>
        <View>
          <Desc>
            {item.muscle} · {item.sets.length} sets ·{" "}
            {item.sets.reduce((acc, cur) => acc + cur.weight * cur.reps, 0)} kg
          </Desc>
          <Name>{item.name}</Name>
        </View>
        <Icon
          source={
            item.sets.findIndex((v) => !v.complete) > 0
              ? icIncomplete
              : icComplete
          }
        />
      </RecordContainer>
    );
  }, []);

  const ListEmptyComponent = (
    <EmptyText>
      {day === daysOfWeek[new Date().getDay()]
        ? "운동을 시작해볼까요?"
        : "운동 기록이 존재하지 않아요"}
    </EmptyText>
  );

  return (
    <Container>
      <Logo />
      <HeaderContainer>
        <View>
          <SubTitle>welcome back,</SubTitle>
          <Title>{user?.name}</Title>
        </View>
        <AchievementButton
          onPress={() => navigation.navigate(SCREENS.ACHIEVMENT)}
        >
          <Icon source={icAchievement} />
        </AchievementButton>
      </HeaderContainer>
      <WeekContainer>
        {daysOfWeek.map((v) => {
          return (
            <Week key={v} selected={v === day} onPress={() => onPressDay(v)}>
              <WeekText>{v}</WeekText>
            </Week>
          );
        })}
      </WeekContainer>
      <DatePreview>{new Date().toLocaleDateString()}</DatePreview>
      <FlatList
        data={exerciseRecords}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
      {exerciseRecords?.length === 0 &&
        day === daysOfWeek[new Date().getDay()] && (
          <RoundButton
            title={"운동 시작하기"}
            onPress={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              navigation.navigate(SCREENS.SELECT_EXERCISE);
            }}
          />
        )}
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

export default HomeScreen;

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

const Title = styled(Text)`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

const SubTitle = styled(Text)`
  color: #bdbdbd;
  margin-bottom: 4px;
`;

const AchievementButton = styled(Pressable)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 4px;
  border-radius: 6px;
  background-color: #252525;
`;

const WeekContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #252525;
  padding: 12px;
  border-radius: 10px;
`;

const Week = styled(Pressable)<{ selected: boolean }>`
  padding: 8px;
  ${({ selected }) =>
    selected &&
    `
    border-radius:6px;
    background-color: #ADADAD;
    `}
`;

const WeekText = styled(Text)`
  color: #4b4b4b;
  font-weight: bold;
`;

const DatePreview = styled(Text)`
  color: #4b4b4b;
  text-align: center;
`;

const EmptyText = styled(Text)`
  padding: 40px 0;
  color: #bdbdbd;
  text-align: center;
  font-size: 16px;
`;

const RecordContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const Name = styled(Text)`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

const Desc = styled(Text)`
  color: #adadad;
  margin-bottom: 4px;
`;
