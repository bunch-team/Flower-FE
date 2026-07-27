import FlowerSelectScreen from "@/screens/reservation/FlowerSelectScreen";
import { useRouter } from "expo-router";

const FlowerSelectRoute = () => {
  const router = useRouter();

  return (
    <FlowerSelectScreen
      onPressNext={(flower) =>
        router.push({
          pathname: "/reservation/message-write",
          params: { flower },
        })
      }
      onPressExit={() => router.back()}
    />
  );
};

export default FlowerSelectRoute;
