import type { Notifier } from "./Notifier";

export class BadgeNotifier implements Notifier {
  private counter = 0;

  notify(_?: string | URL): void {
    this.counter++;

    const event = new CustomEvent("updateBadge", {
      detail: { count: this.counter }
    });

    window.dispatchEvent(event);
  }
}