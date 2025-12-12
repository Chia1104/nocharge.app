import { StatusBar } from "expo-status-bar";

import { ScreenScrollView } from "@/components/screen-scroll-view";
import { useAppTheme } from "@/contexts/app-theme.context";

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  const { isDark } = useAppTheme();

  return (
    <ScreenScrollView>
      {children}
      <StatusBar style={isDark ? "light" : "dark"} />
    </ScreenScrollView>
  );
};
