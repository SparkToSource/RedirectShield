import type { SettingsData } from "../repositories/SettingsRepository";
import { BlockerFactory } from "./blockers/BlockerFactory";
import { BadgeNotifier } from "./notifiers/BadgeNotifier";
import { RemoverFactory } from "./removers/RemoverFactory";
import { LinkValidatorFactory } from "./validators/LinkValidatorFactory";

class Content {
  start() {
    const settings = this.getSettings();

    const notifier = new BadgeNotifier();
    const remover = new RemoverFactory().build(settings.remover);
    const linkValidator = new LinkValidatorFactory().build(settings.linkValidatorType);

    const shields = new BlockerFactory(linkValidator, notifier, remover).buildAll(settings);

    for (const shield of shields) {
      shield.block();
    }
  }

  private getSettings(): SettingsData {
    const currentScript = document.currentScript;

    if (!currentScript || !currentScript.dataset.settings) {
      return {} as SettingsData;
    }

    const settings = JSON.parse(currentScript.dataset.settings);
    return settings;
  }
}

const content = new Content();
content.start();
