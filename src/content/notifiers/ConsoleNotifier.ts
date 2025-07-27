import type { Notifier } from "./Notifier";

export class ConsoleNotifier implements Notifier {
  notify(url?: string | URL) {
    console.log("Site attempted to navigate to", url);
  }
}
