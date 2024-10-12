import { Stack } from "expo-router";

const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MenuStack;
