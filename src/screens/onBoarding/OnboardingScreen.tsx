import Button from "@/components/common/Button";
import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

type OnboardingItem = {
  id: number;
  title: string;
  description?: string;
  image: number;
  textAreaHeight: number;
  accessibilityLabel: string;
};

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: "나의 마음을 꽃으로 남겨보세요.",
    description: "전하고 싶은 마음을 담아보세요.",
    image: require("../../../assets/images/OnBoarding1.png"),
    textAreaHeight: 110,
    accessibilityLabel: "편지를 들고 있는 햄스터",
  },
  {
    id: 2,
    title: "잊을 즈음, 꽃이 도착해요.",
    description: "원하는 날짜를 정해 나에게 꽃을 보내보세요.",
    image: require("../../../assets/images/OnBoarding2.png"),
    textAreaHeight: 118,
    accessibilityLabel: "선물 상자 안에 들어 있는 햄스터",
  },
  {
    id: 3,
    title: "소중한 순간을 간직하러 가볼까요?",
    image: require("../../../assets/images/OnBoarding3.png"),
    textAreaHeight: 80,
    accessibilityLabel: "분홍색 리본 선물 상자",
  },
];

interface OnboardingScreenProps {
  onComplete?: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const pageWidth = width - 28;

  const isLastPage = currentIndex === onboardingData.length - 1;

  const scrollToPage = (index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * pageWidth,
      animated: true,
    });
  };

  const handleNext = () => {
    if (isLastPage) {
      onComplete?.();
      return;
    }

    scrollToPage(currentIndex + 1);
  };

  const handlePrevious = () => scrollToPage(currentIndex - 1);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / pageWidth);

    setCurrentIndex(Math.min(Math.max(index, 0), onboardingData.length - 1));
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={[styles.slide, { width: pageWidth }]}>
        <View style={styles.content}>
          <View style={[styles.textContainer, { height: item.textAreaHeight }]}>
            <Text style={styles.title}>{item.title}</Text>

            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </View>

          <Image
            source={item.image}
            style={[styles.image, item.id === 1 && styles.firstImage]}
            contentFit="contain"
            accessibilityLabel={item.accessibilityLabel}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.pagination}>
          {onboardingData.map((item, index) => (
            <View
              key={item.id}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
            />
          ))}
        </View>

        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleScrollEnd}
        />

        <View style={styles.bottomContainer}>
          <View style={styles.buttonSpacer} />

          {currentIndex === 1 ? (
            <View style={styles.buttonRow}>
              <Button
                title="이전"
                onPress={handlePrevious}
                width="48%"
                height={54}
                backgroundColor={colors.grayscale[300]}
                textColor={colors.primary[700]}
                fontFamily="Pretendard-Medium"
                fontWeight="500"
                borderRadius={27}
              />
              <Button
                title="다음"
                onPress={handleNext}
                width="48%"
                height={54}
                backgroundColor={colors.primary[500]}
                textColor={colors.grayscale[200]}
                fontFamily="Pretendard-Medium"
                fontWeight="500"
                borderRadius={27}
              />
            </View>
          ) : (
            <Button
              title={isLastPage ? "시작하기" : "다음"}
              onPress={handleNext}
              width="52%"
              height={54}
              backgroundColor={colors.primary[500]}
              textColor={colors.grayscale[200]}
              fontFamily="Pretendard-Medium"
              fontWeight="500"
              borderRadius={27}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  container: {
    flex: 1,
    marginHorizontal: 14,
    overflow: "hidden",
  },

  pagination: {
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 34,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.grayscale[400],
    marginTop: 18,
  },

  activeDot: {
    backgroundColor: colors.primary[500],
  },

  slide: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 28,
  },

  textContainer: {
    alignItems: "center",
  },

  title: {
    color: colors.primary[700],
    fontSize: 22,
    fontFamily: "MemomentKkukkukk",
    textAlign: "center",
    lineHeight: 28,
    marginTop: 38,
  },

  description: {
    marginTop: 18,
    color: colors.primary[500],
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
    lineHeight: 20,
  },

  image: {
    width: "76%",
    height: 300,
    marginTop: 28,
  },

  firstImage: {
    width: "72%",
  },

  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 34,
    alignItems: "center",
  },

  buttonSpacer: {
    height: 24,
  },

  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});
