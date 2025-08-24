import browser from "webextension-polyfill";

export class Background {
  start() {
    browser.runtime.onMessage.addListener((message: any, sender: browser.Runtime.MessageSender) => {
      if (message.action === "setBadgeCount") {
        this.setBadgeCount(message.badgeCount, sender.tab?.id);
      }

      switch(message.action) {
        case "setBadgeCount":
          return this.setBadgeCount(message.badgeCount, sender.tab?.id);

        case "setBadgeState":
          return this.setBadgeState(message.isActive, sender.tab?.id);
      }
    });
  }

  private setBadgeCount(badgeCount?: number, tabId?: number) {
    if (tabId === undefined || !badgeCount || typeof badgeCount !== 'number' || isNaN(badgeCount)) {
      return;
    }

    const text = badgeCount > 99 ? "99+" : badgeCount.toString();
    this.setBadgeText(text, tabId);
  }

  private setBadgeState(isActive: boolean, tabId?: number) {
    if (tabId === undefined) {
      return;
    }

    if (isActive) {
      this.setBadgeText("✓", tabId);
    }
  }

  private setBadgeText(text: string, tabId: number) {
    browser.action.setBadgeText({ text, tabId });
    browser.action.setBadgeBackgroundColor({ color: "#3f4146" });
  }
}

const background = new Background();
background.start();
