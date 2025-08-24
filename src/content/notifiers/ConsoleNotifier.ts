import type { Notifier } from "./Notifier";

export class ConsoleNotifier implements Notifier {
  notify(string?: string | URL) {
    console.log(`[RedirectShield] ${string}`);
  }
}
