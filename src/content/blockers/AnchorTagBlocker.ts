import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { LinkValidator } from "../validators/LinkValidator";
import type { Blocker } from "./Blocker";

export class AnchorTagBlocker implements Blocker {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(linkValidator: LinkValidator, notifier: Notifier, remover: Remover) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
    this.remover = remover;
  }

  block() {
    document.addEventListener("click", (e) => {
      if (this.isAnchorTag(e.target) && !this.linkValidator.isLinkValid(e.target.href)) {
        e.preventDefault();
        this.remover.remove(e.target);
        this.notifier.notify(`Blocked link click to ${e.target.href}`);
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
