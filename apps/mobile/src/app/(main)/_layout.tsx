import { useQuery } from "@tanstack/react-query";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, View } from "react-native";

import { ThemeToggle } from "@/components/theme-toggle";
import { useAppTheme } from "@/contexts/app-theme.context";
import { orpc } from "@/libs/orpc/client";

export default function Layout() {
  const { isDark } = useAppTheme();
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  const { t } = useTranslation();

  const { data } = useQuery(orpc.health.server.queryOptions());

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
        <Stack.Protected guard={data?.status === "ok"}>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => (
                <Image
                  // eslint-disable-next-line @typescript-eslint/no-require-imports
                  source={require("~/assets/nocharge.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Screen
            name="subscription/index"
            options={{ headerTitle: t("routes.subscription.title") }}
          />
          <Stack.Screen
            name="settings/index"
            options={{ headerTitle: t("routes.settings.title") }}
          />
        </Stack.Protected>
        <Stack.Protected guard={data?.status !== "ok"}>
          <Stack.Screen name="error" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 24,
  },
});
