import Button from "@/components/common/Button";
import StepIndicator from "@/components/common/StepIndicator";
import ReservationConfirmSheet from "@/components/reservation/ReservationConfirmSheet";
import ReservationExitModal from "@/components/reservation/ReservationExitModal";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const getTodayString = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatTime = (date: Date) => {
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");

  const period = hour < 12 ? "오전" : "오후";
  const formattedHour = hour % 12 || 12;

  return `${period} ${formattedHour}:${minute}`;
};

const MINIMUM_DELIVERY_TIME = 24 * 60 * 60 * 1000;

interface ReservationDateScreenProps {
  flowerName?: string;
  letterMessage?: string;
  onPressBack?: () => void;
  onPressExit?: () => void;
  onPressReserve?: (date: string, time: Date) => void;
}

const ReservationDateScreen = ({
  flowerName = "선택한 꽃다발",
  letterMessage = "",
  onPressBack,
  onPressExit,
  onPressReserve,
}: ReservationDateScreenProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(() => {
    const initialTime = new Date();
    initialTime.setHours(10, 0, 0, 0);

    return initialTime;
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
  const [isConfirmSheetVisible, setIsConfirmSheetVisible] = useState(false);

  const today = getTodayString();

  const markedDates = useMemo(() => {
    if (!selectedDate) {
      return {};
    }

    return {
      [selectedDate]: {
        selected: true,
        selectedColor: colors.primary[400],
        selectedTextColor: colors.grayscale[100],
      },
    };
  }, [selectedDate]);

  const reservationDateTime = useMemo(() => {
    if (!selectedDate) {
      return null;
    }

    const [year, month, day] = selectedDate.split("-").map(Number);

    return new Date(
      year,
      month - 1,
      day,
      selectedTime.getHours(),
      selectedTime.getMinutes(),
    );
  }, [selectedDate, selectedTime]);

  const hasEnoughDeliveryTime =
    reservationDateTime !== null &&
    reservationDateTime.getTime() - Date.now() >= MINIMUM_DELIVERY_TIME;

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const changeTime = (unit: "hour" | "minute", amount: number) => {
    setSelectedTime((currentTime) => {
      const nextTime = new Date(currentTime);

      if (unit === "hour") {
        nextTime.setHours(nextTime.getHours() + amount);
      } else {
        nextTime.setMinutes(nextTime.getMinutes() + amount);
      }

      return nextTime;
    });
  };

  const changePeriod = (period: "am" | "pm") => {
    setSelectedTime((currentTime) => {
      const nextTime = new Date(currentTime);
      const currentHour = nextTime.getHours();

      if (period === "am" && currentHour >= 12) {
        nextTime.setHours(currentHour - 12);
      }

      if (period === "pm" && currentHour < 12) {
        nextTime.setHours(currentHour + 12);
      }

      return nextTime;
    });
  };

  const handleExit = () => {
    setIsExitModalVisible(false);
    onPressExit?.();
  };

  const handleReserve = () => {
    if (!selectedDate || !hasEnoughDeliveryTime) {
      return;
    }

    setIsConfirmSheetVisible(true);
  };

  const handleConfirmReservation = () => {
    setIsConfirmSheetVisible(false);
    onPressReserve?.(selectedDate, selectedTime);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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

          <StepIndicator currentStep={3} />

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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            꽃다발이 도착할{"\n"}날짜와 시간을 선택해주세요!
          </Text>
        </View>

        <View style={styles.calendarWrapper}>
          <Calendar
            current={today}
            minDate={today}
            monthFormat="yyyy년 M월"
            markedDates={markedDates}
            onDayPress={handleDayPress}
            enableSwipeMonths
            theme={calendarTheme}
          />
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="도착 시간 선택"
          activeOpacity={0.75}
          onPress={() => setShowTimePicker(true)}
          style={styles.timeField}
        >
          <Text style={styles.timeLabel}>도착 시간</Text>

          <View style={styles.timeValue}>
            <Ionicons
              name="time-outline"
              size={20}
              color={colors.grayscale[800]}
            />
            <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={colors.grayscale[700]}
            />
          </View>
        </TouchableOpacity>

        {selectedDate && !hasEnoughDeliveryTime && (
          <View style={styles.deliveryWarning}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#C56D62"
            />
            <Text style={styles.deliveryWarningText}>
              꽃다발 배달에는 24시간 이상 필요해요!
            </Text>
          </View>
        )}

        <View style={styles.bottomContainer}>
          <Button
            title="예약하기"
            disabled={!hasEnoughDeliveryTime}
            onPress={handleReserve}
            width="52%"
            backgroundColor={colors.primary[500]}
            textColor={colors.grayscale[100]}
            fontFamily="Pretendard-Medium"
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        onRequestClose={() => setShowTimePicker(false)}
        statusBarTranslucent
        transparent
        visible={showTimePicker}
      >
        <Pressable
          style={styles.timePickerOverlay}
          onPress={() => setShowTimePicker(false)}
        >
          <Pressable
            style={styles.timePickerCard}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.timePickerTitle}>도착 시간</Text>

            <View style={styles.periodButtons}>
              <Pressable
                onPress={() => changePeriod("am")}
                style={[
                  styles.periodButton,
                  selectedTime.getHours() < 12 && styles.selectedPeriodButton,
                ]}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedTime.getHours() < 12 && styles.selectedPeriodText,
                  ]}
                >
                  오전
                </Text>
              </Pressable>

              <Pressable
                onPress={() => changePeriod("pm")}
                style={[
                  styles.periodButton,
                  selectedTime.getHours() >= 12 && styles.selectedPeriodButton,
                ]}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedTime.getHours() >= 12 && styles.selectedPeriodText,
                  ]}
                >
                  오후
                </Text>
              </Pressable>
            </View>

            <View style={styles.timeControls}>
              <View style={styles.timeStepper}>
                <Pressable hitSlop={8} onPress={() => changeTime("hour", 1)}>
                  <Ionicons
                    name="chevron-up"
                    size={26}
                    color={colors.primary[500]}
                  />
                </Pressable>
                <Text style={styles.pickerNumber}>
                  {selectedTime.getHours() % 12 || 12}
                </Text>
                <Pressable hitSlop={8} onPress={() => changeTime("hour", -1)}>
                  <Ionicons
                    name="chevron-down"
                    size={26}
                    color={colors.primary[500]}
                  />
                </Pressable>
              </View>

              <Text style={styles.timeColon}>:</Text>

              <View style={styles.timeStepper}>
                <Pressable hitSlop={8} onPress={() => changeTime("minute", 10)}>
                  <Ionicons
                    name="chevron-up"
                    size={26}
                    color={colors.primary[500]}
                  />
                </Pressable>
                <Text style={styles.pickerNumber}>
                  {String(selectedTime.getMinutes()).padStart(2, "0")}
                </Text>
                <Pressable
                  hitSlop={8}
                  onPress={() => changeTime("minute", -10)}
                >
                  <Ionicons
                    name="chevron-down"
                    size={26}
                    color={colors.primary[500]}
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.completeButton}>
              <Button
                title="완료"
                onPress={() => setShowTimePicker(false)}
                width={130}
                height={42}
                backgroundColor={colors.primary[500]}
                textColor={colors.grayscale[100]}
                fontFamily="Pretendard-Medium"
                borderRadius={22}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <ReservationExitModal
        visible={isExitModalVisible}
        onClose={() => setIsExitModalVisible(false)}
        onExit={handleExit}
      />

      <ReservationConfirmSheet
        visible={isConfirmSheetVisible}
        flowerName={flowerName}
        reservationDate={selectedDate}
        arrivalTime={formatTime(selectedTime)}
        letterMessage={letterMessage || "작성한 메시지가 없어요."}
        onClose={() => setIsConfirmSheetVisible(false)}
        onEdit={() => setIsConfirmSheetVisible(false)}
        onConfirm={handleConfirmReservation}
      />
    </SafeAreaView>
  );
};

export default ReservationDateScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  container: {
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

  titleContainer: {
    marginTop: 16,
    alignItems: "center",
  },

  title: {
    color: colors.primary[700],
    fontSize: 24,
    fontFamily: "LeeSeoyun",
    lineHeight: 32,
    textAlign: "center",
  },

  calendarWrapper: {
    marginTop: 36,
    marginHorizontal: 34,
    padding: 4,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.point,
    borderRadius: 10,
    backgroundColor: colors.grayscale[100],
  },

  timeField: {
    height: 48,
    marginTop: 38,
    marginHorizontal: 28,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: colors.point,
    borderRadius: 9,
    backgroundColor: colors.grayscale[200],
  },

  timeLabel: {
    color: colors.grayscale[700],
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
  },

  timeValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  timeText: {
    color: colors.grayscale[800],
    fontSize: 15,
    fontFamily: "Pretendard-Regular",
  },

  deliveryWarning: {
    marginTop: 9,
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  deliveryWarningText: {
    color: "#C56D62",
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
  },

  bottomContainer: {
    marginTop: "auto",
    paddingTop: 30,
    paddingBottom: 28,
    alignItems: "center",
  },

  timePickerOverlay: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 30, 23, 0.45)",
  },

  timePickerCard: {
    width: "100%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.grayscale[200],
  },

  timePickerTitle: {
    color: colors.primary[700],
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
  },

  periodButtons: {
    marginTop: 20,
    flexDirection: "row",
    gap: 8,
  },

  periodButton: {
    flex: 1,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: colors.grayscale[300],
  },

  selectedPeriodButton: {
    backgroundColor: colors.primary[400],
  },

  periodText: {
    color: colors.grayscale[700],
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
  },

  selectedPeriodText: {
    color: colors.grayscale[100],
  },

  timeControls: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },

  timeStepper: {
    width: 64,
    alignItems: "center",
    gap: 8,
  },

  pickerNumber: {
    minWidth: 54,
    color: colors.grayscale[800],
    fontSize: 30,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
  },

  timeColon: {
    color: colors.grayscale[700],
    fontSize: 28,
    fontFamily: "Pretendard-SemiBold",
  },

  completeButton: {
    width: "100%",
    alignItems: "center",
  },
});

const calendarTheme = {
  calendarBackground: colors.grayscale[100],
  textSectionTitleColor: colors.grayscale[600],
  dayTextColor: colors.grayscale[800],
  selectedDayBackgroundColor: colors.primary[100],
  selectedDayTextColor: colors.primary[600],
  todayTextColor: colors.primary[500],
  monthTextColor: colors.primary[700],
  arrowColor: colors.primary[400],
  textDisabledColor: colors.grayscale[500],
  textDayFontFamily: "Pretendard-Regular",
  textMonthFontFamily: "Pretendard-SemiBold",
  textDayHeaderFontFamily: "Pretendard-Regular",
  textDayFontSize: 12,
  textMonthFontSize: 14,
  textDayHeaderFontSize: 10,
  weekVerticalMargin: 6,
};
