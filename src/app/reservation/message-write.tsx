import MessageWriteScreen from "@/screens/reservation/MessageWriteScreen";
import { useRouter } from "expo-router";

const MessageWriteRoute = () => {
  const router = useRouter();

  return (
    <MessageWriteScreen
      onPressBack={() => router.back()}
      onPressExit={() => router.dismissTo("/")}
    />
  );
};

export default MessageWriteRoute;
