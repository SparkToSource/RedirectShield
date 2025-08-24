import type { LinkValidator } from "./LinkValidator";

export class BlockAllLinkValidator implements LinkValidator {
  /**
   * @returns False, always.
   */
  isLinkValid(_?: string | URL | null): boolean {
    return false;
  }
}