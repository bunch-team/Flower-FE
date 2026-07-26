import Button from "@/components/common/Button";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface NicknameEditModalProps {
  visible: boolean;
  currentNickname: string;
  onClose: () => void;
  onSave: (nickname: string) => void;
}

const MAX_LENGTH = 10;

const EditNicknameScreen = ({
  visible,
  currentNickname,
  onClose,
  onSave,
}: NicknameEditModalProps) => {
  const [nickname, setNickname] = useState(currentNickname);

  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const trimmedNickname = nickname.trim();

  const isChanged =
    trimmedNickname.length > 0 && trimmedNickname !== currentNickname;

  useEffect(() => {
    if (visible) {
      setNickname(currentNickname);

      scaleAnim.setValue(0.92);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 180,
        }),

        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, currentNickname, opacityAnim, scaleAnim]);

  const animateClose = (onFinished: () => void) => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.94,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onFinished();
      }
    });
  };

  const handleClose = () => {
    animateClose(onClose);
  };

  const handleSave = () => {
    if (!isChanged) return;

    animateClose(() => {
      onSave(trimmedNickname);
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable style={styles.overlay} onPress={handleClose} />

        <Animated.View
          style={[
            styles.card,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.label}>닉네임</Text>

          <View
            style={[
              styles.inputContainer,
              nickname.length > 0 && styles.focusedInputContainer,
            ]}
          >
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              maxLength={MAX_LENGTH}
              autoFocus
              style={styles.input}
              selectionColor="#465940"
              placeholder="닉네임을 입력해주세요"
              placeholderTextColor="#A7B3A1"
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />

            <Text style={styles.count}>
              {nickname.length} / {MAX_LENGTH}
            </Text>
          </View>

          <View style={styles.helperRow}>
            <Ionicons
              name="pencil-outline"
              size={20}
              color={colors.primary[300]}
            />

            <Text style={styles.helperText}>새로운 닉네임을 입력해주세요.</Text>
          </View>

          <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
              <Button
                title="취소"
                onPress={handleClose}
                height={54}
                backgroundColor="#F7F2E6"
                textColor="#393A36"
                fontSize={15}
                fontFamily="Pretendard-Medium"
                fontWeight="700"
                borderRadius={30}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                title="변경하기"
                onPress={handleSave}
                height={54}
                backgroundColor={isChanged ? "#465940" : "#C9D0C4"}
                textColor={isChanged ? "#FFFFFF" : "#F4F4F0"}
                fontSize={15}
                fontFamily="Pretendard-Medium"
                borderRadius={30}
                disabled={!isChanged}
              />
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditNicknameScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  card: {
    width: "100%",
    maxWidth: 420,
    paddingTop: 44,
    paddingHorizontal: 38,
    paddingBottom: 40,
    borderRadius: 20,
    backgroundColor: "#FDFBF0",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },

  label: {
    marginBottom: 14,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: colors.primary[500],
  },

  inputContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -5,
    paddingHorizontal: 18,
    borderWidth: 1.6,
    borderColor: colors.primary[200],
    borderRadius: 16,
    backgroundColor: "#FDFBF0",
  },

  focusedInputContainer: {
    borderColor: colors.primary[400],
  },

  input: {
    flex: 1,
    paddingVertical: 0,
    paddingRight: 12,
    fontSize: 17,
    fontFamily: "Pretendard-Medium",
    color: colors.primary[700],
  },

  count: {
    fontSize: 13,
    color: colors.primary[400],
  },

  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingLeft: 8,
  },

  helperText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: colors.primary[300],
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 42,
    gap: 20,
    marginBottom: 2,
  },

  buttonWrapper: {
    flex: 1,
  },
});
