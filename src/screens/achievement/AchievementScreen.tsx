import React from "react";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@shared-components/Logo";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Weekly from "@assets/images/weekly.png";
import Start from "@assets/images/start.png";
import C3day from "@assets/images/3day.png";

const achievements = [
  {
    name: "첫 운동 시작하기",
    condition: "처음으로 운동 기록을 생성하면 얻을 수 있습니다.",
    img: Start,
  },

  {
    name: "3일 연속 운동 기록 달성",
    condition: "3일 동안 운동 기록이 존재하면 얻을 수 있습니다.",
    img: C3day,
  },
  {
    name: "주간 목표 달성하기",
    condition: "주간 목표를 달성하면 얻을 수 있습니다.",
    img: Weekly,
  },
];

const AchievementScreen = () => {
  const renderItem = ({ item, idx }: { item: any; idx: number }) => {
    return (
      <BadgeContainer isOdd={idx % 2 !== 0}>
        <Badge source={item.img} />
        <Name>{item.name}</Name>
        <Desc>{item.condition}</Desc>
      </BadgeContainer>
    );
  };

  return (
    <Container>
      <Logo />
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <FlatList
          data={achievements}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      </ScrollView>
    </Container>
  );
};

export default AchievementScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 20px;
  gap: 20px;
`;

const BadgeContainer = styled(View)<{ isOdd: boolean }>`
  width: 45%;
  padding-right: 6px;
  margin-bottom: 10px;
  margin-right: 16px;
`;

const Name = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Desc = styled(Text)`
  color: #adadad;
`;

const Badge = styled(Image)`
  //width: 100%;
`;
