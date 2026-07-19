import { colors } from "@/constants/colors";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: TextStyle["fontFamily"];
  fontSize?: TextStyle["fontSize"];
  fontWeight?: TextStyle["fontWeight"];
  borderRadius?: number;
  disabled?: boolean;
}

const Button = ({
  title,
  onPress,
  width = "100%",
  height = 56,
  backgroundColor = colors.grayscale[200],
  textColor = colors.grayscale[800],
  fontFamily,
  fontSize = 16,
  fontWeight = "600",
  borderRadius = 28,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        { width, height, backgroundColor, borderRadius },
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontFamily,
          fontSize,
          fontWeight,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
