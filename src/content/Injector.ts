import browser from "webextension-polyfill";
import { SettingsRepository, type SettingsData } from "../repositories/SettingsRepository";

class Injector {
  private readonly settingsRepository: SettingsRepository;

  constructor() {
    this.settingsRepository = new SettingsRepository();
  }

  async start() {
    const settings = await this.settingsRepository.get();
    const shouldInject = this.shouldInject(settings);

    if (shouldInject) {
      this.injectScript(settings);
      this.listenForEvents();
    }
  }

  private injectScript(settings: SettingsData) {
    const script = document.createElement("script");
    script.src = browser.runtime.getURL("content.bundle.js");
    script.dataset.settings = JSON.stringify(settings);

    document.documentElement.append(script);
    script.remove();
  }

  private shouldInject(settings: SettingsData) {
    if (settings.blockMode === "all") {
      return true;
    }

    if (settings.blockMode === "blacklist" && settings.blackList[window.location.hostname]) {
      return true;
    }

    return false;
  }

  private listenForEvents() {
    window.addEventListener("updateBadge", (e: CustomEventInit<any>) => {
      browser.runtime.sendMessage({ action: "updateBadge", badgeCount: e.detail.count });
    });
  }
}

const injector = new Injector();
injector.start();
