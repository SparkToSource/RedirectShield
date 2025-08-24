import type { Remover } from "./Remover";

export class SafeRemover implements Remover {
  /**
   * Will only remove the node that has been passed to this function.
   * @param node Node to be removed.
   */
  remove(node?: ChildNode) {
    if (node !== undefined) {
      node.remove();
    }
  }
}
