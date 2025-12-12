import { baseConfig } from "@chiastack/eslint/base";
import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig
) as Linter.Config;
