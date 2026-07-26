import { NicknameProvider } from "@/contexts/NicknameContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <NicknameProvider>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
    </NicknameProvider>
  );
};

export default RootLayout;
