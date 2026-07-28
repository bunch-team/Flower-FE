import LoginScreen from "@/screens/splash/Login";
import { useRouter } from "expo-router";

const LoginRoute = () => {
  const router = useRouter();
  const handleLogin = () => router.replace("/home");

  return (
    <LoginScreen
      onKakaoLogin={handleLogin}
      onNaverLogin={handleLogin}
    />
  );
};

export default LoginRoute;
