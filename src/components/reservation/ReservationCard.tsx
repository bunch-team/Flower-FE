import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ReservationCardProps {
  bouquetName: string;
  deliveryStatus: string;
  deliveryDate: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
}

const ReservationCard = ({
  bouquetName,
  deliveryStatus,
  deliveryDate,
  imageSource,
  onPress,
}: ReservationCardProps) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${bouquetName}, ${deliveryStatus}, ${deliveryDate} 배송 예정`}
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image
        source={imageSource}
        style={styles.bouquetImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {bouquetName}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={22}
              color={colors.grayscale[700]}
            />
          </View>

          <Text style={styles.status}>{deliveryStatus}</Text>
        </View>

        <View style={styles.dateRow}>
          <Ionicons name="calendar" size={22} color={colors.grayscale[600]} />

          <Text style={styles.dateText}>{deliveryDate} 배송 예정</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReservationCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 132,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.grayscale[400],
    borderRadius: 12,
    flexDirection: "row",
    backgroundColor: colors.grayscale[100],

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },

  bouquetImage: {
    width: 116,
    height: 116,
    borderRadius: 10,
    backgroundColor: colors.grayscale[300],
  },

  content: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 8,
    justifyContent: "space-between",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[800],
    lineHeight: 24,
  },

  status: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[700],
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dateText: {
    flexShrink: 1,
    fontSize: 13,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[800],
  },
});
