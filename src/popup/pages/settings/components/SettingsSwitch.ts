import type { SettingsData, SettingsRepository } from "../../../../repositories/SettingsRepository";
import { Switch } from "../../../components/switches/Switch";

type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

export type BooleanSettingKey = BooleanKeys<SettingsData>;

export abstract class SettingsSwitch {
  protected readonly switch: Switch;

  constructor(text: string, settingName: BooleanSettingKey, settingsRepository: SettingsRepository) {
    this.switch = this.build(text, settingName, settingsRepository);
  }

  get element() {
    return this.switch.element;
  }

  private build(text: string, settingName: BooleanSettingKey, settingsRepository: SettingsRepository) {
    const swtich = new Switch(text, settingName);

    swtich.changeEvent.addListener((checked) => {
      const data: Partial<SettingsData> = {};
      data[settingName] = checked;
      settingsRepository.set(data);
    });

    settingsRepository.get().then((settings) => {
      swtich.checked = settings[settingName];
    });

    return swtich;
  }
}
