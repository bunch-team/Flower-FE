import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface NicknameContextValue {
  nickname: string;
  setNickname: (nickname: string) => void;
}

const NicknameContext = createContext<NicknameContextValue | null>(null);

export const NicknameProvider = ({ children }: PropsWithChildren) => {
  const [nickname, setNickname] = useState("배유진");
  const value = useMemo(() => ({ nickname, setNickname }), [nickname]);

  return (
    <NicknameContext.Provider value={value}>
      {children}
    </NicknameContext.Provider>
  );
};

export const useNickname = () => {
  const context = useContext(NicknameContext);

  if (!context) {
    throw new Error("useNickname must be used within NicknameProvider");
  }

  return context;
};
