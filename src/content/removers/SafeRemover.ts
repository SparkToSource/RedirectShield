import type { Remover } from "./Remover";

export class SafeRemover implements Remover {
  remove(node?: ChildNode) {
    if (node !== undefined) {
      node.remove();
    }
  }
}
