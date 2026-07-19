import BottomTabBar from "@/components/common/BottomTabBar";
import { useState } from "react";

export default function Index() {
  const [activeTab, setActiveTab] = useState<"home" | "archive">("home");

  return (
    <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
  );
}
