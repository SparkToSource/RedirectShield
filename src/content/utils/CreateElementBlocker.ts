import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";

export class CreateElementBlocker {
  private readonly windowContext: WindowContext;
  private readonly remover: Remover;
  private readonly notifier: Notifier;

  constructor(windowContext: WindowContext, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.remover = remover;
    this.notifier = notifier;
  }

  /**
   * Replaces the element created with `document.createElement(tag)` with the element created
   * through `newElementBuilder`.
   * @param tag The tagName of the element that should be replaced.
   * @param newElementBuilder Function that builds the element that will serve as the replacement.
   */
  replaceCreateElement(tag: string, newElementBuilder: () => HTMLElement = this.defaultElementBuilder.bind(this)) {
    const originalCreateElement = this.windowContext.document.createElement.bind(this.windowContext.document);

    this.windowContext.document.createElement = (tagName: keyof HTMLElementTagNameMap, options?: ElementCreationOptions) => {
      if (tagName.toLowerCase() === tag) {
        this.remover.remove();
        this.notifier.notify(`Blocked creation of ${tag} element.`);

        const element = newElementBuilder();
        return element;
      }

      return originalCreateElement(tagName, options);
    };
  }

  private defaultElementBuilder() {
    const element = this.windowContext.document.createElement("style");
    element.type = "text/plain";

    this.windowContext.window.Object.defineProperty(element, 'type', {
      set(_) {
        // NOOP
      }
    });

    const originalSetAttribute = element.setAttribute;
    element.setAttribute = function (name, value) {
      if (name === 'type') {
        return;
      }

      return originalSetAttribute.call(this, name, value);
    };

    return element;
  }
}