import Button from "@/components/common/Button";
import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ReservationCompleteScreenProps {
  onPressHome?: () => void;
}

const ReservationCompleteScreen = ({
  onPressHome,
}: ReservationCompleteScreenProps) => {
  const [isHomeButtonVisible, setIsHomeButtonVisible] = useState(false);
  const [isCountdownVisible, setIsCountdownVisible] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(12)).current;
  const countdownOpacity = useRef(new Animated.Value(1)).current;
  const spinnerProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const revealAnimation = Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]);

    const spinnerAnimation = Animated.loop(
      Animated.timing(spinnerProgress, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    spinnerAnimation.start();

    const secondCountTimer = setTimeout(() => setCountdown(2), 1000);
    const lastCountTimer = setTimeout(() => setCountdown(1), 2000);
    const fadeCountdownTimer = setTimeout(() => {
      Animated.timing(countdownOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 2750);
    const revealButtonTimer = setTimeout(() => {
      spinnerAnimation.stop();
      setIsCountdownVisible(false);
      setIsHomeButtonVisible(true);
      revealAnimation.start();
    }, 3000);

    return () => {
      clearTimeout(secondCountTimer);
      clearTimeout(lastCountTimer);
      clearTimeout(fadeCountdownTimer);
      clearTimeout(revealButtonTimer);
      spinnerAnimation.stop();
      revealAnimation.stop();
    };
  }, [buttonOpacity, buttonTranslateY, countdownOpacity, spinnerProgress]);

  const spinnerRotation = spinnerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {isCountdownVisible && (
          <Animated.View
            style={[styles.countdownContainer, { opacity: countdownOpacity }]}
          >
            <Animated.View
              style={[
                styles.spinner,
                { transform: [{ rotate: spinnerRotation }] },
              ]}
            />
            <Text style={styles.countdownText}>{countdown}</Text>
          </Animated.View>
        )}

        <Image
          source={require("@/assets/images/reservationDone.png")}
          style={styles.image}
          contentFit="contain"
          accessibilityLabel="꽃다발을 든 햄스터"
        />

        <Text style={styles.title}>예약이 완료되었어요!</Text>
      </View>

      <View style={styles.bottomContainer}>
        {isHomeButtonVisible && (
          <Animated.View
            style={[
              styles.buttonReveal,
              {
                opacity: buttonOpacity,
                transform: [{ translateY: buttonTranslateY }],
              },
            ]}
          >
            <Button
              title="홈으로 가기"
              onPress={() => onPressHome?.()}
              width="52%"
              backgroundColor={colors.primary[500]}
              textColor={colors.grayscale[100]}
              fontFamily="Pretendard-Medium"
            />
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReservationCompleteScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  content: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -16 }],
  },

  countdownContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  spinner: {
    position: "absolute",
    width: 42,
    height: 42,
    borderWidth: 2.5,
    borderColor: colors.primary[100],
    borderTopColor: colors.primary[500],
    borderRadius: 21,
  },

  countdownText: {
    color: colors.primary[600],
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
  },

  image: {
    width: 300,
    aspectRatio: 330 / 288,
  },

  title: {
    marginTop: 34,
    color: colors.primary[700],
    fontSize: 24,
    fontFamily: "LeeSeoyun",
    textAlign: "center",
  },

  bottomContainer: {
    minHeight: 84,
    paddingBottom: 28,
    alignItems: "center",
  },

  buttonReveal: {
    width: "100%",
    alignItems: "center",
  },
});
