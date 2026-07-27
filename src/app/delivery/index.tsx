import DeliveryArrivalScreen from "@/screens/delivery/DeliveryArrivalScreen";
import { parseDeliveryFlower } from "@/screens/delivery/deliveryData";
import { useLocalSearchParams, useRouter } from "expo-router";

const DeliveryRoute = () => {
  const router = useRouter();
  const { flower } = useLocalSearchParams<{ flower?: string }>();
  const selectedFlower = parseDeliveryFlower(flower);

  return (
    <DeliveryArrivalScreen
      flower={selectedFlower}
      onPressClose={() => router.dismissTo("/")}
      onPressReceive={() =>
        router.push({
          pathname: "/delivery/bouquet",
          params: { flower: selectedFlower },
        })
      }
    />
  );
};

export default DeliveryRoute;
