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
              color={colors.primary[600]}
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
    minHeight: 172,
    padding: 10,
    borderWidth: 1.5,
    borderColor: colors.grayscale[400],
    borderRadius: 14,
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
    width: 174,
    height: 174,
    borderRadius: 13,
    backgroundColor: colors.primary[100],
  },

  content: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 20,
    paddingRight: 20,
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
    fontSize: 20,
    fontFamily: "Pretendard-Medium",
    color: colors.primary[600],
    lineHeight: 28,
  },

  status: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[600],
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dateText: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[700],
  },
});
