import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: "chia1104",
  name: "NoCharge",
  slug: "nocharge",
  scheme: "nocharge",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/nocharge.png",
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.nocharge.app",
    supportsTablet: true,
    icon: {
      light: "./assets/nocharge.png",
      dark: "./assets/nocharge.png",
    },
  },
  android: {
    package: "com.nocharge.app",
    adaptiveIcon: {
      foregroundImage: "./assets/nocharge.png",
      backgroundColor: "#649CB0",
    },
    edgeToEdgeEnabled: true,
  },
  extra: {
    eas: {
      projectId: "1d0f711f-e55f-46dd-a43c-36dc295ed804",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
    reactCanary: true,
    reactCompiler: true,
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-web-browser",
    [
      "expo-localization",
      {
        supportedLocales: {
          ios: ["en", "zh_tW"],
          android: ["en", "zh_tW"],
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#649CB0",
        image: "./assets/nocharge.png",
        dark: {
          backgroundColor: "#154757",
          image: "./assets/nocharge.png",
        },
      },
    ],
  ],
});
