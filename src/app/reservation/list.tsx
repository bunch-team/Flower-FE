import ReservationListScreen, {
  type ReservationItem,
} from "@/screens/reservationList/ReservationListScreen";
import { useRouter } from "expo-router";

const RESERVATIONS: ReservationItem[] = [
  {
    id: "2026-08-10-tulip",
    bouquetName: "핑크 튤립 꽃다발",
    deliveryStatus: "배송중",
    deliveryDate: "2026.08.10",
    arrivalTime: "오후 2:00",
    letterMessage: "오늘도 좋은 일이 있을 거예요!",
    imageSource: require("@/assets/images/flowers/tulip.png"),
  },
];

const ReservationListRoute = () => {
  const router = useRouter();

  return (
    <ReservationListScreen
      reservations={RESERVATIONS}
      onPressBack={() => router.back()}
      onPressEdit={() => router.push("/reservation/flower-select")}
      onPressMenu={() => router.push("/mypage")}
    />
  );
};

export default ReservationListRoute;
