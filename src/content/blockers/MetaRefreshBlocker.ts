import type { LinkValidator } from "../validators/LinkValidator";
import type { Notifier } from "../notifiers/Notifier";
import type { Blocker } from "./Blocker";

export class MetaRefreshBlocker implements Blocker {
  private readonly linkValidator: LinkValidator;
  private readonly notifier: Notifier;

  constructor(linkValidator: LinkValidator, notifier: Notifier) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
  }

  block() {
    this.removeExistingMetaRefreshes();
    this.listenAndRemoveAddedMetaRefreshes();
  }

  private removeExistingMetaRefreshes() {
    const metaRefreshers = document.querySelectorAll<HTMLMetaElement>('meta[http-equiv="refresh"]');

    for (const metaRefresh of metaRefreshers) {
      this.removeInvalidMetaRefresh(metaRefresh);
    }
  }

  private listenAndRemoveAddedMetaRefreshes() {
    const observer = new MutationObserver((mutationsList) => {
      const addedMetaRefreshes = mutationsList
        .flatMap(mutation => [...mutation.addedNodes])
        .filter(node => this.isMetaRefresh(node));

      for (const metaRefresh of addedMetaRefreshes) {
        this.removeInvalidMetaRefresh(metaRefresh);
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });
  }

  private removeInvalidMetaRefresh(metaRefresh: HTMLMetaElement) {
    const content = metaRefresh.getAttribute("content") ?? "";
    const contentParts = content.split(";");

    const urlPart = contentParts.find(e => e.trim().toLowerCase().startsWith("url"));

    if (urlPart) {
      const url = urlPart.split("=")[1];

      if (this.linkValidator.isLinkValid(url)) {
        return;
      }
    }

    metaRefresh.remove();
    this.notifier.notify(urlPart);
  };

  private isMetaRefresh(node: Node): node is HTMLMetaElement {
    return (
      node instanceof HTMLMetaElement &&
      node.getAttribute("http-equiv")?.toLowerCase() === "refresh"
    );
  };
}
