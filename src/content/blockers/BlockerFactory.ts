import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { LinkValidator } from "../validators/LinkValidator";
import { AnchorTagBlocker } from "./AnchorTagBlocker";
import type { Blocker } from "./Blocker";
import { FormSubmitBlocker } from "./FormSubmitBlocker";
import { MetaRefreshBlocker } from "./MetaRefreshBlocker";
import { WindowLocationChangeBlocker } from "./WindowLocationChangeBlocker";
import { WindowOpenBlocker } from "./WindowOpenBlocker";

export interface BlockerFactorySettings {
  blockAnchorTags: boolean;
  blockFormSubmit: boolean;
  blockMetaRefresh: boolean;
  blockWindowOpen: boolean;
  useFailSafe: boolean;
}

export class BlockerFactory {
  private readonly notifier: Notifier;
  private readonly remover: Remover;
  private readonly linkValidator: LinkValidator

  constructor(linkValidator: LinkValidator, notifier: Notifier, remover: Remover) {
    this.linkValidator = linkValidator;
    this.notifier = notifier;
    this.remover = remover;
  }

  buildAll(settings: BlockerFactorySettings) {
    const shields: Blocker[] = [];

    if (settings.blockMetaRefresh) {
      shields.push(new MetaRefreshBlocker(this.notifier, this.remover));
    }

    if (settings.blockFormSubmit) {
      shields.push(new FormSubmitBlocker(this.linkValidator, this.notifier, this.remover));
    }

    if (settings.blockAnchorTags) {
      shields.push(new AnchorTagBlocker(this.linkValidator, this.notifier, this.remover));
    }

    if (settings.blockWindowOpen) {
      shields.push(new WindowOpenBlocker(this.linkValidator, this.notifier, this.remover));
    }

    if (settings.useFailSafe) {
      shields.push(new WindowLocationChangeBlocker(this.notifier, this.remover));
    }

    return shields;
  }
}