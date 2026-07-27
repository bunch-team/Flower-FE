import OnboardingScreen from "@/screens/onBoarding/OnboardingScreen";
import { useRouter } from "expo-router";

const OnboardingRoute = () => {
  const router = useRouter();

  return (
    <OnboardingScreen onComplete={() => router.replace("/login")} />
  );
};

export default OnboardingRoute;
