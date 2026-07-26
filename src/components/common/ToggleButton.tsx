import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, ViewStyle } from "react-native";

interface ToggleButtonProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const TOGGLE_WIDTH = 52;
const TOGGLE_HEIGHT = 28;
const CIRCLE_SIZE = 22;
const PADDING = 3;

const ToggleButton = ({
  value,
  onValueChange,
  disabled = false,
  style,
}: ToggleButtonProps) => {
  const translateX = useRef(
    new Animated.Value(value ? TOGGLE_WIDTH - CIRCLE_SIZE - PADDING * 2 : 0),
  ).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? TOGGLE_WIDTH - CIRCLE_SIZE - PADDING * 2 : 0,
      useNativeDriver: true,
      friction: 7,
      tension: 90,
    }).start();
  }, [value, translateX]);

  const handlePress = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        value ? styles.activeContainer : styles.inactiveContainer,
        disabled && styles.disabledContainer,
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    padding: PADDING,
    borderRadius: TOGGLE_HEIGHT / 2,
    justifyContent: "center",
  },

  activeContainer: {
    backgroundColor: "#3498DB",
  },

  inactiveContainer: {
    backgroundColor: "#D9D9D9",
  },

  disabledContainer: {
    opacity: 0.45,
  },

  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});
