import type { SettingsRepository } from "../../../../repositories/SettingsRepository";
import { SettingsSwitch } from "./SettingsSwitch";

export class FailSafeSwitch extends SettingsSwitch {
  constructor(settingsRepository: SettingsRepository) {
    super(
      "Use \"Unsaved Changes\" failsafe:",
      "useFailSafe",
      settingsRepository,
    );
  }
}
