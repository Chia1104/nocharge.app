import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "NoCharge.app",
  slug: "nocharge.app",
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
      backgroundColor: "#1F104A",
    },
    edgeToEdgeEnabled: true,
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
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
      "expo-splash-screen",
      {
        backgroundColor: "#E4E4E7",
        image: "./assets/nocharge.png",
        dark: {
          backgroundColor: "#18181B",
          image: "./assets/nocharge.png",
        },
      },
    ],
  ],
});
