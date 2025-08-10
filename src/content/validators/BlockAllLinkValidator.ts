import type { LinkValidator } from "./LinkValidator";

export class BlockAllLinkValidator implements LinkValidator {
  isLinkValid(_?: string | URL): boolean {
    return false;
  }
}