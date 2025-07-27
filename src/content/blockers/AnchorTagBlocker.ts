import type { LinkValidator } from "../validators/LinkValidator";
import type { Notifier } from "../notifiers/Notifier";
import type { Blocker } from "./Blocker";

export class AnchorTagBlocker implements Blocker {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;

  constructor(linkValidator: LinkValidator, notifier: Notifier) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
  }

  block() {
    document.addEventListener("click", (e) => {
      if (this.isAnchorTag(e.target) && !this.linkValidator.isLinkValid(e.target.href)) {
        e.preventDefault();
        e.target.remove();
        this.notifier.notify(e.target.href);
      }
    });
  }

  private isAnchorTag(node: EventTarget | null): node is HTMLAnchorElement {
    return (
      node !== null &&
      node instanceof HTMLAnchorElement
    );
  }
}
