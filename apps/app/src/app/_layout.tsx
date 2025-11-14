import { Slot } from "expo-router";

import { RootProvider } from "../components/root-provider";
import "../styles.css";

export default function RootLayout() {
  return (
    <RootProvider>
      <Slot />
    </RootProvider>
  );
}
