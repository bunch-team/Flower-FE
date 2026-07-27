export type DeliveryFlowerType =
  | "tulip"
  | "sunflower"
  | "lavendar"
  | "lily";

export const DELIVERY_FLOWERS = new Set<DeliveryFlowerType>([
  "tulip",
  "sunflower",
  "lavendar",
  "lily",
]);

export const FLOWER_DELIVERIES = {
  tulip: {
    name: "핑크 튤립",
    deliverImage: require("@/assets/images/deliver/tulipDeliver.png"),
    bunchImage: require("@/assets/images/deliver/tulipBunch.png"),
    greeting: "설레는 마음을 담아\n튤립 꽃다발을 가져왔어요!",
    flowerLanguage: "사랑의 고백, 따뜻한 배려",
    accent: "#D98C91",
  },
  sunflower: {
    name: "해바라기",
    deliverImage: require("@/assets/images/deliver/sunflowerDeliver.png"),
    bunchImage: require("@/assets/images/deliver/sunflowerBunch.png"),
    greeting: "햇살 같은 응원을 담아\n해바라기를 가져왔어요!",
    flowerLanguage: "기다림, 한결같은 마음",
    accent: "#D29A28",
  },
  lavendar: {
    name: "라벤더",
    deliverImage: require("@/assets/images/deliver/lavendarDeliver.png"),
    bunchImage: require("@/assets/images/deliver/lavendarBunch.png"),
    greeting: "편안한 하루가 되길 바라며\n라벤더를 가져왔어요!",
    flowerLanguage: "평온, 나에게 대답하세요",
    accent: "#87709F",
  },
  lily: {
    name: "안개꽃",
    deliverImage: require("@/assets/images/deliver/lilyDeliver.png"),
    bunchImage: require("@/assets/images/deliver/lilyBunch.png"),
    greeting: "포근한 마음을 가득 담아\n안개꽃을 가져왔어요!",
    flowerLanguage: "맑은 마음, 영원한 사랑",
    accent: "#9A9B78",
  },
} as const;

export const parseDeliveryFlower = (
  flower?: string,
): DeliveryFlowerType => {
  if (flower && DELIVERY_FLOWERS.has(flower as DeliveryFlowerType)) {
    return flower as DeliveryFlowerType;
  }

  return "tulip";
};
