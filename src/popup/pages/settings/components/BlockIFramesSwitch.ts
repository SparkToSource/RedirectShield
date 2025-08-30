import type { SettingsRepository } from "../../../../repositories/SettingsRepository";
import { SettingsSwitch } from "./SettingsSwitch";

export class BlockIFramesSwitch extends SettingsSwitch {
  constructor(settingsRepository: SettingsRepository) {
    super(
      "Block iframes:",
      "blockIFrames",
      settingsRepository,
    );
  }
}