import type { LinkValidator } from "../validators/LinkValidator";
import type { Notifier } from "../notifiers/Notifier";
import type { Blocker } from "./Blocker";

export class FormSubmitBlocker implements Blocker {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;

  constructor(linkValidator: LinkValidator, notifier: Notifier) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
  }

  block() {
    document.addEventListener("submit", (e) => {
      if (this.isFormElement(e.target) && !this.linkValidator.isLinkValid(e.target.action)) {
        e.preventDefault();
        e.target.remove();
        this.notifier.notify(e.target.action);
      }
    } /*, true*/);
  }

  private isFormElement(node: EventTarget | null): node is HTMLFormElement {
    return (
      node !== null &&
      node instanceof HTMLFormElement
    );
  }
}
