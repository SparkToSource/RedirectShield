import type { Blocker } from "./blockers/Blocker";
import type { Notifier } from "./notifiers/Notifier";
import type { LinkValidator } from "./validators/LinkValidator";
import { AnchorTagBlocker } from "./blockers/AnchorTagBlocker";
import { FormSubmitBlocker } from "./blockers/FormSubmitBlocker";
import { MetaRefreshBlocker } from "./blockers/MetaRefreshBlocker";
import { WindowLocationChangeBlocker } from "./blockers/WindowLocationChangeBlocker";
import { ConsoleNotifier } from "./notifiers/ConsoleNotifier";
import { HostnameLinkValidator } from "./validators/HostnameLinkValidator";

class Content {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;

  constructor() {
    this.linkValidator = new HostnameLinkValidator(window.location.hostname);
    this.notifier = new ConsoleNotifier();
  }
  
  start() {
    this.startBlocking();
    this.startBlockingOutsideOfSandbox();
  }

  private startBlocking() {
    const shields: Blocker[] = [
      new MetaRefreshBlocker(this.linkValidator, this.notifier),
      new FormSubmitBlocker(this.linkValidator, this.notifier),
      new AnchorTagBlocker(this.linkValidator, this.notifier),
      new WindowLocationChangeBlocker(this.notifier),
    ];

    for (const shield of shields) {
      shield.block();
    }
  }

  private startBlockingOutsideOfSandbox() {
    const script = document.createElement("script");
    script.textContent = `(/* COMPILED_CODE */)();`;
    document.documentElement.append(script);
    script.remove();
  }
}

const content = new Content();
content.start();
