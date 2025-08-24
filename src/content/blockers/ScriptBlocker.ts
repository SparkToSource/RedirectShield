import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import { CreateElementBlocker } from "../utils/CreateElementBlocker";
import { ElementCreationObserver } from "../utils/ElementCreationObserver";
import type { Blocker } from "./Blocker";

export class ScriptBlocker implements Blocker {
  private readonly windowContext: WindowContext;
  private readonly remover: Remover;
  private readonly notifier: Notifier;

  constructor(windowContext: WindowContext, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.remover = remover;
    this.notifier = notifier;
  }
  
  /**
   * Blocks creation of `<script>` elements.
   */
  block() {
    this.blockScriptCreationThroughCreateElement();
    this.blockScriptAfterCreationThroughOtherMeans();
  }

  private blockScriptCreationThroughCreateElement() {
    const createElementBlocker = new CreateElementBlocker(this.windowContext, this.notifier, this.remover);
    createElementBlocker.replaceCreateElement("script");
  }

  private blockScriptAfterCreationThroughOtherMeans() {
    const elementCreationObserver = new ElementCreationObserver(this.windowContext, this.notifier, this.remover);
    elementCreationObserver.removeCreatedElementsWithTag("script");
  }
}