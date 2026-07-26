import { colors } from "@/constants/colors";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ReservationExitModalProps {
  visible: boolean;
  onClose: () => void;
  onExit: () => void;
}

const ReservationExitModal = ({
  visible,
  onClose,
  onExit,
}: ReservationExitModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.card}
          onPress={(event) => event.stopPropagation()}
        >
          <Text style={styles.title}>예약하기를 종료하시겠어요?</Text>

          <Text style={styles.description}>
            지금까지 선택한 내용은 저장되지 않아요.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>계속하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.exitButton]}
              activeOpacity={0.8}
              onPress={onExit}
            >
              <Text style={styles.exitButtonText}>종료하기</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ReservationExitModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 30, 23, 0.45)",
  },

  card: {
    width: "100%",
    maxWidth: 350,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 30,
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: colors.grayscale[100],
  },

  iconContainer: {
    width: 58,
    height: 58,
    marginBottom: 22,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[500],
  },

  title: {
    color: colors.grayscale[800],
    fontSize: 19,
    fontFamily: "Pretendard-Medium",
    textAlign: "center",
  },

  description: {
    marginTop: 9,
    color: colors.grayscale[700],
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    fontFamily: "Pretendard-Regular",
  },

  buttonRow: {
    width: "85%",
    marginTop: 28,
    flexDirection: "row",
    gap: 14,
  },

  button: {
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: colors.primary[200],
    backgroundColor: colors.grayscale[100],
  },

  exitButton: {
    backgroundColor: colors.primary[600],
  },

  cancelButtonText: {
    color: colors.primary[500],
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
  },

  exitButtonText: {
    color: colors.grayscale[100],
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
  },
});
