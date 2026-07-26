import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    />
  );
};

export default RootLayout;
