import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme } from "@theme/themes";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import RegisterUserScreen from "@screens/Intro/RegisterUserScreen";
import RegisterExerciseScreen from "@screens/Intro/RegisterExerciseScreen";
import AchievementScreen from "@screens/achievement/AchievementScreen";
import SelectExerciseScreen from "@screens/exercise/SelectExerciseScreen";
import StartExerciseScreen from "@screens/exercise/StartExerciseScreen";

// ? If you want to use stack or tab or both
const Stack = createStackNavigator();

const Navigation = () => {
  const isDarkMode = true;

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREENS.REGISTER_USER}
          component={RegisterUserScreen}
        />
        <Stack.Screen
          name={SCREENS.REGISTER_EXERCISE}
          component={RegisterExerciseScreen}
        />
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Stack.Screen name={SCREENS.ACHIEVMENT} component={AchievementScreen} />
        <Stack.Screen
          name={SCREENS.SELECT_EXERCISE}
          component={SelectExerciseScreen}
        />
        <Stack.Screen
          name={SCREENS.START_EXERCISE}
          component={StartExerciseScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
