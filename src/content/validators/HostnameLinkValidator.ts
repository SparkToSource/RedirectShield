import type { LinkValidator } from "./LinkValidator";

export class HostnameLinkValidator implements LinkValidator {
  private readonly currentHost: string;

  constructor(currentHostName: string) {
    this.currentHost = currentHostName;
  }

  isLinkValid(link?: string | URL) {
    if (!link) {
      return false;
    }

    try {
      return new URL(link).hostname === this.currentHost;
    } catch {
      return false;
    }
  }
}
