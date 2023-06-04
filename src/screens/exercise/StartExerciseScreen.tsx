import React, { useMemo, useState } from "react";
import { FlatList, Image, SafeAreaView, View } from "react-native";
import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./StartExerciseScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { SCREENS } from "@shared-constants";
import CardItem from "./components/CardItem_RecordScreen";
import * as NavigationService from "react-navigation-helpers";
import CardItem_RecordScreen from "./components/CardItem_RecordScreen";
import { ImageComponent } from "react-native";
import { IPlanData } from "@screens/exercise/ExerciseData.interface";

const logo = require("srcassetsPendulum_Logo.png");
const defaultCheckIcon = require("srcscreens\recordcomponentslocal-assetscheck-icon-white.png");
const isCheckedIcon = require("srcscreens\recordcomponentslocal-assetscheck-icon-gold.png");

interface StartExerciseScreenProps {}

type StartExerciseScreenRouteProp = RouteProp<{ START_EXERCISE: { data: string[] } }>;

const StartExerciseScreen: React.FC<StartExerciseScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const route = useRoute<StartExerciseScreenRouteProp>();
  const { data } = route.params;

  /* 완료해서 check한 item들 비율 계산
  const CheckedPercentage = ({ data, checkedItems }) => {
    const percentage = (checkedItems.length / data.length) * 100; // 체크된 아이템의 비율을 계산합니다.
  
    return (
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>{percentage.toFixed(2)}%</Text>
      </View>
    );
  };
  */

  /*----------------------------------------------------------------------------
  
                                  Data, Item, List

  ----------------------------------------------------------------------------*/

  const RecordList = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckedOnPress = () => {
      setIsChecked(!isChecked); // 현재 상태값의 반대값으로 변경합니다.
    };

    return (
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <CardItem_RecordScreen
                nameData={item}
                onPress={() => console.log("Render CardItem")}
              />
              <RNBounceable
                bounceEffectIn={0.97}
                bouncinessIn={3}
                onPress={handleCheckedOnPress}
              >
                <ImageComponent
                  resizeMode="contain"
                  source={isChecked ? isCheckedIcon : defaultCheckIcon}
                  style={{ width: 30, height: 30 }}
                />
              </RNBounceable>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    );
  };

  /*----------------------------------------------------------------------------
  
                                      Button

  ----------------------------------------------------------------------------*/

  /* 뒤로가기 버튼
  
  const handleBackBtnPress = () => {
        NavigationService.push(SCREENS.SELECT);
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

  // 오운완 버튼
  const handleCompleteBtnPress = () => {
    NavigationService.push(SCREENS.HOME, {});
  };

  const CompleteBtn = () => {
    return (
      <RNBounceable style={styles.buttonStyle} onPress={handleCompleteBtnPress}>
        <Text style={styles.buttonTextStyle}>"Complete"</Text>
      </RNBounceable>
    );
  };

  // 큰 틀로 정리

  const Header = () => (
    <View style={styles.header}>
      <Image
        resizeMode="contain"
        source={logo}
        style={{ width: 15, height: 15 }}
      />
    </View>
  );

  const Content = () => (
    <View style={styles.contentContainer}>
      <RecordList />
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      <CompleteBtn />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Content />
      <Footer />
    </SafeAreaView>
  );
};

export default StartExerciseScreen;
