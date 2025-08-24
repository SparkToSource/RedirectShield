import type { LinkValidator } from "./LinkValidator";

export class OriginLinkValidator implements LinkValidator {
  private readonly currentOrigin: string;

  constructor(currentOrigin: string) {
    this.currentOrigin = currentOrigin;
  }

  /**
   * @param link The link to be validated.
   * @returns Boolean representing whether the origin of the supplied `link`
   * is equal to the origin of the current site.
   */
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
