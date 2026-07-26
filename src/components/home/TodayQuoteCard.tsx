import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface TodayQuoteCardProps {
  quote: string;
}

const TodayQuoteCard = ({ quote }: TodayQuoteCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>오늘의 한마디</Text>

      <View style={styles.card}>
        <Text style={styles.quote}>{quote}</Text>
      </View>
    </View>
  );
};

export default TodayQuoteCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },

  label: {
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[500],
  },

  card: {
    minHeight: 72,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: colors.primary[100],
    justifyContent: "center",
    alignItems: "center",
  },

  quote: {
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
    lineHeight: 22,
    textAlign: "center",
    color: colors.primary[600],
  },
});
