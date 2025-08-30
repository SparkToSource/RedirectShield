import { SettingsRepository } from "../../../repositories/SettingsRepository";
import { BlockHTMLInjectionSwitch } from "./components/BlockHTMLInjectionSwitch";
import { BlockIFramesSwitch } from "./components/BlockIFramesSwitch";
import { BlockMetaTagsSwitch } from "./components/BlockMetaTagsSwitch";
import { BlockScriptsSwitch } from "./components/BlockScriptsSwitch";
import { FailSafeSwitch } from "./components/FailSafeSwitch";
import { InternalNavigationSwitch } from "./components/InternalNavigationSwitch";
import "./settingspage.css";

export class SettingsPage {
  private readonly page: HTMLDivElement;
  private readonly settingsRepository = new SettingsRepository();

  constructor() {
    this.page = this.build();
  }

  get element() {
    return this.page;
  }

  private build() {
    const title = document.createElement("span");
    title.innerText = "Advanced settings:";

    const allowInternalNavigation = new InternalNavigationSwitch(this.settingsRepository);
    const useFailSafe = new FailSafeSwitch(this.settingsRepository);
    const blockScripts = new BlockScriptsSwitch(this.settingsRepository);
    const blockIframes = new BlockIFramesSwitch(this.settingsRepository);
    const blockHtmlInjection = new BlockHTMLInjectionSwitch(this.settingsRepository);
    const blockMetaTags = new BlockMetaTagsSwitch(this.settingsRepository);

    const instructions = document.createElement("span");
    instructions.innerText = "* Changes require a page reload.";

    const page = document.createElement("div");
    page.id = "settingspage";

    page.append(
      title,
      allowInternalNavigation.element,
      useFailSafe.element,
      blockScripts.element,
      blockIframes.element,
      blockHtmlInjection.element,
      blockMetaTags.element,
      instructions,
    );

    return page;
  }
}