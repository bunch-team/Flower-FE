import { colors } from "@/constants/colors";
import OnboardingScreen from "@/screens/onBoarding/OnboardingScreen";
import { useFonts } from "expo-font";
import * as SystemUI from "expo-system-ui";

SystemUI.setBackgroundColorAsync(colors.grayscale[200]);

export default function Index() {
  const [fontsLoaded, fontError] = useFonts({
    LeeSeoyun: require("../../assets/fonts/LeeSeoyun.ttf"),
    "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <OnboardingScreen />;
}
