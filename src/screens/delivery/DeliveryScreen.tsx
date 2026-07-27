import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type DeliveryFlowerType =
  | "tulip"
  | "sunflower"
  | "lavendar"
  | "lily";

interface DeliveryScreenProps {
  flower?: DeliveryFlowerType;
  onPressClose: () => void;
}

const FLOWER_DELIVERIES = {
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

const DeliveryScreen = ({
  flower = "tulip",
  onPressClose,
}: DeliveryScreenProps) => {
  const delivery = FLOWER_DELIVERIES[flower];
  const [isOpened, setIsOpened] = useState(false);
  const revealOpacity = useRef(new Animated.Value(0)).current;
  const revealScale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    if (!isOpened) return;

    Animated.parallel([
      Animated.timing(revealOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(revealScale, {
        toValue: 1,
        damping: 16,
        stiffness: 140,
        mass: 0.8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpened, revealOpacity, revealScale]);

  if (!isOpened) {
    return (
      <View style={styles.deliveryScene}>
        <StatusBar style="dark" />

        <Image
          accessibilityLabel={`${delivery.name} 꽃다발을 배달하러 온 햄스터`}
          contentFit="cover"
          source={delivery.deliverImage}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={styles.sceneOverlay}>
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
            <Ionicons
              color={colors.primary[600]}
              name="close"
              size={24}
            />
          </Pressable>

          <View
            accessibilityRole="text"
            style={styles.speechContent}
          >
            <Text style={styles.speechEyebrow}>FILM FLOWER DELIVERY</Text>
            <Text style={styles.speechText}>{delivery.greeting}</Text>
          </View>

          <View style={styles.sceneBottom}>
            <Text style={styles.arrivalLabel}>기다리던 꽃다발이 도착했어요</Text>
            <Pressable
              accessibilityHint="도착한 꽃다발과 편지를 확인합니다"
              accessibilityRole="button"
              onPress={() => setIsOpened(true)}
              style={({ pressed }) => [
                styles.receiveButton,
                pressed && styles.receiveButtonPressed,
              ]}
            >
              <Text style={styles.receiveButtonText}>꽃다발 받기</Text>
              <Ionicons
                color={colors.grayscale[100]}
                name="arrow-forward"
                size={18}
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.openedSafeArea}>
      <StatusBar style="dark" />

      <View style={styles.openedHeader}>
        <Pressable
          accessibilityLabel="홈으로 돌아가기"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onPressClose}
          style={({ pressed }) => [
            styles.headerBackButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            color={colors.primary[600]}
            name="arrow-back"
            size={23}
          />
        </Pressable>

        <Text style={styles.headerTitle}>오늘의 꽃다발</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Animated.View
        style={[
          styles.revealContainer,
          {
            opacity: revealOpacity,
            transform: [{ scale: revealScale }],
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.openedContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.openedEyebrow}>A FLOWER FOR YOU</Text>
          <Text style={styles.openedTitle}>
            오늘의 나에게,{"\n"}
            <Text style={{ color: delivery.accent }}>{delivery.name}</Text>
          </Text>

          <View style={styles.bouquetFrame}>
            <Image
              accessibilityLabel={`${delivery.name} 꽃다발`}
              contentFit="cover"
              source={delivery.bunchImage}
              style={styles.bouquetImage}
              transition={250}
            />
            <View style={styles.dateTag}>
              <Text style={styles.dateTagText}>TODAY</Text>
            </View>
          </View>

          <View style={styles.letterCard}>
            <View style={styles.letterTopRow}>
              <Ionicons color={delivery.accent} name="heart" size={16} />
              <Text style={styles.letterLabel}>나에게 온 편지</Text>
            </View>
            <Text style={styles.letterText}>
              오늘도 충분히 잘 해내고 있어요.{"\n"}
              꽃을 보는 잠깐만큼은 천천히 쉬어가요.
            </Text>
            <View style={styles.divider} />
            <Text style={styles.flowerLanguage}>
              꽃말 · {delivery.flowerLanguage}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onPressClose}
            style={({ pressed }) => [
              styles.homeButton,
              pressed && styles.receiveButtonPressed,
            ]}
          >
            <Text style={styles.homeButtonText}>마음에 간직하기</Text>
          </Pressable>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  deliveryScene: {
    flex: 1,
    backgroundColor: "#EED7B2",
  },

  sceneOverlay: {
    flex: 1,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 18,
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
    top: "15%",
    left: "20%",
    right: "20%",
    height: "18%",
    alignItems: "center",
    justifyContent: "center",
  },

  speechEyebrow: {
    marginBottom: 10,
    color: colors.grayscale[600],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 9,
    letterSpacing: 1.6,
  },

  speechText: {
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 21,
    lineHeight: 29,
    textAlign: "center",
  },

  sceneBottom: {
    position: "absolute",
    left: 28,
    right: 28,
    bottom: 20,
    alignItems: "center",
  },

  arrivalLabel: {
    marginBottom: 12,
    color: colors.grayscale[100],
    fontFamily: "Pretendard-Medium",
    fontSize: 13,
    textShadowColor: "rgba(72, 52, 31, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },

  receiveButton: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary[500],
    shadowColor: "#5A422C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 7,
  },

  receiveButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },

  receiveButtonText: {
    color: colors.grayscale[100],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },

  openedSafeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  openedHeader: {
    height: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale[300],
  },

  headerTitle: {
    color: colors.primary[600],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 15,
  },

  headerSpacer: {
    width: 40,
  },

  pressed: {
    opacity: 0.6,
  },

  revealContainer: {
    flex: 1,
  },

  openedContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 32,
    alignItems: "center",
  },

  openedEyebrow: {
    color: colors.grayscale[600],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 10,
    letterSpacing: 2.3,
  },

  openedTitle: {
    marginTop: 9,
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 27,
    lineHeight: 34,
    textAlign: "center",
  },

  bouquetFrame: {
    position: "relative",
    width: "100%",
    maxWidth: 350,
    aspectRatio: 0.78,
    marginTop: 20,
    overflow: "hidden",
    borderRadius: 28,
    borderWidth: 6,
    borderColor: colors.grayscale[100],
    backgroundColor: colors.grayscale[300],
    shadowColor: colors.primary[700],
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 5,
  },

  bouquetImage: {
    width: "100%",
    height: "100%",
  },

  dateTag: {
    position: "absolute",
    top: 14,
    left: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
    backgroundColor: "rgba(255, 253, 248, 0.9)",
  },

  dateTagText: {
    color: colors.primary[500],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 9,
    letterSpacing: 1.2,
  },

  letterCard: {
    width: "100%",
    maxWidth: 350,
    marginTop: 18,
    padding: 22,
    borderRadius: 22,
    backgroundColor: colors.grayscale[100],
    borderWidth: 1,
    borderColor: colors.grayscale[400],
  },

  letterTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  letterLabel: {
    color: colors.grayscale[700],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
  },

  letterText: {
    marginTop: 15,
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 19,
    lineHeight: 28,
  },

  divider: {
    height: 1,
    marginVertical: 16,
    backgroundColor: colors.grayscale[400],
  },

  flowerLanguage: {
    color: colors.grayscale[700],
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
  },

  homeButton: {
    width: "100%",
    maxWidth: 350,
    height: 52,
    marginTop: 18,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[500],
  },

  homeButtonText: {
    color: colors.grayscale[100],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 15,
  },
});
