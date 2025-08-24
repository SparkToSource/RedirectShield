import type { WindowContext } from "./WindowContext";

export class ShadowRootContext {
  private shadowRoots: ShadowRoot[] | undefined;
  private readonly windowContext: WindowContext;

  constructor(windowContext: WindowContext) {
    this.windowContext = windowContext;
  }

  /**
   * @returns List of all ShadowRoots.
   */
  getAllShadowRoots() {
    if (!this.shadowRoots) {
      this.shadowRoots = this.findAllShadowRoots(this.windowContext.document.body);
    }
    
    return this.shadowRoots;
  }

  /**
   * Injects the function into every newly created ShadowRoot (even when they have { mode: closed }).
   * Also injects the function into existing ShadowRoots (only with { mode: open }).
   * @param func The function to apply to the ShadowRoot.
   */
  injectFunctionIntoShadowRoots(func: (shadowRoot: Node) => void) {
    const originalAttachShadow = this.windowContext.window.Element.prototype.attachShadow;

    this.windowContext.window.Element.prototype.attachShadow = function (init: ShadowRootInit): ShadowRoot {
      const shadowRoot = originalAttachShadow.call(this, init);
      func(shadowRoot);
      return shadowRoot;
    }

    const shadowRoots = this.getAllShadowRoots();

    for (const shadowRoot of shadowRoots) {
      func(shadowRoot);
    }
  }

  private findAllShadowRoots(root: Element) {
    const shadowRoots: ShadowRoot[] = [];

    function traverse(node: Element) {
      if (!node) {
        return;
      }

      if (node.shadowRoot) {
        shadowRoots.push(node.shadowRoot);
        traverse(node.shadowRoot as unknown as Element);
      }

      for (const child of node.children) {
        traverse(child);
      }
    }

    traverse(root);
    return shadowRoots;
  }
}