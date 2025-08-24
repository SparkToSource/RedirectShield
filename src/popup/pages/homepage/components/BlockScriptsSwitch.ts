import type { SettingsRepository } from "../../../../repositories/SettingsRepository";
import { Switch } from "../../../components/switches/Switch";

export class BlockScriptsSwitch {
  private readonly blockScriptsSwitch: Switch;
  private readonly settingsRepository: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepository = settingsRepository;
    this.blockScriptsSwitch = this.build();
  }

  get element() {
    return this.blockScriptsSwitch.element;
  }

  private build() {
    const blockScripts = new Switch("blockScrips", "Block scripts:");

    blockScripts.changeEvent.addListener((blockScripts) => {
      this.settingsRepository.set({ blockScripts });
    });

    this.settingsRepository.get().then((settings) => {
      blockScripts.checked = settings.blockScripts;
    });

    return blockScripts;
  }
}