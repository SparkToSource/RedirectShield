import { SettingsRepository } from "../../../repositories/SettingsRepository";
import { Donate } from "../../components/donate/Donate";
import { Logo } from "../../components/logo/Logo";
import { SettingsPage } from "../settings/SettingsPage";
import { BlockedSitesTextbox } from "./components/BlockedSitesTextbox";
import { BlockModeDropdown } from "./components/BlockModeDropdown";
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
    const remover = new RemoverDropdown(this.settingsRepository);
    const blockMode = new BlockModeDropdown(this.settingsRepository);
    const blockedSitesTextbox = new BlockedSitesTextbox(this.settingsRepository);
    const settingsPage = new SettingsPage();
    const donate = new Donate();


    const page = document.createElement("div");
    page.id = "homepage";

    page.append(
      logo.element,
      remover.element,
      blockMode.element,
      blockedSitesTextbox.element,
      settingsPage.element,
      donate.element,
    );

    return page;
  }
}
