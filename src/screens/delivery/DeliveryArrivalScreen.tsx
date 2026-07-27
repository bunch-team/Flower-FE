import { colors } from "@/constants/colors";
import { useNickname } from "@/contexts/NicknameContext";
import {
  DeliveryFlowerType,
  FLOWER_DELIVERIES,
} from "@/screens/delivery/deliveryData";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DeliveryArrivalScreenProps {
  flower: DeliveryFlowerType;
  onPressClose: () => void;
  onPressReceive: () => void;
}

const DeliveryArrivalScreen = ({
  flower,
  onPressClose,
  onPressReceive,
}: DeliveryArrivalScreenProps) => {
  const delivery = FLOWER_DELIVERIES[flower];
  const { nickname } = useNickname();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Image
        accessibilityLabel={`${delivery.name} 꽃다발을 배달하러 온 햄스터`}
        contentFit="cover"
        source={delivery.deliverImage}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.overlay}>
        <Pressable
          accessibilityLabel="배달 화면 닫기"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onPressClose}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons color={colors.primary[600]} name="close" size={24} />
        </Pressable>

        <View accessibilityRole="text" style={styles.speechContent}>
          <Text style={styles.speechText}>
            안녕 {nickname}아!{"\n"}과거의 너에게서{"\n"}이 꽃다발이 배달됐어!
          </Text>
        </View>

        <View style={styles.bottom}>
          <Pressable
            accessibilityHint="꽃다발과 편지 화면으로 이동합니다"
            accessibilityRole="button"
            onPress={onPressReceive}
            style={({ pressed }) => [
              styles.receiveButton,
              pressed && styles.receiveButtonPressed,
            ]}
          >
            <View
              pointerEvents="none"
              style={styles.receiveButtonDashedBorder}
            />
            <Text style={styles.receiveButtonText}>꽃다발 열어보기</Text>
            <Ionicons color={colors.point} name="heart" size={18} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryArrivalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EED7B2",
  },

  overlay: {
    flex: 1,
  },

  closeButton: {
    position: "absolute",
    top: 36,
    right: 24,
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 253, 248, 0.82)",
  },

  speechContent: {
    position: "absolute",
    top: "16%",
    left: "20%",
    right: "20%",
    height: "18%",
    alignItems: "center",
    justifyContent: "center",
  },

  speechText: {
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 21,
    lineHeight: 29,
    textAlign: "center",
  },

  bottom: {
    position: "absolute",
    left: 28,
    right: 28,
    bottom: 20,
    alignItems: "center",
  },

  receiveButton: {
    position: "relative",
    width: "63%",
    height: 56,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.grayscale[300],
    shadowColor: "#5A422C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 7,
    marginBottom: 28,
  },

  receiveButtonDashedBorder: {
    position: "absolute",
    top: 4,
    right: 4,
    bottom: 4,
    left: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.grayscale[600],
    borderRadius: 6,
  },

  receiveButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },

  receiveButtonText: {
    color: colors.grayscale[700],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },

  pressed: {
    opacity: 0.6,
  },
});
