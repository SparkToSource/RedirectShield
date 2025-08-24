import { ShadowRootContext } from "./ShadowRootContext";

export class WindowContext {
  readonly window: Window & typeof globalThis;
  readonly document: Document;
  private readonly shadowRootContext: ShadowRootContext;

  constructor(contextWindow: Window & typeof globalThis, contextDocument: Document) {
    this.window = contextWindow;
    this.document = contextDocument;
    this.shadowRootContext = new ShadowRootContext(this);
  }

  runAndPropagateToChildWindowContexts(func: (windowContext: WindowContext) => void) {
    func(this);

    const iframes = this.document.querySelectorAll("iframe");

    for (const iframe of iframes) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc && doc.readyState === "complete") { // load event won't trigger if it's already complete
        this.propagateToChildWindowContexts(iframe, func);
      }

      iframe.addEventListener("load", () => this.propagateToChildWindowContexts(iframe, func));
    }
  }

  getAllShadowRoots() {
    return this.shadowRootContext.getAllShadowRoots();
  }

  injectFunctionIntoShadowRoots(func: (shadowRoot: Node) => void) {
    return this.shadowRootContext.injectFunctionIntoShadowRoots(func);
  }

  private propagateToChildWindowContexts(iframe: HTMLIFrameElement, func: (windowContext: WindowContext) => void) {
    const contentWindow = iframe.contentWindow;
    const contentDocument = iframe.contentDocument || iframe.contentWindow?.document;

    if (!contentWindow || !contentDocument) {
      return;
    }

    const iframeContext = new WindowContext(contentWindow as any, contentDocument);

    iframeContext.runAndPropagateToChildWindowContexts(func);
  }
}