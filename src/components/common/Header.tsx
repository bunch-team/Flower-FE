import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface HeaderProps {
  onMenuPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Header = ({ onMenuPress, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../../assets/images/FILM.svg")}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="FILM"
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="메뉴 열기"
        hitSlop={8}
        onPress={onMenuPress}
        style={({ pressed }) => [
          styles.menuButton,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.grayscale[200],
  },

  logo: {
    width: 50,
    height: 18,
  },

  menuButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  menuLine: {
    width: 30,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary[500],
  },

  pressed: {
    opacity: 0.6,
  },
});
