import { colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SHEET_HIDDEN_OFFSET = 600;

interface ReservationConfirmSheetProps {
  visible: boolean;
  flowerName: string;
  reservationDate: string;
  arrivalTime: string;
  letterMessage: string;
  onClose: () => void;
  onEdit: () => void;
  onConfirm: () => void;
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconContainer}>{icon}</View>

      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const ReservationConfirmSheet = ({
  visible,
  flowerName,
  reservationDate,
  arrivalTime,
  letterMessage,
  onClose,
  onEdit,
  onConfirm,
}: ReservationConfirmSheetProps) => {
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const letterPopupProgress = useRef(new Animated.Value(0)).current;

  const handleCloseSheet = () => {
    letterPopupProgress.stopAnimation();
    setIsLetterVisible(false);
    onClose();
  };

  const handleCloseLetter = () => {
    letterPopupProgress.stopAnimation();

    Animated.timing(letterPopupProgress, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIsLetterVisible(false);
      }
    });
  };

  const sheetTranslateY = useRef(
    new Animated.Value(SHEET_HIDDEN_OFFSET),
  ).current;

  useEffect(() => {
    if (!visible) {
      sheetTranslateY.setValue(SHEET_HIDDEN_OFFSET);
      return;
    }

    sheetTranslateY.setValue(SHEET_HIDDEN_OFFSET);

    const animation = Animated.timing(sheetTranslateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [sheetTranslateY, visible]);

  useEffect(() => {
    if (!isLetterVisible) {
      letterPopupProgress.setValue(0);
      return;
    }

    const animation = Animated.timing(letterPopupProgress, {
      toValue: 1,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [isLetterVisible, letterPopupProgress]);

  const letterPopupTranslateY = letterPopupProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 0],
  });

  const letterPopupScale = letterPopupProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleCloseSheet}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.dimmedArea} onPress={handleCloseSheet} />

        <Animated.View
          style={[
            styles.sheet,
            { transform: [{ translateY: sheetTranslateY }] },
          ]}
        >
          <View style={styles.handle} />

          <View style={styles.content}>
            <InfoRow
              icon={
                <Ionicons
                  name="flower-outline"
                  size={21}
                  color={colors.primary[700]}
                />
              }
              label="꽃다발"
              value={flowerName}
            />

            <InfoRow
              icon={
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={21}
                  color={colors.primary[700]}
                />
              }
              label="예약 날짜"
              value={reservationDate}
            />

            <InfoRow
              icon={
                <Ionicons
                  name="time-outline"
                  size={22}
                  color={colors.primary[700]}
                />
              }
              label="도착 시간"
              value={arrivalTime}
            />

            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>

              <Text style={styles.label}>편지 문구</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.letterButton,
                  pressed && styles.letterButtonPressed,
                ]}
                onPress={() => setIsLetterVisible(true)}
              >
                <Text style={styles.letterButtonText}>눌러서 확인</Text>

                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color={colors.primary[700]}
                />
              </Pressable>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.editButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={onEdit}
              >
                <Text style={styles.editButtonText}>수정</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.confirmButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={onConfirm}
              >
                <Text style={styles.confirmButtonText}>확인</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>

      {isLetterVisible && (
        <View style={styles.letterPopupContainer}>
          <Animated.View
            style={[
              styles.letterPopupBackground,
              { opacity: letterPopupProgress },
            ]}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handleCloseLetter}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.letterPopup,
              {
                opacity: letterPopupProgress,
                transform: [
                  { translateY: letterPopupTranslateY },
                  { scale: letterPopupScale },
                ],
              },
            ]}
          >
            <View style={styles.letterPopupHeader}>
              <Text style={styles.letterPopupTitle}>편지 문구</Text>

              <Pressable hitSlop={10} onPress={handleCloseLetter}>
                <Ionicons name="close" size={22} color={colors.primary[400]} />
              </Pressable>
            </View>

            <View style={styles.letterMessageContainer}>
              <Text style={styles.letterMessage}>{letterMessage}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.letterCloseButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleCloseLetter}
            >
              <Text style={styles.letterCloseButtonText}>확인</Text>
            </Pressable>
          </Animated.View>
        </View>
      )}
    </Modal>
  );
};

export default ReservationConfirmSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  dimmedArea: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(32, 42, 30, 0.28)",
  },

  sheet: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 14,
    paddingBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
  },

  handle: {
    width: 48,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#c0c0c0",
    alignSelf: "center",
    marginBottom: 18,
  },

  content: {
    paddingHorizontal: 24,
  },

  infoRow: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[100],
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5ECE2",
    marginRight: 12,
  },

  label: {
    width: 82,
    fontSize: 13,
    color: "#6E7169",
  },

  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#3D443A",
    textAlign: "right",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  button: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  editButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.primary[200],
  },

  confirmButton: {
    backgroundColor: colors.primary[700],
  },

  editButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary[400],
  },

  confirmButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  letterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
    flex: 1,
    minHeight: 36,
  },

  letterButtonPressed: {
    opacity: 0.55,
  },

  letterButtonText: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: colors.primary[700],
  },

  letterPopupContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  letterPopupBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(30, 38, 28, 0.35)",
  },

  letterPopup: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.grayscale[100],
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },

  letterPopupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  letterPopupTitle: {
    fontSize: 14,
    fontFamily: "Pretendard-Bold",
    color: colors.primary[500],
  },

  letterMessageContainer: {
    minHeight: 130,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 40,
    backgroundColor: colors.grayscale[100],
    borderWidth: 1,
    borderColor: colors.primary[200],
    borderRadius: 0,
  },

  letterMessage: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.primary[700],
    textAlign: "center",
  },

  letterCloseButton: {
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    borderRadius: 10,
    backgroundColor: colors.primary[400],
  },

  letterCloseButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary[100],
  },
});
