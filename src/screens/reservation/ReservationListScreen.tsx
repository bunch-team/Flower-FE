import ReservationConfirmSheet from "@/components/common/ReservationConfirmSheet";
import ReservationCard from "@/components/reservation/ReservationCard";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ReservationItem {
  id: string;
  bouquetName: string;
  deliveryStatus: string;
  deliveryDate: string;
  arrivalTime: string;
  letterMessage: string;
  imageSource: ImageSourcePropType;
}

interface ReservationListScreenProps {
  reservations: ReservationItem[];
  onPressBack: () => void;
  onPressMenu: () => void;
  onPressReservation?: (reservation: ReservationItem) => void;
}

const ReservationListScreen = ({
  reservations,
  onPressBack,
  onPressMenu,
  onPressReservation,
}: ReservationListScreenProps) => {
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationItem | null>(null);
  const hasReservations = reservations.length > 0;

  const handleReservationPress = (reservation: ReservationItem) => {
    setSelectedReservation(reservation);
    onPressReservation?.(reservation);
  };

  const handleCloseSheet = () => {
    setSelectedReservation(null);
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로 가기"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onPressBack}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.primary[500]} />
        </Pressable>

        <Text style={styles.headerTitle}>꽃 예약 목록</Text>

        <Pressable
          accessibilityLabel="메뉴 열기"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onPressMenu}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="menu" size={30} color={colors.primary[600]} />
        </Pressable>
      </View>

      {hasReservations ? (
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.hint}>누르면 상세 내용을 볼 수 있어요</Text>

          <View style={styles.list}>
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                bouquetName={reservation.bouquetName}
                deliveryStatus={reservation.deliveryStatus}
                deliveryDate={reservation.deliveryDate}
                imageSource={reservation.imageSource}
                onPress={() => handleReservationPress(reservation)}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Image
            accessibilityLabel="꽃다발을 생각하는 햄스터"
            contentFit="contain"
            source={require("@/assets/images/none.png")}
            style={styles.emptyImage}
          />

          <Text style={styles.emptyTitle}>아직 예약된 꽃다발이 없어요.</Text>
          <Text style={styles.emptyDescription}>
            마음을 전할 꽃을 예약해보세요!
          </Text>
        </View>
      )}

      <ReservationConfirmSheet
        visible={selectedReservation !== null}
        flowerName={selectedReservation?.bouquetName ?? ""}
        reservationDate={selectedReservation?.deliveryDate ?? ""}
        arrivalTime={selectedReservation?.arrivalTime ?? ""}
        letterMessage={selectedReservation?.letterMessage ?? ""}
        onClose={handleCloseSheet}
        onEdit={handleCloseSheet}
        onConfirm={handleCloseSheet}
      />
    </SafeAreaView>
  );
};

export default ReservationListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  header: {
    height: 76,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    color: colors.primary[600],
    fontFamily: "LeeSeoyun",
    fontSize: 24,
    marginLeft: 8,
  },

  pressed: {
    opacity: 0.55,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },

  hint: {
    marginBottom: 12,
    color: colors.grayscale[700],
    fontFamily: "Pretendard-Regular",
    fontSize: 11,
    textAlign: "right",
  },

  list: {
    gap: 12,
  },

  emptyState: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -42 }],
  },

  emptyImage: {
    width: 260,
    height: 270,
  },

  emptyTitle: {
    marginTop: 30,
    color: colors.primary[700],
    fontFamily: "Pretendard-Medium",
    fontSize: 19,
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 16,
    color: colors.grayscale[600],
    fontFamily: "Pretendard-Regular",
    fontSize: 15,
    textAlign: "center",
  },
});
