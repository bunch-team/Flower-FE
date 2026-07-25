import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

const SplashScreen = ({
  onFinish,
  duration = 1600,
}: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <Image
          source={require("../../../assets/images/splash.png")}
          style={styles.bouquet}
          contentFit="contain"
          accessibilityLabel="분홍색 꽃다발"
        />
      </View>

      <Image
        source={require("../../../assets/images/FILM.svg")}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="FILM"
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.grayscale[200],
  },

  hero: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  bouquet: {
    width: 220,
    aspectRatio: 422 / 477,
    transform: [{ translateY: -60 }],
  },

  logo: {
    width: 50,
    height: 18,
    marginBottom: 28,
  },
});
