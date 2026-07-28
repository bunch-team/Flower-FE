import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface BouquetMemory {
  id: string;
  year: string;
  monthDay: string;
  weekday: string;
  title: string;
  note: string;
  image: ImageSourcePropType;
}

const BOUQUET_MEMORIES: BouquetMemory[] = [
  {
    id: "tulip",
    year: "2026.",
    monthDay: "07. 12",
    weekday: "일요일",
    title: "분홍 튤립",
    note: "오늘의 나에게,\n다정한 응원을.",
    image: require("../../../assets/images/deliver/tulipBunch.png"),
  },
  {
    id: "sunflower",
    year: "2026.",
    monthDay: "05. 28",
    weekday: "목요일",
    title: "해바라기",
    note: "햇살처럼 씩씩했던\n여름의 시작.",
    image: require("../../../assets/images/deliver/sunflowerBunch.png"),
  },
  {
    id: "lavender",
    year: "2026.",
    monthDay: "03. 09",
    weekday: "월요일",
    title: "라벤더",
    note: "천천히 쉬어가도\n괜찮아.",
    image: require("../../../assets/images/deliver/lavendarBunch.png"),
  },
  {
    id: "lily",
    year: "2026.",
    monthDay: "01. 01",
    weekday: "목요일",
    title: "백합",
    note: "새로운 마음으로\n시작한 첫 페이지.",
    image: require("../../../assets/images/deliver/lilyBunch.png"),
  },
];

const MEMORIES_PER_PAGE = 2;
const PAGE_COUNT = Math.ceil(BOUQUET_MEMORIES.length / MEMORIES_PER_PAGE);
const RINGS = Array.from({ length: 8 }, (_, index) => index);

const ArchiveScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const visibleMemories = BOUQUET_MEMORIES.slice(
    currentPage * MEMORIES_PER_PAGE,
    (currentPage + 1) * MEMORIES_PER_PAGE,
  );

  const movePage = (direction: -1 | 1) => {
    setCurrentPage((page) => (page + direction + PAGE_COUNT) % PAGE_COUNT);
  };

  return (
    <View style={styles.notebook}>
      <View pointerEvents="none" style={styles.bindingLine} />
      <View pointerEvents="none" style={styles.rings}>
        {RINGS.map((ring) => (
          <View key={ring} style={styles.ring}>
            <View style={styles.ringHole} />
          </View>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>나의 꽃다발 모음</Text>

        <View style={styles.toolbar}>
          <Text style={styles.count}>
            총 {BOUQUET_MEMORIES.length}개의 마음
          </Text>
          <View style={styles.sort}>
            <Text style={styles.sortText}>최신순</Text>
            <Ionicons
              color={colors.primary[600]}
              name="chevron-down"
              size={13}
            />
          </View>
        </View>

        <View style={styles.pageControls}>
          <Pressable
            accessibilityLabel="이전 꽃다발 기록"
            accessibilityRole="button"
            hitSlop={10}
            onPress={() => movePage(-1)}
            style={({ pressed }) => [
              styles.pageButton,
              pressed && styles.pageButtonPressed,
            ]}
          >
            <Ionicons color={colors.point} name="chevron-back" size={24} />
          </Pressable>

          <View style={styles.pageDots}>
            {Array.from({ length: PAGE_COUNT }, (_, page) => (
              <View
                key={page}
                style={[
                  styles.pageDot,
                  page === currentPage && styles.pageDotActive,
                ]}
              />
            ))}
          </View>

          <Pressable
            accessibilityLabel="다음 꽃다발 기록"
            accessibilityRole="button"
            hitSlop={10}
            onPress={() => movePage(1)}
            style={({ pressed }) => [
              styles.pageButton,
              pressed && styles.pageButtonPressed,
            ]}
          >
            <Ionicons color={colors.point} name="chevron-forward" size={24} />
          </Pressable>
        </View>

        <View style={styles.memoryList}>
          {visibleMemories.map((memory) => (
            <View key={memory.id} style={styles.memoryCard}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateText}>{memory.year}</Text>
                <Text style={styles.dateText}>{memory.monthDay}</Text>
                <Text style={styles.weekday}>{memory.weekday}</Text>
              </View>

              <View style={styles.keepsakeColumn}>
                <View style={styles.bouquetKeepsake}>
                  <View style={styles.photoFrame}>
                    <Image
                      accessibilityLabel={`${memory.title} 꽃다발`}
                      contentFit="cover"
                      source={memory.image}
                      style={styles.bouquetImage}
                      transition={180}
                    />
                  </View>
                  <Text style={styles.flowerName}>{memory.title}</Text>
                </View>

                <View style={styles.letterKeepsake}>
                  <View style={styles.letterPaper}>
                    <Ionicons
                      color={colors.point}
                      name="mail-open-outline"
                      size={20}
                    />
                    <Text numberOfLines={3} style={styles.letterText}>
                      {memory.note}
                    </Text>
                    <View style={styles.letterLine} />
                    <View style={[styles.letterLine, styles.shortLetterLine]} />
                  </View>
                  <Text style={styles.letterLabel}>그날의 편지</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.pageNumber}>
          {currentPage + 1} / {PAGE_COUNT}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ArchiveScreen;

const styles = StyleSheet.create({
  notebook: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  bindingLine: {
    position: "absolute",
    top: 18,
    bottom: 0,
    left: 38,
    width: 2,
    borderRadius: 1,
    backgroundColor: colors.primary[600],
    opacity: 0.72,
  },

  rings: {
    position: "absolute",
    top: 36,
    bottom: 126,
    left: 10,
    zIndex: 2,
    justifyContent: "space-around",
  },

  ring: {
    width: 38,
    height: 14,
    borderWidth: 2,
    borderRightWidth: 0,
    borderColor: colors.grayscale[600],
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  ringHole: {
    position: "absolute",
    top: 3,
    right: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayscale[600],
  },

  content: {
    paddingTop: 8,
    paddingRight: 18,
    paddingBottom: 152,
    paddingLeft: 62,
  },

  title: {
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 29,
    textAlign: "center",
  },

  toolbar: {
    minHeight: 34,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  count: {
    color: colors.grayscale[600],
    fontFamily: "Pretendard-Regular",
    fontSize: 10,
  },

  sort: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },

  sortText: {
    color: colors.primary[600],
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
  },

  pageControls: {
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageButton: {
    width: 34,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  pageButtonPressed: {
    opacity: 0.5,
    transform: [{ scale: 0.92 }],
  },

  pageDots: {
    flexDirection: "row",
    gap: 6,
  },

  pageDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.grayscale[500],
  },

  pageDotActive: {
    width: 16,
    backgroundColor: colors.primary[400],
  },

  memoryList: {
    gap: 16,
  },

  memoryCard: {
    minHeight: 196,
    borderWidth: 1.5,
    borderColor: colors.primary[200],
    flexDirection: "row",
    backgroundColor: "rgba(220, 230, 233, 0.16)",
  },

  dateColumn: {
    width: 76,
    paddingTop: 22,
    paddingHorizontal: 8,
    borderRightWidth: 1.5,
    borderRightColor: colors.primary[200],
    alignItems: "center",
  },

  dateText: {
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 17,
    lineHeight: 22,
  },

  weekday: {
    marginTop: 5,
    color: colors.grayscale[700],
    fontFamily: "LeeSeoyun",
    fontSize: 14,
  },

  keepsakeColumn: {
    flex: 1,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  bouquetKeepsake: {
    flex: 1,
    alignItems: "center",
  },

  photoFrame: {
    width: "100%",
    padding: 5,
    paddingBottom: 12,
    backgroundColor: colors.grayscale[100],
    shadowColor: colors.grayscale[800],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
    transform: [{ rotate: "-1.5deg" }],
  },

  bouquetImage: {
    width: "100%",
    aspectRatio: 0.78,
    backgroundColor: colors.grayscale[300],
  },

  flowerName: {
    marginTop: 7,
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 15,
  },

  letterKeepsake: {
    flex: 1.05,
    alignItems: "center",
  },

  letterPaper: {
    width: "100%",
    aspectRatio: 0.88,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grayscale[500],
    borderRadius: 3,
    backgroundColor: "#FFF9EC",
    shadowColor: colors.grayscale[800],
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 1,
    transform: [{ rotate: "1.8deg" }],
  },

  letterText: {
    marginTop: 6,
    color: colors.grayscale[700],
    fontFamily: "LeeSeoyun",
    fontSize: 11,
    lineHeight: 14,
  },

  letterLine: {
    height: 1,
    marginTop: 7,
    backgroundColor: colors.grayscale[400],
  },

  shortLetterLine: {
    width: "68%",
  },

  letterLabel: {
    marginTop: 7,
    color: colors.primary[700],
    fontFamily: "LeeSeoyun",
    fontSize: 15,
  },

  pageNumber: {
    marginTop: 16,
    color: colors.grayscale[600],
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
    letterSpacing: 1,
    textAlign: "center",
  },
});
