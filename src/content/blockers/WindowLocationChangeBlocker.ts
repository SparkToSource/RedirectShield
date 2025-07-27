import type { Notifier } from "../notifiers/Notifier";
import type { Blocker } from "./Blocker";

export class WindowLocationChangeBlocker implements Blocker {
  private readonly notifier: Notifier;

  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }

  block() {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
      this.notifier.notify("Unknown");
    });
  }
}
