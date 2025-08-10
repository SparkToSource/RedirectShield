import type { SettingsRepository } from "../../../repositories/SettingsRepository";
import { Switch } from "../../components/switches/Switch";

export class FailSafeSwitch {
  private readonly failSafeSwitch: Switch;
  private readonly settingsRepository: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepository = settingsRepository;
    this.failSafeSwitch = this.build();
  }

  get element() {
    return this.failSafeSwitch.element;
  }

  private build() {
    const useFailSafe = new Switch("useFailSafe", "Use \"Unsaved Changes\" failsafe:");

    useFailSafe.changeEvent.addListener((useFailSafe) => {
      this.settingsRepository.set({ useFailSafe });
    });

    this.settingsRepository.get().then((settings) => {
      useFailSafe.checked = settings.useFailSafe;
    });

    return useFailSafe;
  }
}