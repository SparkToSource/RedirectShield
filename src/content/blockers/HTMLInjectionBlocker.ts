import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { Blocker } from "./Blocker";

export class HTMLInjectionBlocker implements Blocker {
  private readonly windowContext: WindowContext;
  private readonly remover: Remover;
  private readonly notifier: Notifier;

  constructor(windowContext: WindowContext, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.remover = remover;
    this.notifier = notifier;
  }

  /**
   * Blocks creation of elements through setting `Element.innerHTML` or calling `Element.insertAdjacentHTML`.
   * 
   * However, because sites often use `innerHTML` for core functionality, this may break sites.
   */
  block() {
    this.blockInnerHTML();
    this.blockInsertAdjacentHTML();
  }

  private blockInnerHTML() {
    const original = this.windowContext.window.Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");

    if (!original || typeof original.get !== "function") {
      return;
    }

    const notify = this.notifier.notify.bind(this.notifier);
    const remove = this.remover.remove.bind(this.remover);

    this.windowContext.window.Object.defineProperty(this.windowContext.window.Element.prototype, "innerHTML", {
      set(value) {
        notify(`Blocked setting of innerHTML to ${value}`);
        remove();
      },
      get() {
        return original.get!.call(this);
      },
      configurable: true
    });
  }

  private blockInsertAdjacentHTML() {
    const notify = this.notifier.notify.bind(this.notifier);
    const remove = this.remover.remove.bind(this.remover);

    this.windowContext.window.Element.prototype.insertAdjacentHTML = function (_, html) {
      notify(`Blocked setting of blockInsertAdjacentHTML to ${html}`);
      remove();
    };
  }
}