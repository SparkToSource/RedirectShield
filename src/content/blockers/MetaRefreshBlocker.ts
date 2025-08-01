import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { Blocker } from "./Blocker";

export class MetaRefreshBlocker implements Blocker {
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(notifier: Notifier, remover: Remover) {
    this.notifier = notifier;
    this.remover = remover;
  }

  block() {
    const originalCreateElement = document.createElement.bind(document);

    document.createElement = (tagName: keyof HTMLElementTagNameMap, options?: ElementCreationOptions) => {
      if (tagName.toLowerCase() === 'meta') {
        this.remover.remove();
        this.notifier.notify("Blocked creation of meta element.");

        const element = originalCreateElement("script");
        element.type = "text/plain";
        return element;
      }

      return originalCreateElement(tagName, options);
    };
  }
}
