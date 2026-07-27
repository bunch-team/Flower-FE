import ReservationDateScreen from "@/screens/reservation/ReservationDateScreen";
import { useLocalSearchParams, useRouter } from "expo-router";

const FLOWER_NAMES: Record<string, string> = {
  tulip: "튤립",
  sunflower: "해바라기",
  lavendar: "라벤더",
  lily: "안개꽃",
};

const ReservationDateRoute = () => {
  const router = useRouter();
  const { flower, message } = useLocalSearchParams<{
    flower?: string;
    message?: string;
  }>();

  return (
    <ReservationDateScreen
      flowerName={FLOWER_NAMES[flower ?? ""] ?? "꽃다발"}
      letterMessage={message ?? ""}
      onPressBack={() => router.back()}
      onPressExit={() => router.dismissTo("/")}
      onPressReserve={() => router.dismissTo("/")}
    />
  );
};

export default ReservationDateRoute;
