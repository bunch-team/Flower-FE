import FlowerSelectScreen from "@/screens/reservation/FlowerSelectScreen";
import { useRouter } from "expo-router";

const FlowerSelectRoute = () => {
  const router = useRouter();

  return (
    <FlowerSelectScreen
      onPressNext={() => router.push("/reservation/message-write")}
      onPressExit={() => router.back()}
    />
  );
};

export default FlowerSelectRoute;
