import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type BannerState = "arrived" | "waiting";

interface HomeBannerProps {
  state: BannerState;
  onPress?: () => void;
}

const HomeBanner = ({ state, onPress }: HomeBannerProps) => {
  const isArrived = state === "arrived";

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/Home.png")}
        resizeMode="contain"
        style={styles.image}
      />

      <View style={styles.overlay}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={isArrived ? "mail" : "mail-outline"}
            size={24}
            color={colors.primary[600]}
          />
        </View>

        <Text style={styles.message}>
          {isArrived
            ? "도착한 꽃다발이 있어요!"
            : "아직 도착한 꽃다발이 없어요."}
        </Text>

        {isArrived && (
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>열어보기 →</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    aspectRatio: 335 / 225,
    marginBottom: 24,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 18,
    alignItems: "center",
  },

  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary[600],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  message: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[700],
    marginBottom: 12,
  },

  button: {
    backgroundColor: colors.primary[200],
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
  },
});
