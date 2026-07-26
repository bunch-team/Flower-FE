import ToggleButton from "@/components/common/ToggleButton";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyPageScreen = () => {
  const router = useRouter();

  const [noticeEnabled, setNoticeEnabled] = useState(true);
  const [deliveryEnabled, setDeliveryEnabled] = useState(true);

  const handleEditNickname = () => {
    router.push("/mypage/edit-nickname");
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠어요?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: () => {
          console.log("로그아웃");
        },
      },
    ]);
  };

  const handleWithdraw = () => {
    Alert.alert(
      "회원탈퇴",
      "탈퇴하면 얘약 및 보관함 데이터가 모두 삭제됩니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "탈퇴하기",
          style: "destructive",
          onPress: () => {
            console.log("회원탈퇴");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={30} color={colors.primary[600]} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>MY</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.nicknameContainer}>
            <Text style={styles.nickname}>배유진</Text>
            <Text style={styles.nicknameSuffix}> 님</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditNickname}
            activeOpacity={0.7}
          >
            <Text style={styles.editButtonText}>닉네임 수정</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={styles.editButtonText.color}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>준비중</Text>

            <View style={styles.statusCountContainer}>
              <Text style={styles.statusCount}>3</Text>
              <Text style={styles.statusUnit}>개</Text>
            </View>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>배송 완료</Text>

            <View style={styles.statusCountContainer}>
              <Text style={styles.statusCount}>8</Text>
              <Text style={styles.statusUnit}>개</Text>
            </View>
          </View>
        </View>

        <View style={styles.notificationSection}>
          <Text style={styles.sectionTitle}>알림</Text>

          <View style={styles.sectionDivider} />

          <View style={styles.notificationRow}>
            <ToggleButton
              value={noticeEnabled}
              onValueChange={setNoticeEnabled}
            />

            <Text style={styles.notificationText}>공지 / 업데이트 알림</Text>
          </View>

          <View style={styles.notificationRow}>
            <ToggleButton
              value={deliveryEnabled}
              onValueChange={setDeliveryEnabled}
            />

            <Text style={styles.notificationText}>꽃 배송 알림</Text>
          </View>

          <View style={[styles.sectionDivider, styles.bottomDivider]} />
        </View>

        <View style={styles.accountMenu}>
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleWithdraw} activeOpacity={0.7}>
            <Text style={styles.withdrawText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayscale[200],
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.grayscale[200],
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerTitle: {
    marginLeft: 8,
    fontSize: 27,
    fontFamily: "LeeSeoyun",
    color: colors.primary[600],
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 28,
  },

  nicknameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  nickname: {
    fontSize: 32,
    fontFamily: "LeeSeoyun",
    color: colors.grayscale[700],
  },

  nicknameSuffix: {
    fontSize: 26,
    fontFamily: "Pretendard-SemiBold",
    color: colors.primary[600],
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  editButtonText: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: colors.primary[500],
  },

  statusCard: {
    minHeight: 132,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.grayscale[400],
    borderRadius: 14,
    backgroundColor: colors.grayscale[100],

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.13,
    shadowRadius: 3.5,
    elevation: 4,
  },

  statusItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  statusLabel: {
    alignItems: "flex-start",
    marginLeft: 12,
    marginBottom: 12,
    fontSize: 19,
    fontFamily: "Pretendard-Regular",
    color: colors.grayscale[700],
  },

  statusCountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  statusCount: {
    fontSize: 50,
    fontFamily: "LeeSeoyun",
    lineHeight: 56,
    color: colors.primary[700],
  },

  statusUnit: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.grayscale[700],
    fontFamily: "Pretendard-Regular",
  },

  verticalDivider: {
    width: 2,
    height: 82,
    backgroundColor: colors.grayscale[400],
  },

  notificationSection: {
    marginTop: 74,
    paddingHorizontal: 24,
  },

  sectionTitle: {
    marginBottom: 14,
    fontSize: 20,
    fontFamily: "Pretendard-Medium",
    color: colors.primary[700],
  },

  sectionDivider: {
    height: 2,
    backgroundColor: colors.grayscale[400],
  },

  notificationRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },

  notificationText: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: colors.grayscale[800],
  },

  bottomDivider: {
    marginTop: 10,
  },

  accountMenu: {
    alignItems: "flex-end",
    marginTop: 72,
    paddingRight: 16,
    gap: 18,
  },

  logoutText: {
    fontSize: 17,
    fontFamily: "Pretendard-Medium",
    color: "#1698F5",
  },

  withdrawText: {
    fontSize: 17,
    fontFamily: "Pretendard-Medium",
    color: "#FF3131",
  },
});
