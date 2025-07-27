import type { LinkValidator } from "../validators/LinkValidator";
import type { Notifier } from "../notifiers/Notifier";
import type { Blocker } from "./Blocker";

export class WindowOpenBlocker implements Blocker {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;

  constructor(linkValidator: LinkValidator, notifier: Notifier) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
  }

  block() {
    const windowOpenHandle = window.open;

    window.open = (url?: string | URL, ...params) => {
      if (this.linkValidator.isLinkValid(url)) {
        return windowOpenHandle(url, ...params);
      }

      this.notifier.notify(url);
      return null;
    };
  }
}
