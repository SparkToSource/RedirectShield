import browser from 'webextension-polyfill';

export class NetRequestBlocker {
  private readonly origin: string;
  private readonly tabId: number;

  constructor(origin: string, tabId: number) {
    this.origin = origin;
    this.tabId = tabId;
  }

  block() {
    browser.declarativeNetRequest.updateSessionRules({
      addRules: [
        {
          id: 1,
          action: { type: "block" },
          condition: {
            urlFilter: "|",
            excludedRequestDomains: [this.origin],
            resourceTypes: ["main_frame"],
            tabIds: [this.tabId],
          }
        }
      ],
      removeRuleIds: [1],
    });
  }
}
