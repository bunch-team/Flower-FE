import BouquetLetterScreen from "@/screens/delivery/BouquetLetterScreen";
import { parseDeliveryFlower } from "@/screens/delivery/deliveryData";
import { useLocalSearchParams, useRouter } from "expo-router";

const BouquetRoute = () => {
  const router = useRouter();
  const { flower } = useLocalSearchParams<{ flower?: string }>();
  const selectedFlower = parseDeliveryFlower(flower);

  return (
    <BouquetLetterScreen
      flower={selectedFlower}
      onPressBack={() => router.back()}
      onPressHome={() => router.dismissTo("/home")}
    />
  );
};

export default BouquetRoute;
