import type { WindowContext } from "../context/WindowContext";
import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { Blocker } from "./Blocker";

export class WindowLocationChangeBlocker implements Blocker {
  private readonly windowContext: WindowContext;
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(windowContext: WindowContext, notifier: Notifier, remover: Remover) {
    this.windowContext = windowContext;
    this.notifier = notifier;
    this.remover = remover;
  }

  /**
   * Uses the "Leave site? Changes you made may not be saved." browser dialog box to block redirects.
   * 
   * The user will have to manually click 'Cancel' on the popup to stop the redirect.
   * 
   * Automated blocking is impossible, because `window.href` and `window.location` are
   * protected properties and cannot be modified or intercepted.
   */
  block() {
    this.windowContext.window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "Redirect Shield prevented this redirect. Do you wish to allow the redirect?";
      this.remover.remove();
      this.notifier.notify("Failsafe activated: prompted user to block page leave.");
    });
  }
}
