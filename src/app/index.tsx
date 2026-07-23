import OnboardingScreen from "@/screens/onBoarding/OnboardingScreen";
import { useFonts } from "expo-font";

export default function Index() {
  const [fontsLoaded, fontError] = useFonts({
    MemomentKkukkukk: require("../../assets/fonts/MemomentKkukkukk.otf"),
    "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <OnboardingScreen />;
}
