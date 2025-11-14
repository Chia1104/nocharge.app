import { HeroUINativeProvider } from "heroui-native";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

import { AppThemeProvider } from "../contexts/app-theme.context";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppThemeProvider>
        <HeroUINativeProvider
          config={{
            textProps: {
              allowFontScaling: false,
            },
          }}>
          {children}
        </HeroUINativeProvider>
      </AppThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
