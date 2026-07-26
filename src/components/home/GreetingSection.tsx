import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface GreetingSectionProps {
  nickname: string;
}

const GreetingSection = ({ nickname }: GreetingSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        안녕하세요, <Text style={styles.name}>{nickname}님</Text>
      </Text>
    </View>
  );
};

export default GreetingSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: -22,
    marginLeft: 16,
    zIndex: 1,
    transform: [{ translateY: 16 }],
  },

  text: {
    fontSize: 20,
    fontFamily: "LeeSeoyun",
    color: colors.primary[600],
  },

  name: {
    fontSize: 20,
    fontFamily: "LeeSeoyun",
  },
});
