import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import "../styles.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#649CB0",
          },
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#09090B" : "#FFFFFF",
          },
        }}
      />
      <StatusBar />
    </>
  );
}
