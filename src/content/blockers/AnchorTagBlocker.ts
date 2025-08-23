import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import { ShadowRootFinder } from "../utils/ShadowRootFinder";
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
    this.blockClickFunction();
    this.attachClickListener(document);
    this.attachClickListenerOnShadowRootCreation();
    this.attachClickListenerToExistingShadowRoots();
  }

  private blockClickFunction() {
    const isLinkValid = this.linkValidator.isLinkValid.bind(this);
    const remove = this.remover.remove.bind(this.remover);
    const notify = this.notifier.notify.bind(this.notifier);

    const originalAnchorClick = HTMLAnchorElement.prototype.click;

    HTMLAnchorElement.prototype.click = function () {
      const href = this.getAttribute('href');

      if (isLinkValid(href)) {
        originalAnchorClick.call(this);
      } else {
        remove(this);
        notify(`Blocked link click to ${href}`);
      }
    };
  }

  private attachClickListener(root: Node) {
    root.addEventListener("click", (e) => {
      const anchor = this.findAnchorTag(e.target);

      if (anchor && !this.linkValidator.isLinkValid(anchor.href)) {
        e.preventDefault();
        this.remover.remove(anchor);
        this.notifier.notify(`Blocked link click to ${anchor.href}`);
      }
    }, true);
  }

  private attachClickListenerOnShadowRootCreation() {
    const originalAttachShadow = Element.prototype.attachShadow;
    const attachClickListener = this.attachClickListener.bind(this);

    Element.prototype.attachShadow = function (init: ShadowRootInit): ShadowRoot {
      const shadowRoot = originalAttachShadow.call(this, init);
      attachClickListener(shadowRoot);
      return shadowRoot;
    }
  }

  private attachClickListenerToExistingShadowRoots() {
    const shadowRoots = new ShadowRootFinder().findAllShadowRoots();

    for (const shadowRoot of shadowRoots) {
      this.attachClickListener(shadowRoot);
    }
  }

  private findAnchorTag(node: EventTarget | null): HTMLAnchorElement | null {
    if (node instanceof Element) {
      return node.closest("a");
    }

    return null;
  }
}
