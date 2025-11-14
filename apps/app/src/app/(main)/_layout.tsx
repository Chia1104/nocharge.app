import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Image, Platform, StyleSheet, View } from "react-native";

import { ThemeToggle } from "@/components/theme-toggle";
import { useAppTheme } from "@/contexts/app-theme.context";

export default function Layout() {
  const { isDark } = useAppTheme();
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
          name="index"
          options={{
            headerTitle: () => (
              <Image
                source={require("~/assets/nocharge.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Stack.Screen
          name="subscription/index"
          options={{ headerTitle: "Subscription" }}
        />
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
