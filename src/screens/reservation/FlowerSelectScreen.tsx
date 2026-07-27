import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/common/Button";
import StepIndicator from "@/components/common/StepIndicator";
import ReservationExitModal from "@/components/reservation/ReservationExitModal";

type FlowerType = "tulip" | "sunflower" | "lavendar" | "lily";

interface FlowerItem {
  id: FlowerType;
  name: string;
  image: ImageSourcePropType;
}

interface FlowerSelectScreenProps {
  onPressNext?: (flower: FlowerType) => void;
  onPressExit?: () => void;
}

const FLOWERS: FlowerItem[] = [
  {
    id: "tulip",
    name: "튤립",
    image: require("@/assets/images/flowers/tulip.png"),
  },
  {
    id: "sunflower",
    name: "해바라기",
    image: require("@/assets/images/flowers/sunflower.png"),
  },
  {
    id: "lavendar",
    name: "라벤더",
    image: require("@/assets/images/flowers/lavendar.png"),
  },
  {
    id: "lily",
    name: "안개꽃",
    image: require("@/assets/images/flowers/lily.png"),
  },
];

const FlowerSelectScreen = ({
  onPressNext,
  onPressExit,
}: FlowerSelectScreenProps) => {
  const [selectedFlower, setSelectedFlower] = useState<FlowerType | null>(null);

  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const handleNext = () => {
    if (!selectedFlower) return;

    onPressNext?.(selectedFlower);
  };

  const handleExit = () => {
    setIsExitModalVisible(false);
    onPressExit?.();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <StepIndicator currentStep={1} />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsExitModalVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={30} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            나에게 주고 싶은{"\n"}꽃 종류를 선택해주세요!
          </Text>
        </View>

        <View style={styles.flowerGrid}>
          {FLOWERS.map((flower) => {
            const isSelected = selectedFlower === flower.id;

            return (
              <TouchableOpacity
                key={flower.id}
                style={styles.flowerItem}
                activeOpacity={0.8}
                onPress={() => setSelectedFlower(flower.id)}
              >
                <View
                  style={[
                    styles.imageContainer,
                    isSelected && styles.selectedImageContainer,
                  ]}
                >
                  <Image
                    source={flower.image}
                    style={styles.flowerImage}
                    resizeMode="cover"
                  />

                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Ionicons
                        name="checkmark"
                        size={17}
                        color={colors.primary[100]}
                      />
                    </View>
                  )}
                </View>

                <Text
                  style={[
                    styles.flowerName,
                    isSelected && styles.selectedFlowerName,
                  ]}
                >
                  {flower.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedFlower && (
          <View style={styles.bottomContainer}>
            <Button
              title="다음"
              onPress={handleNext}
              width="52%"
              backgroundColor={colors.primary[500]}
              textColor={colors.grayscale[100]}
              fontFamily="Pretendard-Medium"
            />
          </View>
        )}
      </View>

      <ReservationExitModal
        visible={isExitModalVisible}
        onClose={() => setIsExitModalVisible(false)}
        onExit={handleExit}
      />
    </SafeAreaView>
  );
};

export default FlowerSelectScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
  },

  container: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
    paddingHorizontal: 28,
  },

  header: {
    height: 92,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    marginTop: 12,
    marginBottom: 42,
    alignItems: "center",
  },

  title: {
    color: colors.primary[700],
    fontSize: 24,
    fontFamily: "LeeSeoyun",
    lineHeight: 32,
    textAlign: "center",
  },

  flowerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 36,
  },

  flowerItem: {
    width: "46%",
    alignItems: "center",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
    backgroundColor: colors.grayscale[100],
  },

  selectedImageContainer: {
    borderColor: colors.primary[300],
    backgroundColor: colors.primary[100],
  },

  flowerImage: {
    width: "100%",
    height: "100%",
  },

  checkBadge: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[500],
  },

  flowerName: {
    marginTop: 12,
    color: colors.grayscale[700],
    fontSize: 17,
    fontFamily: "Pretendard-SemiBold",
  },

  selectedFlowerName: {
    color: colors.grayscale[800],
  },

  bottomContainer: {
    marginTop: "auto",
    paddingTop: 30,
    paddingBottom: 28,
    alignItems: "center",
  },
});
