import { colors } from "@/constants/colors";
import {
  DeliveryFlowerType,
  FLOWER_DELIVERIES,
} from "@/screens/delivery/deliveryData";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BouquetLetterScreenProps {
  flower: DeliveryFlowerType;
  onPressBack: () => void;
  onPressHome: () => void;
}

const PETALS = [
  { symbol: "✿", left: "15%", driftX: -34, turn: -85, size: 22 },
  { symbol: "♥", left: "29%", driftX: 18, turn: 50, size: 15 },
  { symbol: "❀", left: "44%", driftX: -12, turn: -55, size: 20 },
  { symbol: "♥", left: "58%", driftX: 30, turn: 75, size: 13 },
  { symbol: "✿", left: "72%", driftX: -22, turn: -70, size: 19 },
  { symbol: "❀", left: "84%", driftX: 25, turn: 90, size: 17 },
] as const;

const BouquetLetterScreen = ({
  flower,
  onPressBack,
  onPressHome,
}: BouquetLetterScreenProps) => {
  const delivery = FLOWER_DELIVERIES[flower];
  const [isExiting, setIsExiting] = useState(false);
  const revealOpacity = useRef(new Animated.Value(0)).current;
  const revealScale = useRef(new Animated.Value(0.96)).current;
  const bouquetExitScale = useRef(new Animated.Value(1)).current;
  const exitFadeOpacity = useRef(new Animated.Value(0)).current;
  const petalAnimations = useRef(
    PETALS.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
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
  }, [revealOpacity, revealScale]);

  const handlePressHome = () => {
    if (isExiting) return;

    setIsExiting(true);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(bouquetExitScale, {
          toValue: 1.035,
          duration: 230,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(bouquetExitScale, {
          toValue: 0.9,
          duration: 820,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(
        70,
        petalAnimations.map((animation) =>
          Animated.timing(animation, {
            toValue: 1,
            duration: 850,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ),
      ),
      Animated.sequence([
        Animated.delay(650),
        Animated.timing(exitFadeOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) onPressHome();
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable
          accessibilityLabel="배달 화면으로 돌아가기"
          accessibilityRole="button"
          hitSlop={8}
          disabled={isExiting}
          onPress={onPressBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons color={colors.primary[600]} name="arrow-back" size={23} />
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
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            오늘의 나에게,{"\n"}
            <Text style={{ color: delivery.accent }}>{delivery.name}</Text>
          </Text>

          <Animated.View
            style={[
              styles.bouquetFrame,
              { transform: [{ scale: bouquetExitScale }] },
            ]}
          >
            <Image
              accessibilityLabel={`${delivery.name} 꽃다발`}
              contentFit="cover"
              source={delivery.bunchImage}
              style={styles.bouquetImage}
              transition={250}
            />
          </Animated.View>

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
            accessibilityLabel="홈으로 이동"
            accessibilityRole="button"
            disabled={isExiting}
            onPress={handlePressHome}
            style={({ pressed }) => [
              styles.homeButton,
              (pressed || isExiting) && styles.homeButtonPressed,
            ]}
          >
            <Text style={styles.homeButtonText}>홈으로 이동</Text>
          </Pressable>
        </ScrollView>
      </Animated.View>

      <View pointerEvents="none" style={styles.petalLayer}>
        {PETALS.map((petal, index) => {
          const progress = petalAnimations[index];

          return (
            <Animated.Text
              key={`${petal.symbol}-${petal.left}`}
              style={[
                styles.petal,
                {
                  left: petal.left,
                  color: index % 2 === 0 ? delivery.accent : colors.point,
                  fontSize: petal.size,
                  opacity: progress.interpolate({
                    inputRange: [0, 0.14, 0.72, 1],
                    outputRange: [0, 1, 1, 0],
                  }),
                  transform: [
                    {
                      translateX: progress.interpolate({
                        inputRange: [0, 0.55, 1],
                        outputRange: [0, petal.driftX * 0.4, petal.driftX],
                      }),
                    },
                    {
                      translateY: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [24, -190],
                      }),
                    },
                    {
                      rotate: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", `${petal.turn}deg`],
                      }),
                    },
                    {
                      scale: progress.interpolate({
                        inputRange: [0, 0.2, 0.8, 1],
                        outputRange: [0.4, 1, 1, 0.7],
                      }),
                    },
                  ],
                },
              ]}
            >
              {petal.symbol}
            </Animated.Text>
          );
        })}
      </View>

      <Animated.View
        pointerEvents="none"
        style={[styles.exitFade, { opacity: exitFadeOpacity }]}
      />
    </SafeAreaView>
  );
};

export default BouquetLetterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  header: {
    height: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
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

  content: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 32,
    alignItems: "center",
  },

  eyebrow: {
    color: colors.grayscale[600],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 10,
    letterSpacing: 2.3,
  },

  title: {
    marginTop: 5,
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
    maxWidth: 200,
    height: 52,
    marginTop: 38,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[500],
  },

  homeButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },

  homeButtonText: {
    color: colors.grayscale[100],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 15,
  },

  petalLayer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 8,
    overflow: "hidden",
  },

  petal: {
    position: "absolute",
    bottom: 72,
    fontFamily: "Pretendard-SemiBold",
    textShadowColor: "rgba(70, 52, 35, 0.12)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },

  exitFade: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9,
    backgroundColor: colors.grayscale[200],
  },
});
