import { WindowOpenBlocker } from "./blockers/WindowOpenBlocker";
import { ConsoleNotifier } from "./notifiers/ConsoleNotifier";
import { HostnameLinkValidator } from "./validators/HostnameLinkValidator";

export class InjectedContent {
  start() {
    const linkValidator = new HostnameLinkValidator(window.location.hostname);
    const notifier = new ConsoleNotifier();

    const windowOpenBlocker = new WindowOpenBlocker(linkValidator, notifier);
    windowOpenBlocker.block();
  }
}

const injectedBlockers = new InjectedContent();
injectedBlockers.start();
