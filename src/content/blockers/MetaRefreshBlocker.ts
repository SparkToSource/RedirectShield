import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import { CreateElementBlocker } from "../utils/CreateElementBlocker";
import type { Blocker } from "./Blocker";

export class MetaRefreshBlocker implements Blocker {
  private readonly windowContext: WindowContext;
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(windowContext: WindowContext, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.notifier = notifier;
    this.remover = remover;
  }

  /**
   * Blocks creation of `<meta>` elements.
   * 
   * Meta redirects can only be prevented by preventing DOM insertion.
   * 
   * Once added to the DOM, removal of the tag will not stop the redirect.
   * 
   * The following `<meta>` element can redirect the user:
   * ```html
   * <meta http-equiv="refresh" content="1;url=https://example.com">
   * ```
   */
  block() {
    const createElementBlocker = new CreateElementBlocker(this.windowContext, this.notifier, this.remover);
    createElementBlocker.replaceCreateElement("meta");
  }
}
