import type { LinkValidator } from "./LinkValidator";

export class OriginLinkValidator implements LinkValidator {
  private readonly currentOrigin: string;

  constructor(currentOrigin: string) {
    this.currentOrigin = currentOrigin;
  }

  isLinkValid(link?: string | URL | null): boolean {
    if (!link) {
      return false;
    }

    try {
      return new URL(link, location.host).origin === this.currentOrigin;
    } catch {
      return false;
    }
  }
}
