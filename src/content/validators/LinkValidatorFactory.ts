import type { SettingsData } from "../../repositories/SettingsRepository";
import { HostnameLinkValidator } from "./HostnameLinkValidator";
import { OriginLinkValidator } from "./OriginLinkValidator";

export class LinkValidatorFactory {
  build(type: SettingsData["linkValidatorType"]) {
    switch (type) {
      case "hostname":
        return new HostnameLinkValidator(window.location.hostname);

      default:
        return new OriginLinkValidator(window.location.origin);
    }
  }
}
