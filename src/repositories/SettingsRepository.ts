import browser from "webextension-polyfill";

export interface SettingsData {
  blockMode: "all" | "blacklist" | "none";
  blackList: Record<string, boolean>;
  linkValidatorType: "hostname" | "origin" | "none";
  remover: "none" | "safe" | "aggressive";
  blockAnchorTags: boolean;
  blockFormSubmit: boolean;
  blockMetaRefresh: boolean;
  blockIFrames: boolean;
  blockWindowOpen: boolean;
  blockHTMLInjection: boolean;
  useFailSafe: boolean;
}

export class SettingsRepository {
  async get(): Promise<SettingsData> {
    const defaults = this.getDefaults();
    const keys = Object.keys(defaults);

    const settings = await browser.storage.local.get(keys);
    const result = Object.assign(defaults, settings);

    return result;
  }

  set(data: Partial<SettingsData>): Promise<void> {
    return browser.storage.local.set(data);
  }

  private getDefaults(): SettingsData {
    return {
      blockMode: "blacklist",
      blackList: {},
      linkValidatorType: "hostname",
      remover: "none",
      blockAnchorTags: true,
      blockFormSubmit: true,
      blockMetaRefresh: true,
      blockIFrames: true,
      blockWindowOpen: true,
      blockHTMLInjection: true,
      useFailSafe: false,
    }
  }
}
