import type { SettingsRepository } from "../../../../repositories/SettingsRepository";
import { SettingsSwitch } from "./SettingsSwitch";

export class BlockHTMLInjectionSwitch extends SettingsSwitch {
  constructor(settingsRepository: SettingsRepository) {
    super(
      "Block HTML injection:",
      "blockHTMLInjection",
      settingsRepository,
    );
  }
}