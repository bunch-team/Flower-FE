import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

const BAR_WIDTH = 200;
const BAR_HEIGHT = 50;
const BAR_PADDING = 5;

const TAB_WIDTH = (BAR_WIDTH - BAR_PADDING * 2) / 2;
const TAB_HEIGHT = BAR_HEIGHT - BAR_PADDING * 2;

type TabType = "home" | "archive";

interface BottomTabBarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

const BottomTabBar = ({ activeTab, onChangeTab }: BottomTabBarProps) => {
  const indicatorPosition = useRef(
    new Animated.Value(activeTab === "home" ? 0 : TAB_WIDTH),
  ).current;

  useEffect(() => {
    Animated.spring(indicatorPosition, {
      toValue: activeTab === "home" ? 0 : TAB_WIDTH,
      damping: 20,
      stiffness: 180,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [activeTab, indicatorPosition]);

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.activeIndicator,
          { transform: [{ translateX: indicatorPosition }] },
        ]}
      >
        <View style={styles.activeUnderline} />
      </Animated.View>

      <Pressable
        style={({ pressed }) => [
          styles.tabButton,
          pressed && styles.pressedButton,
        ]}
        onPress={() => onChangeTab("home")}
      >
        <Ionicons
          name="home-outline"
          size={21}
          color={colors.grayscale[200]}
          style={styles.icon}
        />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.tabButton,
          pressed && styles.pressedButton,
        ]}
        onPress={() => onChangeTab("archive")}
      >
        <Ionicons
          name="file-tray-outline"
          size={21}
          color={colors.grayscale[200]}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    padding: BAR_PADDING,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: BAR_HEIGHT / 2,
    backgroundColor: colors.primary[600],

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  tabButton: {
    width: TAB_WIDTH,
    height: TAB_HEIGHT,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: TAB_HEIGHT / 2,
    zIndex: 1,
  },

  pressedButton: {
    opacity: 0.75,
  },

  activeIndicator: {
    position: "absolute",
    top: BAR_PADDING,
    left: BAR_PADDING,

    width: TAB_WIDTH,
    height: TAB_HEIGHT,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: TAB_HEIGHT / 2,
    backgroundColor: "rgba(253, 251, 240, 0.28)",
  },

  activeUnderline: {
    position: "absolute",
    bottom: 6,

    width: 13,
    height: 3,

    borderRadius: 2,
    backgroundColor: colors.grayscale[200],
  },

  icon: {
    transform: [{ translateY: -2 }],
  },
});
