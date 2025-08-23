import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { Blocker } from "./Blocker";

export class HTMLInjectionBlocker implements Blocker {
  private readonly remover: Remover;
  private readonly notifier: Notifier;

  constructor(notifier: Notifier, remover: Remover) {
    this.remover = remover;
    this.notifier = notifier;
  }

  block() {
    this.blockInnerHTML();
    this.blockInsertAdjacentHTML();
  }

  private blockInnerHTML() {
    const original = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');

    if (!original || typeof original.set !== 'function' || typeof original.get !== 'function') {
      return;
    }

    Object.defineProperty(Element.prototype, 'innerHTML', {
      set(value) {
        alert(`[innerHTML] Set with value: ${value}`);
        return original.set!.call(this, value);
      },
      get() {
        return original.get!.call(this);
      },
      configurable: true
    });
  }

  private blockInsertAdjacentHTML() {
    const originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;

    Element.prototype.insertAdjacentHTML = function (position, html) {
      alert(`[insertAdjacentHTML] Called on position: ${position} with html: ${html}`);
      return originalInsertAdjacentHTML.call(this, position, html);
    };
  }
}