import { Slot } from "expo-router";

import "@/styles.css";
import "@/translations";

import { RootProvider } from "../components/root-provider";

export default function RootLayout() {
  return (
    <RootProvider>
      <Slot />
    </RootProvider>
  );
}
