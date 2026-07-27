import Button from "@/components/common/Button";
import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ReservationCompleteScreenProps {
  onPressHome?: () => void;
}

const ReservationCompleteScreen = ({
  onPressHome,
}: ReservationCompleteScreenProps) => {
  const [isHomeButtonVisible, setIsHomeButtonVisible] = useState(false);
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(12)).current;

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

    const timer = setTimeout(() => {
      setIsHomeButtonVisible(true);
      revealAnimation.start();
    }, 2000);

    return () => {
      clearTimeout(timer);
      revealAnimation.stop();
    };
  }, [buttonOpacity, buttonTranslateY]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
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
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -16 }],
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
