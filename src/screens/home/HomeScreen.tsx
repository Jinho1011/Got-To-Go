import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@shared-components/Logo";
import { getData, KEY } from "@utils";
import { Text } from "react-native";
import User from "../../shared/types/User";

const HomeScreen = () => {
  const [user, setUser] = useState<User>();

  useLayoutEffect(() => {
    const initData = async () => {
      const storedUser = (await getData(KEY.USER)) as User;

      setUser(storedUser);
    };

    initData();
  }, []);

  return (
    <SafeAreaView>
      <Logo />
      <Text>{user?.name}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
