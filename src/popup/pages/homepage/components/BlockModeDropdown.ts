import type { SettingsData, SettingsRepository } from "../../../../repositories/SettingsRepository";
import { Dropdown } from "../../../components/dropdowns/Dropdown";

type BlockModeDropdownData = "All" | "List" | "None";

export class BlockModeDropdown {
  private readonly dropdown: Dropdown<BlockModeDropdownData>;
  private readonly settingsRepository: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepository = settingsRepository;
    this.dropdown = this.build();
  }

  get element() {
    return this.dropdown.element;
  }

  private build() {
    const blockModeDropdown = new Dropdown<BlockModeDropdownData>("blockmode", "Block mode:", ["All", "List", "None"]);

    blockModeDropdown.changeEvent.addListener((option) => {
      const blockMode = this.transformDropdownOptionToStorageFormat(option);
      this.settingsRepository.set({ blockMode });
    });

    this.settingsRepository.get().then((settings) => {
      const option = this.transformStorageFormatToDropdownOption(settings.blockMode);
      this.dropdown.value = option;
    });

    return blockModeDropdown;
  }

  private transformDropdownOptionToStorageFormat(option: BlockModeDropdownData): SettingsData["blockMode"] {
    switch (option) {
      case "All":
        return "all";

      case "List":
        return "blacklist";

      default:
        return "none";
    }
  }

  private transformStorageFormatToDropdownOption(option: SettingsData["blockMode"]): BlockModeDropdownData {
    switch (option) {
      case "all":
        return "All";

      case "blacklist":
        return "List";

      default:
        return "None";
    }
  }
}