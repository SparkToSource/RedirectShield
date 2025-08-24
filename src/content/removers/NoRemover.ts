import type { Remover } from "./Remover";

export class NoRemover implements Remover {
  /**
   * NOOP: Never removes anything.
   */
  remove(_?: ChildNode): void { }
}