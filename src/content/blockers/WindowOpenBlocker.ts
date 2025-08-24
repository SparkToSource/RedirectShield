import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { LinkValidator } from "../validators/LinkValidator";
import type { Blocker } from "./Blocker";

export class WindowOpenBlocker implements Blocker {
  private readonly windowContext: WindowContext;
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(windowContext: WindowContext, linkValidator: LinkValidator, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.linkValidator = linkValidator;
    this.notifier = notifier;
    this.remover = remover;
  }

  /**
   * Blocks all `window.open` calls that redirect to the user to an invalid URL.
   */
  block() {
    const windowOpenHandle = this.windowContext.window.open.bind(this.windowContext.window);

    this.windowContext.window.open = (url?: string | URL, ...params) => {
      if (this.linkValidator.isLinkValid(url)) {
        return windowOpenHandle(url, ...params);
      }

      this.remover.remove();
      this.notifier.notify(`Blocked window.open redirect to ${url}.`);
      return null;
    };
  }
}
