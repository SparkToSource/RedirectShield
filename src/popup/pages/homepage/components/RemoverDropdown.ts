import type { SettingsData, SettingsRepository } from "../../../../repositories/SettingsRepository";
import { Dropdown } from "../../../components/dropdowns/Dropdown";

type RemoverDropdownData = "None" | "Safe" | "Last clicked";

export class RemoverDropdown {
  private readonly dropdown: Dropdown<RemoverDropdownData>;
  private readonly settingsRepository: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepository = settingsRepository;
    this.dropdown = this.build();
  }

  get element() {
    return this.dropdown.element;
  }

  private build() {
    const removerDropdown = new Dropdown<RemoverDropdownData>("remover", "Remove:", ["None", "Safe", "Last clicked"]);

    removerDropdown.changeEvent.addListener((option) => {
      const remover = this.transformDropdownOptionToStorageFormat(option);
      this.settingsRepository.set({ remover });
    });

    this.settingsRepository.get().then((settings) => {
      const option = this.transformStorageFormatToDropdownOption(settings.remover);
      this.dropdown.value = option;
    });

    return removerDropdown;
  }

  private transformDropdownOptionToStorageFormat(option: RemoverDropdownData): SettingsData["remover"] {
    switch (option) {
      case "Last clicked":
        return "aggressive";

      case "Safe":
        return "safe";

      default:
        return "none";
    }
  }

  private transformStorageFormatToDropdownOption(option: SettingsData["remover"]): RemoverDropdownData {
    switch (option) {
      case "aggressive":
        return "Last clicked";

      case "safe":
        return "Safe";

      default:
        return "None";
    }
  }
}