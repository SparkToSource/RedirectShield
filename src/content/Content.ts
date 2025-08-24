import type { SettingsData } from "../repositories/SettingsRepository";
import { RedirectShield } from "./RedirectShield";
import { WindowContext } from "./context/WindowContext";

class Content {
  start() {
    console.log("[RedirectShield] - Starting.");
    const settings = this.getSettings();

    const topWindowContext = new WindowContext(window, document);
    topWindowContext.runAndPropagateToChildWindowContexts((windowContext) => {
      this.startInWindowContext(windowContext, settings);
    });
  }

  private startInWindowContext(windowContext: WindowContext, settings: SettingsData) {
    const redirectShield = new RedirectShield(windowContext, settings);
    redirectShield.start();
  }

  private getSettings(): SettingsData {
    const currentScript = document.currentScript;

    if (!currentScript || !currentScript.dataset.settings) {
      return {} as SettingsData;
    }

    const settings = JSON.parse(currentScript.dataset.settings);
    return settings;
  }
}

const content = new Content();
content.start();
