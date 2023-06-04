import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = {
  USER: "@user",
} as const;

const storeData = async (key: typeof KEY[keyof typeof KEY], value: unknown) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

const getData = async (key: typeof KEY[keyof typeof KEY]) => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export { KEY, storeData, getData };
