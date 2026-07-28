import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Animated,
  Easing,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface BouquetMemory {
  id: string;
  date: string;
  title: string;
  meaning: string;
  note: string;
  image: ImageSourcePropType;
  accent: string;
}

const BOUQUET_MEMORIES: BouquetMemory[] = [
  {
    id: "tulip",
    date: "2026. 07. 12",
    title: "분홍 튤립",
    meaning: "다정한 응원",
    note: "오늘도 충분히 잘하고 있어.\n서두르지 말고, 너만의 속도로 피어나길.",
    image: require("../../../assets/images/deliver/tulipBunch.png"),
    accent: "#E9C5BE",
  },
  {
    id: "sunflower",
    date: "2026. 05. 28",
    title: "해바라기",
    meaning: "빛나는 용기",
    note: "햇살을 향해 고개를 드는 꽃처럼,\n오늘의 너도 조금 더 씩씩하기를.",
    image: require("../../../assets/images/deliver/sunflowerBunch.png"),
    accent: "#E8D29A",
  },
  {
    id: "lavender",
    date: "2026. 03. 09",
    title: "라벤더",
    meaning: "고요한 위로",
    note: "잠시 멈춰 쉬어가도 괜찮아.\n평온한 향기가 네 곁에 오래 머물기를.",
    image: require("../../../assets/images/deliver/lavendarBunch.png"),
    accent: "#CEC5DC",
  },
  {
    id: "lily",
    date: "2026. 01. 01",
    title: "백합",
    meaning: "새로운 시작",
    note: "새하얀 첫 장 위에 작은 소망을 적어.\n올해도 너다운 날들로 채워가기를.",
    image: require("../../../assets/images/deliver/lilyBunch.png"),
    accent: "#C8D3C0",
  },
];

const ArchiveScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageOpacity = useRef(new Animated.Value(1)).current;
  const pageShift = useRef(new Animated.Value(0)).current;
  const memory = BOUQUET_MEMORIES[currentPage];

  const movePage = (direction: -1 | 1) => {
    Animated.parallel([
      Animated.timing(pageOpacity, {
        toValue: 0,
        duration: 130,
        useNativeDriver: true,
      }),
      Animated.timing(pageShift, {
        toValue: direction * -14,
        duration: 130,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) return;

      setCurrentPage(
        (page) =>
          (page + direction + BOUQUET_MEMORIES.length) %
          BOUQUET_MEMORIES.length,
      );
      pageShift.setValue(direction * 14);

      Animated.parallel([
        Animated.timing(pageOpacity, {
          toValue: 1,
          duration: 230,
          useNativeDriver: true,
        }),
        Animated.timing(pageShift, {
          toValue: 0,
          duration: 230,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heading}>
        <Text style={styles.title}>나의 꽃다발 앨범</Text>
      </View>

      <View style={styles.album}>
        <Image
          accessibilityLabel="앨범 링 제본"
          contentFit="contain"
          source={require("../../../assets/images/diaryRing.png")}
          style={styles.diaryRing}
        />

        <View style={styles.albumPaper}>
          <Animated.View
            style={{
              opacity: pageOpacity,
              transform: [{ translateX: pageShift }],
            }}
          >
            <View style={styles.scrapbookArea}>
              <View
                pointerEvents="none"
                style={[styles.tape, { backgroundColor: memory.accent }]}
              />

              <View style={styles.photoFrame}>
                <Image
                  accessibilityLabel={`${memory.title} 꽃다발`}
                  contentFit="cover"
                  source={memory.image}
                  style={styles.bouquetImage}
                  transition={180}
                />
              </View>

              <View
                style={[styles.dateSticker, { borderColor: memory.accent }]}
              >
                <Text style={styles.date}>{memory.date}</Text>
                <Text style={styles.flowerName}>{memory.title}</Text>
                <Text style={styles.flowerMeaning}>
                  꽃말 · {memory.meaning}
                </Text>
              </View>
            </View>

            <View style={styles.letter}>
              <Text style={styles.letterText}>{memory.note}</Text>
              <View style={styles.signatureRow}>
                <View style={styles.signatureLine} />
                <Text style={styles.signature}>from. 과거의 나</Text>
              </View>
            </View>
          </Animated.View>

          <View style={styles.pageControls}>
            <Pressable
              accessibilityLabel="이전 꽃다발"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => movePage(-1)}
              style={({ pressed }) => [
                styles.pageButton,
                pressed && styles.pageButtonPressed,
              ]}
            >
              <Ionicons
                color={colors.primary[500]}
                name="arrow-back"
                size={18}
              />
            </Pressable>

            <View style={styles.pageDots}>
              {BOUQUET_MEMORIES.map((item, page) => (
                <View
                  key={item.id}
                  style={[
                    styles.pageDot,
                    page === currentPage && [
                      styles.pageDotActive,
                      { backgroundColor: memory.accent },
                    ],
                  ]}
                />
              ))}
            </View>

            <Pressable
              accessibilityLabel="다음 꽃다발"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => movePage(1)}
              style={({ pressed }) => [
                styles.pageButton,
                pressed && styles.pageButtonPressed,
              ]}
            >
              <Ionicons
                color={colors.primary[500]}
                name="arrow-forward"
                size={18}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ArchiveScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 152,
  },

  heading: {
    paddingHorizontal: 5,
    alignItems: "center",
  },

  title: {
    marginTop: 0,
    color: colors.primary[600],
    fontFamily: "LeeSeoyun",
    fontSize: 24,
  },

  album: {
    marginTop: 16,
    paddingTop: 22,
  },

  diaryRing: {
    position: "absolute",
    top: 0,
    left: 13,
    right: 13,
    zIndex: 3,
    height: 48,
  },

  albumPaper: {
    paddingTop: 31,
    paddingHorizontal: 19,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: colors.grayscale[400],
    borderRadius: 3,
    backgroundColor: colors.grayscale[100],
    shadowColor: colors.grayscale[800],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },

  paperHeader: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageLabel: {
    color: colors.grayscale[600],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 8,
    letterSpacing: 1.8,
  },

  scrapbookArea: {
    minHeight: 300,
    justifyContent: "center",
  },

  tape: {
    position: "absolute",
    top: 0,
    left: "29%",
    zIndex: 2,
    width: "36%",
    height: 23,
    opacity: 0.72,
    transform: [{ rotate: "-2deg" }],
  },

  photoFrame: {
    width: "74%",
    padding: 8,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: colors.grayscale[800],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 3,
    transform: [{ rotate: "-1.8deg" }],
  },

  bouquetImage: {
    width: "100%",
    aspectRatio: 0.9,
    backgroundColor: colors.grayscale[300],
  },

  photoCaption: {
    marginTop: 8,
    color: colors.grayscale[700],
    fontFamily: "LeeSeoyun",
    fontSize: 13,
    textAlign: "center",
  },

  dateSticker: {
    position: "absolute",
    right: 0,
    bottom: 16,
    width: "45%",
    padding: 11,
    borderWidth: 1.5,
    borderRadius: 2,
    backgroundColor: "#FFF9EC",
    shadowColor: colors.grayscale[800],
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    transform: [{ rotate: "2deg" }],
  },

  date: {
    color: colors.grayscale[600],
    fontFamily: "Pretendard-Medium",
    fontSize: 9,
  },

  flowerName: {
    marginTop: 6,
    color: colors.primary[600],
    fontFamily: "LeeSeoyun",
    fontSize: 20,
  },

  flowerMeaning: {
    marginTop: 4,
    color: colors.grayscale[700],
    fontFamily: "Pretendard-Regular",
    fontSize: 9,
  },

  letter: {
    marginTop: 10,
    padding: 14,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grayscale[400],
    backgroundColor: "rgba(247, 242, 228, 0.48)",
  },

  letterTitle: {
    color: colors.primary[600],
    fontFamily: "LeeSeoyun",
    fontSize: 17,
  },

  letterText: {
    marginTop: 9,
    color: colors.grayscale[700],
    fontFamily: "LeeSeoyun",
    fontSize: 14,
    lineHeight: 21,
  },

  signatureRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  signatureLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grayscale[400],
  },

  signature: {
    color: colors.grayscale[600],
    fontFamily: "LeeSeoyun",
    fontSize: 11,
  },

  pageControls: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageButton: {
    width: 38,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale[200],
  },

  pageButtonPressed: {
    opacity: 0.55,
    transform: [{ scale: 0.94 }],
  },

  pageDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  pageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayscale[500],
  },

  pageDotActive: {
    width: 19,
  },
});
