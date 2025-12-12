import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";

import { ThemeToggle } from "@/components/theme-toggle";
import { useAppTheme } from "@/contexts/app-theme.context";

export default function Layout() {
  const { isDark } = useAppTheme();
  const { t } = useTranslation();
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  return (
    <View className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerTransparent: true,
          headerBlurEffect: isDark ? "dark" : "light",
          headerTintColor: themeColorForeground,
          headerStyle: {
            backgroundColor: Platform.select({
              ios: undefined,
              android: themeColorBackground,
            }),
          },
          headerRight: () => <ThemeToggle />,
          headerBackButtonDisplayMode: "generic",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          fullScreenGestureEnabled: isLiquidGlassAvailable() ? false : true,
          contentStyle: {
            backgroundColor: themeColorBackground,
          },
        }}>
        <Stack.Screen
          name="signin/index"
          options={{ headerTitle: t("auth.login") }}
        />
        <Stack.Screen
          name="signup/index"
          options={{ headerTitle: t("auth.signup") }}
        />
      </Stack>
    </View>
  );
}
