import Button from "@/components/common/Button";
import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StatusBar,
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
};

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: "나의 마음을 꽃으로 남겨보세요.",
    description: "전하고 싶은 마음을 담아보세요.",
    image: require("../../../assets/images/OnBoarding1.png"),
  },
  {
    id: 2,
    title: "잊을 즈음, 꽃이 도착해요.",
    description: "원하는 날짜를 정해 나에게 꽃을 보내보세요.",
    image: require("../../../assets/images/OnBoarding2.png"),
  },
  {
    id: 3,
    title: "소중한 순간을 간직하러 가볼까요?",
    image: require("../../../assets/images/OnBoarding3.png"),
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

  const handleNext = () => {
    if (isLastPage) {
      onComplete?.();
      return;
    }

    flatListRef.current?.scrollToOffset({
      offset: (currentIndex + 1) * pageWidth,
      animated: true,
    });
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / pageWidth);

    setCurrentIndex(Math.min(Math.max(index, 0), onboardingData.length - 1));
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={[styles.slide, { width: pageWidth }]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>

            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </View>

          <Image
            source={item.image}
            style={styles.image}
            contentFit="contain"
            accessibilityLabel="온보딩 꽃 이미지"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

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
          <Button
            title={isLastPage ? "시작하기" : "다음"}
            onPress={handleNext}
            height={54}
            backgroundColor={colors.primary[700]}
            textColor={colors.grayscale[200]}
            fontFamily="Pretendard-Medium"
            fontWeight="500"
            borderRadius={27}
          />
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
    backgroundColor: colors.grayscale[300],
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
    minHeight: 100,
    alignItems: "center",
  },

  title: {
    color: colors.primary[700],
    fontSize: 24,
    fontFamily: "MemomentKkukkukk",
    textAlign: "center",
    lineHeight: 28,
    marginTop: 40,
  },

  description: {
    marginTop: 10,
    color: colors.primary[500],
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },

  image: {
    width: "90%",
    height: 340,
    marginTop: 20,
  },

  bottomContainer: {
    paddingHorizontal: 44,
    paddingBottom: 34,
    alignItems: "center",
  },

  logoText: {
    marginBottom: 10,
    color: colors.primary[300],
    fontSize: 24,
    fontFamily: "MemomentKkukkukk",
  },
});
