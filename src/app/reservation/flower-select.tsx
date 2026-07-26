import FlowerSelectScreen from "@/screens/reservation/FlowerSelectScreen";
import { useRouter } from "expo-router";

const FlowerSelectRoute = () => {
  const router = useRouter();

  return <FlowerSelectScreen onPressExit={() => router.back()} />;
};

export default FlowerSelectRoute;
