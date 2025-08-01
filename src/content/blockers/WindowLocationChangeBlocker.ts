import type { Notifier } from "../notifiers/Notifier";
import type { Remover } from "../removers/Remover";
import type { Blocker } from "./Blocker";

export class WindowLocationChangeBlocker implements Blocker {
  private readonly notifier: Notifier;
  private readonly remover: Remover;

  constructor(notifier: Notifier, remover: Remover) {
    this.notifier = notifier;
    this.remover = remover;
  }

  block() {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
      this.remover.remove();
      this.notifier.notify("Fail safe activated: prompted user to block page leave.");
    });
  }
}
