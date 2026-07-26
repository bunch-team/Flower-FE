import Button from "@/components/common/Button";
import { colors } from "@/constants/colors";
import { Image, StyleSheet, Text, View } from "react-native";

interface Reservation {
  date: string;
  dDay: number;
}

interface NextReservationCardProps {
  reservation?: Reservation;
  onPressReservation?: () => void;
}

const NextReservationCard = ({
  reservation,
  onPressReservation,
}: NextReservationCardProps) => {
  const hasReservation = !!reservation;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>다음 예약</Text>

      <View style={styles.card}>
        {hasReservation ? (
          <View style={styles.reservationContent}>
            <Image
              source={require("../../../assets/images/splash.png")}
              style={styles.bouquetImage}
              resizeMode="contain"
            />

            <Text style={styles.dateText}>
              {reservation.date} (D-{reservation.dDay})
            </Text>
          </View>
        ) : (
          <View style={styles.emptyContent}>
            <Text style={styles.emptyTitle}>아직 예약한 꽃다발이 없어요.</Text>

            <Text style={styles.emptyDescription}>
              소중한 순간을 위해 꽃다발을 예약해보세요!
            </Text>

            <View style={styles.buttonWrapper}>
              <Button
                title="예약하기 →"
                onPress={() => onPressReservation?.()}
                width={100}
                height={32}
                backgroundColor={colors.primary[500]}
                textColor={colors.grayscale[100]}
                fontFamily="Pretendard-Medium"
                fontSize={12}
                borderRadius={999}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default NextReservationCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 24,
  },

  sectionTitle: {
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "LeeSeoyun",
    color: colors.grayscale[500],
  },

  card: {
    minHeight: 92,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary[100],
    backgroundColor: colors.grayscale[100],
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  reservationContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  bouquetImage: {
    width: 54,
    height: 54,
    marginRight: 16,
  },

  dateText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    color: colors.primary[500],
  },

  emptyContent: {
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[600],
  },

  emptyDescription: {
    marginTop: 4,
    fontSize: 11,
    color: colors.grayscale[400],
  },

  buttonWrapper: {
    marginTop: 10,
    alignSelf: "center",
  },
});
