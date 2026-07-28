import SplashScreen from "@/screens/splash/Splash";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function Index() {
  const router = useRouter();
  const handleFinish = useCallback(() => {
    router.replace("/onboarding");
  }, [router]);

  return <SplashScreen onFinish={handleFinish} />;
}
