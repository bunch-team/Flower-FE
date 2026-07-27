import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const FAB_SIZE = 62;
const FAB_GAP = 15;
const ACTION_ROW_WIDTH = 180;

interface FABProps {
  onPressFirst: () => void;
  onPressSecond: () => void;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const FAB = ({
  onPressFirst,
  onPressSecond,
  open,
  onOpenChange,
}: FABProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const animation = useRef(new Animated.Value(0)).current;

  const toggleFAB = () => {
    const nextOpenState = !isOpen;

    if (open === undefined) {
      setInternalOpen(nextOpenState);
    }
    onOpenChange?.(nextOpenState);
  };

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isOpen ? 1 : 0,
      damping: 18,
      stiffness: 180,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [animation, isOpen]);

  const firstTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(FAB_SIZE + FAB_GAP)],
  });

  const secondTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(FAB_SIZE + FAB_GAP) * 2],
  });

  const actionScale = animation.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.6, 0.9, 1],
  });

  const actionOpacity = animation.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 0, 1],
  });

  const plusRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const handleFirstPress = () => {
    onPressFirst();
    toggleFAB();
  };

  const handleSecondPress = () => {
    onPressSecond();
    toggleFAB();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[
          styles.actionButtonWrapper,
          {
            opacity: actionOpacity,
            transform: [{ translateY: firstTranslateY }],
          },
        ]}
      >
        <View style={styles.actionLabelContainer}>
          <Text style={styles.actionLabel}>예약 목록</Text>
        </View>
        <Animated.View style={{ transform: [{ scale: actionScale }] }}>
          <Pressable
            onPress={handleSecondPress}
            style={({ pressed }) => [
              styles.button,
              styles.actionButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="gift-outline"
              size={24}
              color={colors.primary[600]}
            />
          </Pressable>
        </Animated.View>
      </Animated.View>

      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[
          styles.actionButtonWrapper,
          {
            opacity: actionOpacity,
            transform: [{ translateY: secondTranslateY }],
          },
        ]}
      >
        <View style={styles.actionLabelContainer}>
          <Text style={styles.actionLabel}>꽃다발 예약</Text>
        </View>
        <Animated.View style={{ transform: [{ scale: actionScale }] }}>
          <Pressable
            onPress={handleFirstPress}
            style={({ pressed }) => [
              styles.button,
              styles.actionButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color={colors.primary[600]}
            />
          </Pressable>
        </Animated.View>
      </Animated.View>

      <Pressable
        onPress={toggleFAB}
        style={({ pressed }) => [
          styles.button,
          styles.mainButton,
          pressed && styles.pressed,
        ]}
      >
        <Animated.View
          style={{
            transform: [{ rotate: plusRotation }],
          }}
        >
          <Ionicons name="add" size={30} color={colors.grayscale[200]} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    position: "relative",
  },

  actionButtonWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    width: ACTION_ROW_WIDTH,
    height: FAB_SIZE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },

  button: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[600],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 5,
  },

  mainButton: {
    zIndex: 3,
  },

  actionButton: {
    backgroundColor: colors.grayscale[200],
  },

  actionLabelContainer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.grayscale[200],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  actionLabel: {
    color: colors.primary[600],
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
  },

  pressed: {
    opacity: 0.8,
  },
});
