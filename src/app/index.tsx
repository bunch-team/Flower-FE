import BottomTabBar from "@/components/common/BottomTabBar";
import Button from "@/components/common/Button";
import FAB from "@/components/common/FAB";
import ReservationConfirmSheet from "@/components/common/ReservationConfirmSheet";
import StepIndicator from "@/components/common/StepIndicator";

import { colors } from "@/constants/colors";
import { useFonts } from "expo-font";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Index() {
  const [activeTab, setActiveTab] = useState<"home" | "archive">("home");
  const [isConfirmSheetVisible, setIsConfirmSheetVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StepIndicator currentStep={2} />

      <Button
        title="예약 확인 열기"
        onPress={() => setIsConfirmSheetVisible(true)}
        width={160}
        backgroundColor={colors.primary[600]}
        textColor={colors.grayscale[200]}
        fontFamily="Pretendard-Medium"
        fontWeight="500"
      />

      <ReservationConfirmSheet
        visible={isConfirmSheetVisible}
        flowerName="봄날 튤립 꽃다발"
        reservationDate="2026년 7월 25일"
        arrivalTime="오후 2시"
        letterMessage="생일을 진심으로 축하해!"
        onClose={() => setIsConfirmSheetVisible(false)}
        onEdit={() => {
          setIsConfirmSheetVisible(false);
          Alert.alert("예약 수정", "예약 정보를 수정합니다.");
        }}
        onConfirm={() => {
          setIsConfirmSheetVisible(false);
          Alert.alert("예약 완료", "예약이 확정되었습니다.");
        }}
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
