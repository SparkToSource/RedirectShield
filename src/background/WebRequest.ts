import browser from 'webextension-polyfill';

export class WebRequest {
  start() {
    browser.webRequest.onBeforeRequest.addListener(
      this.handleEvent,
      { urls: ["<all_urls>"], types: ["main_frame"] },
      ["blocking"]
    );
  }

  handleEvent(event: browser.WebRequest.OnBeforeRequestDetailsType) {
    const current = event.initiator || event.documentUrl || "";
    const destination = event.url || "";

    const isValid = this.isLinkValid(current, destination);

    return { cancel: !isValid };
  }

  isLinkValid(current: string, destination: string) {
    try {
      const currentHost = new URL(current).hostname;
      const destinationHost = new URL(destination).hostname;

      return currentHost === destinationHost;
    } catch {
      return false;
    }
  }
}
