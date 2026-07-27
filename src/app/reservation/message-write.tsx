import MessageWriteScreen from "@/screens/reservation/MessageWriteScreen";
import { useLocalSearchParams, useRouter } from "expo-router";

const MessageWriteRoute = () => {
  const router = useRouter();
  const { flower } = useLocalSearchParams<{ flower?: string }>();

  return (
    <MessageWriteScreen
      onPressBack={() => router.back()}
      onPressNext={(message) =>
        router.push({
          pathname: "/reservation/date",
          params: {
            flower: flower ?? "",
            message,
          },
        })
      }
      onPressExit={() => router.dismissTo("/home")}
    />
  );
};

export default MessageWriteRoute;
