import { SettingsRepository } from "../../../repositories/SettingsRepository";
import { Donate } from "../../components/donate/Donate";
import { Logo } from "../../components/logo/Logo";
import { BlockedSitesTextbox } from "./components/BlockedSitesTextbox";
import { BlockModeDropdown } from "./components/BlockModeDropdown";
import { BlockScriptsSwitch } from "./components/BlockScriptsSwitch";
import { FailSafeSwitch } from "./components/FailSafeSwitch";
import { InternalNavigationSwitch } from "./components/InternalNavigationSwitch";
import { RemoverDropdown } from "./components/RemoverDropdown";
import "./homepage.css";

export class HomePage {
  private readonly page: HTMLDivElement;
  private readonly settingsRepository = new SettingsRepository();

  constructor() {
    this.page = this.build();
  }

  get element() {
    return this.page;
  }

  private build() {
    const logo = new Logo();
    const allowInternalNavigation = new InternalNavigationSwitch(this.settingsRepository);
    const useFailSafe = new FailSafeSwitch(this.settingsRepository);
    const blockScripts = new BlockScriptsSwitch(this.settingsRepository);
    const remover = new RemoverDropdown(this.settingsRepository);
    const blockMode = new BlockModeDropdown(this.settingsRepository);
    const blockedSitesTextbox = new BlockedSitesTextbox(this.settingsRepository);
    const donate = new Donate();

    const page = document.createElement("div");
    page.id = "homepage";

    page.append(
      logo.element,
      allowInternalNavigation.element,
      useFailSafe.element,
      blockScripts.element,
      remover.element,
      blockMode.element,
      blockedSitesTextbox.element,
      donate.element,
    );

    return page;
  }
}
