import { colors } from "@/constants/colors";
import HomeScreen from "@/screens/home/HomeScreen";
import { useFonts } from "expo-font";
import * as NativeSplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

NativeSplashScreen.preventAutoHideAsync();
NativeSplashScreen.setOptions({ duration: 400, fade: true });
SystemUI.setBackgroundColorAsync(colors.grayscale[200]);

export default function Index() {
  const [fontsLoaded, fontError] = useFonts({
    LeeSeoyun: require("../../assets/fonts/LeeSeoyun.ttf"),
    "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      NativeSplashScreen.hide();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <HomeScreen />;
}
