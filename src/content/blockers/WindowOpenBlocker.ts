import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { LinkValidator } from "../validators/LinkValidator";
import type { Blocker } from "./Blocker";

export class WindowOpenBlocker implements Blocker {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(linkValidator: LinkValidator, notifier: Notifier, remover: Remover) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
    this.remover = remover;
  }

  block() {
    const windowOpenHandle = window.open.bind(window);

    window.open = (url?: string | URL, ...params) => {
      if (this.linkValidator.isLinkValid(url)) {
        return windowOpenHandle(url, ...params);
      }

      this.remover.remove();
      this.notifier.notify(`Blocked window.open redirect to ${url}.`);
      return null;
    };
  }
}
