import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface GreetingSectionProps {
  nickname: string;
}

const GreetingSection = ({ nickname }: GreetingSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        안녕하세요, <Text style={styles.name}>{nickname}</Text>
      </Text>
    </View>
  );
};

export default GreetingSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 24,
  },

  text: {
    fontSize: 24,
    fontFamily: "LeeSeoyun",
    color: colors.primary[600],
  },

  name: {
    fontSize: 24,
    fontFamily: "LeeSeoyun",
  },
});
