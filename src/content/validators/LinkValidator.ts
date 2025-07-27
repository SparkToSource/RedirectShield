export interface LinkValidator {
  isLinkValid(link?: string | URL): boolean;
}
