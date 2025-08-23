import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { Blocker } from "./Blocker";

export class IFrameBlocker implements Blocker {
  private readonly remover: Remover;
  private readonly notifier: Notifier;

  constructor(notifier: Notifier, remover: Remover) {
    this.remover = remover;
    this.notifier = notifier;
  }

  block() {
    this.blockIFrameCreationThroughCreateElement();
    this.removeIFrameAfterCreationThroughMutationObserver();
  }

  private blockIFrameCreationThroughCreateElement() {
    const originalCreateElement = document.createElement.bind(document);

    document.createElement = (tagName: keyof HTMLElementTagNameMap, options?: ElementCreationOptions) => {
      if (tagName.toLowerCase() === 'iframe') {
        this.remover.remove();
        this.notifier.notify("Blocked creation of iframe element.");

        alert("IFRAME INJECTED");

        const element = originalCreateElement("script");
        element.type = "text/plain";
        return element;
      }

      return originalCreateElement(tagName, options);
    };
  }

  private removeIFrameAfterCreationThroughMutationObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if ((node as Element).tagName.toLowerCase() === "iframe") {
            this.remover.remove();
            this.notifier.notify("Removed iframe after it had been injected.");
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}