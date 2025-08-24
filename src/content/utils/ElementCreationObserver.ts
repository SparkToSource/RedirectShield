import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";

export class ElementCreationObserver {
  private readonly windowContext: WindowContext;
  private readonly remover: Remover;
  private readonly notifier: Notifier;

  constructor(windowContext: WindowContext, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.remover = remover;
    this.notifier = notifier;
  }

  /**
   * Listens to DOM changes and removes unwanted elements after they have been inserted.
   * 
   * Elements may be created through means that are not easily intercepted (such as `innerHTML`).
   * This function allows us to remove them after creation, but before the user interacts with them.
   * @param tag The tagName of the unwanted element.
   */
  removeCreatedElementsWithTag(tag: string) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          const tagName = (node as Element).tagName?.toLowerCase();

          if (tagName === tag) {
            this.remover.remove();
            this.notifier.notify(`Removed ${tag} after it had been inserted into the DOM.`);
          }
        });
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(this.windowContext.document.body, { childList: true, subtree: true });

      const shadowRoots = this.windowContext.getAllShadowRoots();
      for (const shadowRoot of shadowRoots) {
        observer.observe(shadowRoot, { childList: true, subtree: true });
      }
    });
  }
}