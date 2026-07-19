import BottomTabBar from "@/components/common/BottomTabBar";
import Button from "@/components/common/Button";
import FAB from "@/components/common/FAB";
import { colors } from "@/constants/colors";
import { useFonts } from "expo-font";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Index() {
  const [activeTab, setActiveTab] = useState<"home" | "archive">("home");
  const [fontsLoaded] = useFonts({
    "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        title="버튼 확인"
        onPress={() => Alert.alert("버튼이 눌렸습니다")}
        width={120}
        backgroundColor={colors.primary[600]}
        textColor={colors.grayscale[200]}
        fontFamily="Pretendard-Medium"
        fontWeight="500"
      />

      <View style={styles.bottomNavigation}>
        <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
        <FAB
          onPressFirst={() => {
            console.log("예약");
          }}
          onPressSecond={() => {
            console.log("목록");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
