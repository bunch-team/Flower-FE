import BottomTabBar from "@/components/common/BottomTabBar";
import FAB from "@/components/common/FAB";
import Header from "@/components/common/Header";
import GreetingSection from "@/components/home/GreetingSection";
import HomeBanner from "@/components/home/HomeBanner";
import NextReservationCard from "@/components/home/NextReservationCard";
import TodayQuoteCard from "@/components/home/TodayQuoteCard";
import { colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeTab = "home" | "archive";
interface FabPosition {
  left: number;
  top: number;
}

const HomeScreen = () => {
  const router = useRouter();
  const fabAnchorRef = useRef<View>(null);
  const [activeTab, setActiveTab] = useState<HomeTab>("home");
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [fabPosition, setFabPosition] = useState<FabPosition | null>(null);
  const handleReservationPress = () => {
    console.log("꽃다발 예약");
  };
  const handleReservationListPress = () => {
    console.log("예약 목록");
  };
  const handleFabOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsFabOpen(false);
      return;
    }

    fabAnchorRef.current?.measureInWindow((left, top) => {
      setFabPosition({ left, top });
      setIsFabOpen(true);
    });
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar hidden />

      <Header
        style={styles.header}
        onMenuPress={() => router.push("/mypage")}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GreetingSection nickname="유진" />

        <HomeBanner
          state="arrived"
          onPress={() => {
            console.log("도착한 꽃다발 열기");
          }}
        />

        <TodayQuoteCard quote="좋은 일이 있을 거예요!" />

        <NextReservationCard
          reservation={{
            date: "2026.08.10",
            dDay: 10,
          }}
        />
      </ScrollView>

      <View style={styles.bottomTabContainer}>
        <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </View>

      {!isFabOpen && (
        <View
          ref={fabAnchorRef}
          collapsable={false}
          style={styles.fabContainer}
        >
          <FAB
            onPressFirst={handleReservationPress}
            onPressSecond={handleReservationListPress}
            onOpenChange={handleFabOpenChange}
          />
        </View>
      )}

      <Modal
        animationType="fade"
        navigationBarTranslucent
        onRequestClose={() => setIsFabOpen(false)}
        presentationStyle="overFullScreen"
        statusBarTranslucent
        transparent
        visible={isFabOpen}
      >
        <View style={styles.modalContainer}>
          <Pressable
            accessibilityLabel="빠른 메뉴 닫기"
            accessibilityRole="button"
            onPress={() => setIsFabOpen(false)}
            style={styles.modalBackdrop}
          />

          {fabPosition && (
            <View style={[styles.modalFabContainer, fabPosition]}>
              <FAB
                open
                onPressFirst={handleReservationPress}
                onPressSecond={handleReservationListPress}
                onOpenChange={setIsFabOpen}
              />
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  scrollView: {
    flex: 1,
  },

  header: {
    transform: [{ translateY: -22 }],
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 88,
  },

  modalContainer: {
    flex: 1,
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(46, 52, 61, 0.38)",
  },

  modalFabContainer: {
    position: "absolute",
    zIndex: 3,
  },

  bottomTabContainer: {
    position: "absolute",
    left: 20,
    right: 0,
    bottom: 30,
    height: 74,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 116,
    backgroundColor: colors.grayscale[200],
    zIndex: 1,
  },

  fabContainer: {
    position: "absolute",
    right: 58,
    bottom: 38,
    zIndex: 3,
  },
});
