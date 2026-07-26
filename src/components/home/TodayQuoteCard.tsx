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
    width: "90%",
    marginTop: 16,
    alignSelf: "center",
    alignItems: "center",
  },

  label: {
    width: "100%",
    paddingLeft: 4,
    marginBottom: 6,
    fontSize: 14,
    fontFamily: "LeeSeoyun",
    color: colors.grayscale[600],
    textAlign: "left",
  },

  card: {
    width: "100%",
    minHeight: 78,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 13,
    backgroundColor: "#E7ECE2",
    justifyContent: "center",
    alignItems: "center",
  },

  quote: {
    fontSize: 18,
    fontFamily: "LeeSeoyun",
    lineHeight: 24,
    textAlign: "center",
    color: colors.primary[600],
  },
});
