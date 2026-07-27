import DeliveryScreen, {
  DeliveryFlowerType,
} from "@/screens/delivery/DeliveryScreen";
import { useLocalSearchParams, useRouter } from "expo-router";

const DELIVERY_FLOWERS = new Set<DeliveryFlowerType>([
  "tulip",
  "sunflower",
  "lavendar",
  "lily",
]);

const DeliveryRoute = () => {
  const router = useRouter();
  const { flower } = useLocalSearchParams<{ flower?: string }>();
  const selectedFlower =
    flower && DELIVERY_FLOWERS.has(flower as DeliveryFlowerType)
      ? (flower as DeliveryFlowerType)
      : "tulip";

  return (
    <DeliveryScreen
      flower={selectedFlower}
      onPressClose={() => router.dismissTo("/")}
    />
  );
};

export default DeliveryRoute;
