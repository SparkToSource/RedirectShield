import type { SettingsRepository } from "../../../../repositories/SettingsRepository";
import { SettingsSwitch } from "./SettingsSwitch";

export class BlockMetaTagsSwitch extends SettingsSwitch {
  constructor(settingsRepository: SettingsRepository) {
    super(
      "Block meta tags:",
      "blockMetaRefresh",
      settingsRepository,
    );
  }
}