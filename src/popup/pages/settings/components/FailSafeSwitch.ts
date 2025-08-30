import type { SettingsRepository } from "../../../../repositories/SettingsRepository";
import { SettingsSwitch } from "./SettingsSwitch";

export class FailSafeSwitch extends SettingsSwitch {
  constructor(settingsRepository: SettingsRepository) {
    super(
      "Use 'unsaved changes' failsafe:",
      "useFailSafe",
      settingsRepository,
    );
  }
}
