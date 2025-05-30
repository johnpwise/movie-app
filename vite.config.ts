import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isCypress = process.env.CYPRESS === 'true';

export default defineConfig({
  plugins: [
    tailwindcss(), 
    !isCypress && reactRouter(), 
    tsconfigPaths()
  ].filter(Boolean),
});
