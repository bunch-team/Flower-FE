import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoginScreenProps {
  onKakaoLogin: () => void;
  onGoogleLogin: () => void;
}

const LoginScreen = ({
  onKakaoLogin,
  onGoogleLogin,
}: LoginScreenProps) => {
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

      <View style={styles.loginArea}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="카카오톡으로 로그인"
          onPress={onKakaoLogin}
          style={({ pressed }) => [
            styles.kakaoButton,
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={require("../../../assets/images/kakao.png")}
            style={styles.buttonImage}
            contentFit="contain"
          />
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>또는</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Google로 로그인"
          onPress={onGoogleLogin}
          style={({ pressed }) => [
            styles.googleButton,
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={require("../../../assets/images/google.png")}
            style={styles.buttonImage}
            contentFit="contain"
          />
        </Pressable>

        <Image
          source={require("../../../assets/images/FILM.svg")}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="FILM"
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    transform: [{ translateY: -44 }],
  },

  loginArea: {
    width: "100%",
    maxWidth: 348,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  kakaoButton: {
    width: "100%",
    aspectRatio: 300 / 45,
  },

  googleButton: {
    width: "100%",
    aspectRatio: 720 / 160,
  },

  buttonImage: {
    width: "100%",
    height: "100%",
  },

  pressed: {
    opacity: 0.72,
  },

  divider: {
    width: "100%",
    marginVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.grayscale[400],
  },

  dividerText: {
    color: colors.grayscale[500],
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
  },

  logo: {
    width: 50,
    height: 18,
    marginTop: 48,
    marginBottom: 24,
  },
});
