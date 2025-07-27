import browser from 'webextension-polyfill';

export class NetRequestBlocker {
  attempt1() {
    browser.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: 1,
          action: { type: "block" },
          condition: {
            domainType: "thirdParty",
            resourceTypes: ["main_frame"]
          }
        }
      ],
      removeRuleIds: [1]
    });
  }

  async attempt2() {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });

    if (tabs.length === 0 || !tabs[0].url) {
      return;
    }

    try {
      const url = new URL(tabs[0].url);

      console.log(url);

      browser.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "|",
              excludedRequestDomains: [url.origin],
              resourceTypes: ["main_frame"]
            }
          }
        ],
        removeRuleIds: [1]
      });
    } catch (err) {
      console.error("Failed to parse URL or update rules:", err);
    }
  }
}
