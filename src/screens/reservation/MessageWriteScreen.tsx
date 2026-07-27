import Button from "@/components/common/Button";
import StepIndicator from "@/components/common/StepIndicator";
import ReservationExitModal from "@/components/reservation/ReservationExitModal";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MessageWriteScreenProps {
  onPressBack?: () => void;
  onPressNext?: (message: string, letterIndex: number) => void;
  onPressExit?: () => void;
}

const MAX_MESSAGE_LENGTH = 100;

const LETTERS = [
  {
    preview: require("@/assets/images/letter/letter1.svg"),
    thumbnail: require("@/assets/images/letter/MiniLetter1.png"),
  },
  {
    preview: require("@/assets/images/letter/letter2.svg"),
    thumbnail: require("@/assets/images/letter/MiniLetter2.png"),
  },
  {
    preview: require("@/assets/images/letter/letter3.svg"),
    thumbnail: require("@/assets/images/letter/MiniLetter3.png"),
  },
] as const;

const MessageWriteScreen = ({
  onPressBack,
  onPressNext,
  onPressExit,
}: MessageWriteScreenProps) => {
  const [message, setMessage] = useState("");
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const handleExit = () => {
    setIsExitModalVisible(false);
    onPressExit?.();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="이전 단계로 이동"
            activeOpacity={0.75}
            onPress={onPressBack}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={26}
              color={colors.grayscale[100]}
            />
          </TouchableOpacity>

          <StepIndicator currentStep={2} />

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="예약 종료"
            activeOpacity={0.7}
            onPress={() => setIsExitModalVisible(true)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={30} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            나에게 전하고 싶은{"\n"}응원의 메시지를 적어보세요!
          </Text>

          <View style={styles.letterSection}>
            <View style={styles.letterPreview}>
              <Image
                source={LETTERS[selectedLetterIndex].preview}
                style={StyleSheet.absoluteFill}
                contentFit="fill"
              />

              <TextInput
                value={message}
                onChangeText={setMessage}
                maxLength={MAX_MESSAGE_LENGTH}
                multiline
                textAlignVertical="center"
                selectionColor={colors.primary[400]}
                style={styles.messageInput}
              />
            </View>

            <Text style={styles.counter}>
              {message.length}/{MAX_MESSAGE_LENGTH}
            </Text>
          </View>

          <View style={styles.letterOptions}>
            {LETTERS.map((letter, index) => {
              const isSelected = selectedLetterIndex === index;

              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${index + 1}번 편지지 선택`}
                  key={index}
                  onPress={() => setSelectedLetterIndex(index)}
                  style={[
                    styles.letterOption,
                    isSelected && styles.selectedLetterOption,
                  ]}
                >
                  <Image
                    source={letter.thumbnail}
                    style={styles.letterThumbnail}
                    contentFit="fill"
                  />
                </Pressable>
              );
            })}
          </View>

          <View style={styles.skipButton}>
            <Button
              title="메시지 없이 보내기"
              onPress={() => onPressNext?.("", selectedLetterIndex)}
              width={148}
              height={38}
              backgroundColor={colors.primary[300]}
              textColor={colors.grayscale[100]}
              fontFamily="Pretendard-Medium"
              fontSize={13}
              borderRadius={12}
            />
          </View>

          {message.trim() && (
            <View style={styles.bottomContainer}>
              <Button
                title="다음"
                onPress={() =>
                  onPressNext?.(message.trim(), selectedLetterIndex)
                }
                width="52%"
                backgroundColor={colors.primary[500]}
                textColor={colors.grayscale[100]}
                fontFamily="Pretendard-Medium"
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <ReservationExitModal
        visible={isExitModalVisible}
        onClose={() => setIsExitModalVisible(false)}
        onExit={handleExit}
      />
    </SafeAreaView>
  );
};

export default MessageWriteScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  header: {
    height: 92,
    position: "relative",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 27,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[400],
  },

  closeButton: {
    position: "absolute",
    top: 30,
    right: 48,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  title: {
    marginTop: 20,
    color: colors.primary[700],
    fontSize: 24,
    fontFamily: "LeeSeoyun",
    lineHeight: 32,
    textAlign: "center",
  },

  letterSection: {
    marginTop: 58,
  },

  letterPreview: {
    width: "100%",
    aspectRatio: 1.8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.grayscale[500],
    borderRadius: 6,
    backgroundColor: colors.grayscale[100],
  },

  messageInput: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 64,
    paddingVertical: 40,
    color: colors.grayscale[800],
    fontSize: 13,
    fontFamily: "Pretendard-Regular",
    lineHeight: 20,
    textAlign: "center",
  },

  counter: {
    marginTop: 5,
    marginRight: 2,
    color: colors.grayscale[700],
    fontSize: 10,
    fontFamily: "Pretendard-Regular",
    textAlign: "right",
  },

  letterOptions: {
    marginTop: 46,
    flexDirection: "row",
    gap: 10,
  },

  letterOption: {
    flex: 1,
    aspectRatio: 1.65,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.grayscale[400],
    borderRadius: 8,
    backgroundColor: colors.grayscale[100],
  },

  selectedLetterOption: {
    borderWidth: 2,
    borderColor: colors.primary[300],
  },

  letterThumbnail: {
    width: "100%",
    height: "100%",
  },

  skipButton: {
    marginTop: 36,
    alignItems: "center",
  },

  bottomContainer: {
    marginTop: "auto",
    paddingTop: 30,
    paddingBottom: 28,
    alignItems: "center",
  },
});
