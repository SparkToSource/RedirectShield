import type { Remover } from "./Remover";

export class NoRemover implements Remover {
  remove(_?: ChildNode): void { }
}