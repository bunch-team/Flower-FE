import ReservationCompleteScreen from "@/screens/reservation/ReservationCompleteScreen";
import { useRouter } from "expo-router";

const ReservationCompleteRoute = () => {
  const router = useRouter();

  return (
    <ReservationCompleteScreen onPressHome={() => router.dismissTo("/")} />
  );
};

export default ReservationCompleteRoute;
