import BottomTabBar from "@/components/common/BottomTabBar";
import Button from "@/components/common/Button";
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

      <View style={styles.bottomTabBar}>
        <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
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
  bottomTabBar: {
    position: "absolute",
    bottom: 48,
  },
});
