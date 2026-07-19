// BottomTabBar.tsx

import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

const TAB_WIDTH = 132;

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
    const animation = Animated.spring(indicatorPosition, {
      toValue: activeTab === "home" ? 0 : TAB_WIDTH,
      damping: 20,
      stiffness: 180,
      mass: 0.8,
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
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

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.tabButton}
        onPress={() => onChangeTab("home")}
      >
        <Ionicons
          name="home-outline"
          size={28}
          color={colors.grayscale[200]}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.tabButton}
        onPress={() => onChangeTab("archive")}
      >
        <Ionicons
          name="file-tray-outline"
          size={30}
          color={colors.grayscale[200]}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 72,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary[600],
    borderRadius: 36,

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
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    zIndex: 1,
  },

  activeIndicator: {
    position: "absolute",
    top: 8,
    left: 8,
    width: TAB_WIDTH,
    height: 56,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
    borderRadius: 28,
    backgroundColor: "rgba(253, 251, 240, 0.32)",
  },

  activeUnderline: {
    width: 15,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.grayscale[200],
  },

  icon: {
    transform: [{ translateY: -3 }],
  },
});
