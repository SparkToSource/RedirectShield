import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { LinkValidator } from "../validators/LinkValidator";
import type { Blocker } from "./Blocker";

export class FormSubmitBlocker implements Blocker {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(linkValidator: LinkValidator, notifier: Notifier, remover: Remover) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
    this.remover = remover;
  }

  block() {
    document.addEventListener("submit", (e) => {
      if (this.isFormElement(e.target) && !this.linkValidator.isLinkValid(e.target.action)) {
        e.preventDefault();
        this.remover.remove(e.target);
        this.notifier.notify(`Blocked form submit to ${e.target.action}`);
      }
    });
  }

  private isFormElement(node: EventTarget | null): node is HTMLFormElement {
    return (
      node !== null &&
      node instanceof HTMLFormElement
    );
  }
}
