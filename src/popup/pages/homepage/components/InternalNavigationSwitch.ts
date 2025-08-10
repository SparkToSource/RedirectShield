import { SettingsRepository } from "../../../../repositories/SettingsRepository";
import { Switch } from "../../../components/switches/Switch";

export class InternalNavigationSwitch {
  private readonly internalNavigationSwitch: Switch;
  private readonly settingsRepostiory: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepostiory = settingsRepository;
    this.internalNavigationSwitch = this.build();
  }

  get element() {
    return this.internalNavigationSwitch.element;
  }

  private build() {
    const internalNavigationSwitch = new Switch("allowInternalNavigation", "Allow same site navigation:");

    internalNavigationSwitch.changeEvent.addListener((checked) => {
      const linkValidatorType = checked ? "hostname" : "none";
      this.settingsRepostiory.set({ linkValidatorType });
    });

    this.settingsRepostiory.get().then(settings => {
      internalNavigationSwitch.checked = settings.linkValidatorType !== "none";
    });

    return internalNavigationSwitch;
  }
}