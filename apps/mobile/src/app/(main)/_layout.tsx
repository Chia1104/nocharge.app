import { useQuery } from "@tanstack/react-query";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, View } from "react-native";

import { ThemeToggle } from "@/components/theme-toggle";
import { useAppTheme } from "@/contexts/app-theme.context";
import { authClient } from "@/libs/auth/client";
import { orpc } from "@/libs/orpc/client";

export default function Layout() {
  const { isDark } = useAppTheme();
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  const { t } = useTranslation();

  const { error: serverError } = useQuery(orpc.health.server.queryOptions());
  const { data: session } = authClient.useSession();

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
        <Stack.Protected guard={!serverError}>
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
            name="settings/index"
            options={{ headerTitle: t("routes.settings.title") }}
          />
          <Stack.Protected guard={!!session}>
            <Stack.Screen
              name="subscription/index"
              options={{ headerTitle: t("routes.subscription.title") }}
            />
          </Stack.Protected>
          <Stack.Protected guard={!session}>
            <Stack.Screen
              name="signin/index"
              options={{ headerTitle: t("auth.login") }}
            />
            <Stack.Screen
              name="signup/index"
              options={{ headerTitle: t("auth.signup") }}
            />
          </Stack.Protected>
        </Stack.Protected>
        <Stack.Protected guard={!!serverError}>
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
