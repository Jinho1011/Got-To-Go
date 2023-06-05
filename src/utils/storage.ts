import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = {
  USER: "@user",
  EXERCISE: (date: Date) => `@exercise-${date.toDateString()}`,
} as const;

const storeData = async (key: string, value: unknown) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

const getData = async (key: string) => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export { KEY, storeData, getData };
