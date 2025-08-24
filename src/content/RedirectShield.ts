import type { SettingsData } from "../repositories/SettingsRepository";
import type { Blocker } from "./blockers/Blocker";
import { BlockerFactory } from "./blockers/BlockerFactory";
import type { WindowContext } from "./context/WindowContext";
import { BadgeNotifier } from "./notifiers/BadgeNotifier";
import { ConsoleNotifier } from "./notifiers/ConsoleNotifier";
import { MultiNotifier } from "./notifiers/MultiNotifier";
import { RemoverFactory } from "./removers/RemoverFactory";
import { LinkValidatorFactory } from "./validators/LinkValidatorFactory";

export class RedirectShield {
  private readonly blockers: Blocker[];

  constructor(windowContext: WindowContext, settings: SettingsData) {
    this.blockers = this.build(windowContext, settings);
  }

  start() {
    for (const blocker of this.blockers) {
      blocker.block();
    }
  }

  private build(windowContext: WindowContext, settings: SettingsData) {
    const notifier = new MultiNotifier([new BadgeNotifier(), new ConsoleNotifier()]);
    const remover = new RemoverFactory().build(settings.remover);
    const linkValidator = new LinkValidatorFactory().build(settings.linkValidatorType);

    const blockers = new BlockerFactory(windowContext, linkValidator, notifier, remover).buildAll(settings);
    return blockers;
  }
}