import { browser, defineBackground } from "#imports";
import { settings, siteSettings, withDefaults } from "@/lib/settings";

/**
 * Only exists for the keyboard shortcut — everything else runs in the
 * content script and popup.
 */
export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command, tab) => {
    if (command !== "toggle-enabled") return;

    // Flip the site override if the current site has one, else the global
    // setting. activeTab (granted by the shortcut) exposes tab.url.
    const sites = await siteSettings.getValue();
    const host = tab?.url?.startsWith("http") ? new URL(tab.url).hostname : undefined;
    if (host && sites[host]) {
      const site = withDefaults(sites[host]);
      await siteSettings.setValue({
        ...sites,
        [host]: { ...site, enabled: !site.enabled },
      });
    } else {
      const global = withDefaults(await settings.getValue());
      await settings.setValue({ ...global, enabled: !global.enabled });
    }
  });
});
