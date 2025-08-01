import type { SettingsData } from "../../repositories/SettingsRepository";
import { AggresiveRemover } from "./AggressiveRemover";
import { NoRemover } from "./NoRemover";
import type { Remover } from "./Remover";
import { SafeRemover } from "./SafeRemover";

export class RemoverFactory {
  build(type: SettingsData["remover"]): Remover {
    switch (type) {
      case "safe":
        return new SafeRemover();

      case "aggressive":
        return new AggresiveRemover();

      default:
        return new NoRemover();
    }
  }
}