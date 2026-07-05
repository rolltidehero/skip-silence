import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  vite: () => ({ plugins: [tailwindcss()] }),
  manifest: ({ browser }) => ({
    name: "Skip Silence",
    description: "Skip silent parts in videos and podcasts automatically.",
    permissions: ["storage", "activeTab"],
    commands: {
      "toggle-enabled": {
        suggested_key: { default: "Ctrl+Shift+S" },
        description: "Enable or disable Skip Silence",
      },
    },
    web_accessible_resources: [
      {
        resources: ["volume-processor.js"],
        matches: ["<all_urls>"],
      },
    ],
    ...(browser === "firefox" && {
      browser_specific_settings: {
        gecko: { id: "{89595993-7775-4bd4-af57-44e57302d5ce}" },
      },
    }),
  }),
});
