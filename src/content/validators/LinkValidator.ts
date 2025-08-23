export interface LinkValidator {
  isLinkValid(link?: string | URL | null): boolean;
}
