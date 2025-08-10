import type { LinkValidator } from "./LinkValidator";

export class HostnameLinkValidator implements LinkValidator {
  private readonly currentHost: string;

  constructor(currentHostName: string) {
    this.currentHost = this.normalizeHostname(currentHostName);
  }

  isLinkValid(link?: string | URL) {
    if (!link) {
      return false;
    }

    try {
      const url = new URL(link, location.href);
      const hostname = this.normalizeHostname(url.hostname);
      return hostname === this.currentHost;
    } catch {
      return false;
    }
  }

  private normalizeHostname(hostname: string) {
    return hostname.replace(/^www\./, '').toLowerCase();
  }
}
