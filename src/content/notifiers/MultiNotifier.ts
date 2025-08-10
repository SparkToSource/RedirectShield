import type { Notifier } from "./Notifier";

export class MultiNotifier implements Notifier {
  private readonly notifiers: Notifier[];

  constructor(notifiers: Notifier[]) {
    this.notifiers = notifiers;
  }

  notify(string?: string | URL) {
    for (const notifier of this.notifiers) {
      notifier.notify(string);
    }
  }
}