import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@shared-components/Logo";
import { getData, KEY } from "../../utils/storage";
import User from "../../shared/types/User";
import { FlatList, Pressable, Text, View } from "react-native";
import styled from "styled-components";
import Icon from "@shared-components/Icon";
import icAchievement from "../../assets/images/achievement.svg";
import RoundButton from "@shared-components/Button/RoundButton";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";

const HomeScreen = () => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const navigation = useNavigation();

  const [user, setUser] = useState<User>();
  const [day, setDay] = useState(daysOfWeek[new Date().getDay()]);
  const exerciseRecords = [];

  useLayoutEffect(() => {
    const initData = async () => {
      const storedUser = (await getData(KEY.USER)) as User;

      setUser(storedUser);
    };

    initData();
  }, []);

  const onPressDay = (item: string) => {
    setDay(item);
  };

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
        <AchievementButton>
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
        renderItem={(item) => {
          console.log(item);
          return <></>;
        }}
        ListEmptyComponent={ListEmptyComponent}
      />
      {exerciseRecords.length === 0 && day === daysOfWeek[new Date().getDay()] && (
        <RoundButton
          title={"운동 시작하기"}
          onPress={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigation.navigate(SCREENS.SELECT_EXERCISE);
          }}
        />
      )}
    </Container>
  );
};

export default HomeScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 10px;
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
