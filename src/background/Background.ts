import browser from "webextension-polyfill";

export class Background {
  start() {
    browser.runtime.onMessage.addListener((message: any, sender: browser.Runtime.MessageSender) => {
      if (message.action === "updateBadge") {
        this.updateBadgeText(message.badgeCount, sender.tab?.id);
      }
    });
  }

  private updateBadgeText(badgeCount?: number, tabId?: number) {
    if (tabId === undefined || !badgeCount || typeof badgeCount !== 'number' || isNaN(badgeCount)) {
      return;
    }

    browser.action.setBadgeText({ text: badgeCount.toString(), tabId });
    browser.action.setBadgeBackgroundColor({ color: "#3f4146" });
  }
}

const background = new Background();
background.start();
