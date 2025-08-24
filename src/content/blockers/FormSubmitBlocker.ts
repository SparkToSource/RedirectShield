import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { LinkValidator } from "../validators/LinkValidator";
import type { Blocker } from "./Blocker";

export class FormSubmitBlocker implements Blocker {
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
   * Blocks `.submit()` invocations and submit events that trigger a redirect.
   */
  block() {
    this.blockSubmitFunction();
    this.attachFormSubmitListener(this.windowContext.document);
    this.attachFormSubmitListenerToShadowRoots();
  }

  private blockSubmitFunction() {
    const isLinkValid = this.linkValidator.isLinkValid.bind(this);
    const remove = this.remover.remove.bind(this.remover);
    const notify = this.notifier.notify.bind(this.notifier);

    const originalFormSubmit = this.windowContext.window.HTMLFormElement.prototype.submit;

    this.windowContext.window.HTMLFormElement.prototype.submit = function () {
      const href = this.action;

      if (isLinkValid(href)) {
        originalFormSubmit.call(this);
      } else {
        remove(this);
        notify(`Blocked form submit to ${href}`);
      }
    };
  }

  private attachFormSubmitListener(root: Node) {
    root.addEventListener("submit", (e) => {
      if (this.isFormElement(e.target) && !this.linkValidator.isLinkValid(e.target.action)) {
        e.preventDefault();
        this.remover.remove(e.target);
        this.notifier.notify(`Blocked form submit to ${e.target.action}`);
      }
    }, true);
  }

  private attachFormSubmitListenerToShadowRoots() {
    const attachFormSubmitListener = this.attachFormSubmitListener.bind(this);
    this.windowContext.injectFunctionIntoShadowRoots(attachFormSubmitListener);
  }

  private isFormElement(node: EventTarget | null): node is HTMLFormElement {
    return (
      !!node &&
      (node as Element).tagName === "FORM"
    );
  }
}
