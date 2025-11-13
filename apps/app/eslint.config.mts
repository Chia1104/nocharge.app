import { baseConfig } from "@nocharge/eslint-config/base";
import { reactConfig } from "@nocharge/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  baseConfig,
  reactConfig
);
