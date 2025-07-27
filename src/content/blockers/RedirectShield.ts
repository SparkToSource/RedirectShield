import type { Blocker } from "./Blocker";
import { MetaRefreshBlocker } from "./MetaRefreshBlocker";
import { WindowOpenBlocker } from "./WindowOpenBlocker";
import { FormSubmitBlocker } from "./FormSubmitBlocker";
import { AnchorTagBlocker } from "./AnchorTagBlocker";
import { WindowLocationChangeBlocker } from "./WindowLocationChangeBlocker";
import { HostnameLinkValidator } from "../validators/HostnameLinkValidator";
import { ConsoleNotifier } from "../notifiers/ConsoleNotifier";

export class RedirectShield {
  block() {
    const linkValidator = new HostnameLinkValidator(window.location.hostname);
    const notifier = new ConsoleNotifier();

    const shields: Blocker[] = [
      new MetaRefreshBlocker(linkValidator, notifier),
      new WindowOpenBlocker(linkValidator, notifier),
      new FormSubmitBlocker(linkValidator, notifier),
      new AnchorTagBlocker(linkValidator, notifier),
      new WindowLocationChangeBlocker(notifier),
    ];

    for (const shield of shields) {
      shield.block();
    }
  }
}
