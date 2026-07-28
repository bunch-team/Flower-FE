import { colors } from "@/constants/colors";
import { NicknameProvider } from "@/contexts/NicknameContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as NativeSplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

NativeSplashScreen.preventAutoHideAsync();
NativeSplashScreen.setOptions({ duration: 400, fade: true });

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    LeeSeoyun: require("../../assets/fonts/LeeSeoyun.ttf"),
    "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.otf"),
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.grayscale[200]);
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      NativeSplashScreen.hide();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

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
