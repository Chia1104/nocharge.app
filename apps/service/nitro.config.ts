import { defineNitroConfig } from "nitro/config";
import { fileURLToPath } from "node:url";

export default defineNitroConfig({
  srcDir: "src",
  entry: "src/index.ts",
  modules: ["workflow/nitro"],
  typescript: {
    tsconfigPath: "./tsconfig.build.json",
  },
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },
});
