import { colors } from "@/constants/colors";
import OnboardingScreen from "@/screens/onBoarding/OnboardingScreen";
import LoginScreen from "@/screens/splash/Login";
import SplashScreen from "@/screens/splash/Splash";
import { useFonts } from "expo-font";
import * as NativeSplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useCallback, useEffect, useState } from "react";

NativeSplashScreen.preventAutoHideAsync();
NativeSplashScreen.setOptions({ duration: 400, fade: true });
SystemUI.setBackgroundColorAsync(colors.grayscale[200]);

type AppScreen = "splash" | "login" | "onboarding";

export default function Index() {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [fontsLoaded, fontError] = useFonts({
    LeeSeoyun: require("../../assets/fonts/LeeSeoyun.ttf"),
    "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.otf"),
  });
  const showLogin = useCallback(() => setScreen("login"), []);
  const showOnboarding = useCallback(() => setScreen("onboarding"), []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      NativeSplashScreen.hide();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (screen === "splash") {
    return <SplashScreen onFinish={showLogin} />;
  }

  if (screen === "login") {
    return (
      <LoginScreen
        onKakaoLogin={showOnboarding}
        onNaverLogin={showOnboarding}
      />
    );
  }

  return <OnboardingScreen />;
}
