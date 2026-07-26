import Button from "@/components/common/Button";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

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
        contentFit="contain"
        style={styles.image}
      />

      {isArrived ? (
        <View style={styles.arrivedContent}>
          <View style={styles.messageRow}>
            <View style={styles.arrivedIcon}>
              <Ionicons name="mail" size={16} color={colors.grayscale[200]} />
            </View>
            <Text style={styles.message}>도착한 꽃다발이 있어요!</Text>
          </View>

          <View style={styles.openButton}>
            <Button
              title="열어보기 →"
              onPress={() => onPress?.()}
              width={120}
              height={36}
              backgroundColor={colors.primary[400]}
              textColor={colors.grayscale[200]}
              fontFamily="Pretendard-Medium"
              fontSize={13}
              borderRadius={18}
            />
          </View>
        </View>
      ) : (
        <View style={styles.waitingContent}>
          <Image
            source={require("../../../assets/images/letter.svg")}
            style={styles.letter}
            contentFit="contain"
            accessibilityLabel="하트가 그려진 편지 봉투"
          />
          <Text style={styles.message}>아직 도착한 꽃다발이 없어요.</Text>
        </View>
      )}
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    aspectRatio: 1493 / 1054,
    marginBottom: 8,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  arrivedContent: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 16,
    alignItems: "center",
    gap: 36,
  },

  messageRow: {
    width: "100%",
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  arrivedIcon: {
    position: "absolute",
    left: 20,
    top: -10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[400],
  },

  openButton: {
    transform: [{ translateY: -10 }],
  },

  waitingContent: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 22,
    alignItems: "center",
    gap: 12,
  },

  letter: {
    width: 80,
    height: 60,
  },

  message: {
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
    color: colors.primary[600],
    textAlign: "center",
  },
});
