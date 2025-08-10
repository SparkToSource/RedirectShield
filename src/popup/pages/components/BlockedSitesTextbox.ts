import type { SettingsRepository } from "../../../repositories/SettingsRepository";
import { Textbox } from "../../components/textbox/Textbox";

export class BlockedSitesTextbox {
  private readonly textbox: Textbox;
  private readonly settingsRepository: SettingsRepository;

  constructor(settingsRepository: SettingsRepository) {
    this.settingsRepository = settingsRepository;
    this.textbox = this.build();
  }

  get element() {
    return this.textbox.element;
  }

  private build() {
    const textbox = new Textbox("Blocked sites:", "example.com");

    textbox.changeEvent.addListener((data) => {
      const lines = data.split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const blackList: Record<string, boolean> = {};
      for (const line of lines) {
        blackList[line] = true;
      }

      this.settingsRepository.set({ blackList });
    });

    this.settingsRepository.get().then((settings) => {
      const sites = Object.entries(settings.blackList ?? {})
        .filter(([_, value]) => value === true)
        .map(([key, _]) => key);

      const lines = sites.join("\n");

      textbox.value = lines;
    });

    return textbox;
  }
}