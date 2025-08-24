import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { LinkValidator } from "../validators/LinkValidator";
import type { Blocker } from "./Blocker";

export class AnchorTagBlocker implements Blocker {
  private readonly windowContext: WindowContext;
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(windowContext: WindowContext, linkValidator: LinkValidator, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.linkValidator = linkValidator;
    this.notifier = notifier;
    this.remover = remover;
  }

  /**
   * Blocks `.click()` invocations and click events that trigger an anchor tag redirect.
   */
  block() {
    this.blockClickFunction();
    this.attachClickListener(this.windowContext.document);
    this.attachClickListenerToShadowRoots();
  }

  private blockClickFunction() {
    const isLinkValid = this.linkValidator.isLinkValid.bind(this);
    const remove = this.remover.remove.bind(this.remover);
    const notify = this.notifier.notify.bind(this.notifier);

    const originalAnchorClick = this.windowContext.window.HTMLAnchorElement.prototype.click;

    this.windowContext.window.HTMLAnchorElement.prototype.click = function () {
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

  private attachClickListenerToShadowRoots() {
    const attachClickListener = this.attachClickListener.bind(this);
    this.windowContext.injectFunctionIntoShadowRoots(attachClickListener);
  }

  private findAnchorTag(node: EventTarget | null): HTMLAnchorElement | null {
    if (this.targetIsElement(node)) {
      return node.closest("a");
    }

    return null;
  }

  private targetIsElement(node: EventTarget | null): node is Element {
    return !!node && (node as Node).nodeType === Node.ELEMENT_NODE;
  }
}
