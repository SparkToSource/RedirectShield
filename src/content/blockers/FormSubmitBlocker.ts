import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import { ShadowRootFinder } from "../utils/ShadowRootFinder";
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
    this.blockSubmitFunction();
    this.attachFormSubmitListener(document);
    this.attachFormSubmitListenerOnShadowRootCreation();
    this.attachFormSubmitListenerToExistingShadowRoots();
  }

  private blockSubmitFunction() {
    const isLinkValid = this.linkValidator.isLinkValid.bind(this);
    const remove = this.remover.remove.bind(this.remover);
    const notify = this.notifier.notify.bind(this.notifier);

    const originalFormSubmit = HTMLFormElement.prototype.submit;

    HTMLFormElement.prototype.submit = function () {
      const href = this.action;

      if (isLinkValid(href)) {
        originalFormSubmit.call(this);
      } else {
        remove(this);
        notify(`Blocked form submit to ${href}`);
      }
    };
  }

  private attachFormSubmitListenerOnShadowRootCreation() {
    const originalAttachShadow = Element.prototype.attachShadow;
    const attachFormSubmitListener = this.attachFormSubmitListener.bind(this);

    Element.prototype.attachShadow = function (init: ShadowRootInit): ShadowRoot {
      const shadowRoot = originalAttachShadow.call(this, init);
      attachFormSubmitListener(shadowRoot);
      return shadowRoot;
    }
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

  private attachFormSubmitListenerToExistingShadowRoots() {
    const shadowRoots = new ShadowRootFinder().findAllShadowRoots();

    for (const shadowRoot of shadowRoots) {
      this.attachFormSubmitListener(shadowRoot);
    }
  }

  private isFormElement(node: EventTarget | null): node is HTMLFormElement {
    return (
      node !== null &&
      node instanceof HTMLFormElement
    );
  }
}
