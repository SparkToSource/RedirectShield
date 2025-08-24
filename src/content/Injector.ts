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
      this.notifyUserOfActivation();
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

    const isHostnameInBlackList = this.isHostnameBlackListed(settings.blackList);
    if (settings.blockMode === "blacklist" && isHostnameInBlackList) {
      return true;
    }

    return false;
  }

  private isHostnameBlackListed(blackList: SettingsData["blackList"]) {
    if (blackList[location.hostname]) {
      return true;
    }

    if (location.hostname.startsWith("www.")) {
      return blackList[location.hostname.slice(4)];
    }

    return blackList[`www.${location.hostname}`];
  }

  private listenForEvents() {
    window.addEventListener("setBadgeCount", (e: CustomEventInit<any>) => {
      browser.runtime.sendMessage({ action: "setBadgeCount", badgeCount: e.detail.count });
    });
  }

  private notifyUserOfActivation() {
    browser.runtime.sendMessage({ action: "setBadgeState", isActive: true });
  }
}

const injector = new Injector();
injector.start();
