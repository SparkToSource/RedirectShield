import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        background: "src/background/background.ts",
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/popup/popup.html",
          dest: "",
        },
      ],
    }),
  ],
});
