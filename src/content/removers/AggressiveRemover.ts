import type { Remover } from "./Remover";

export class AggresiveRemover implements Remover {
  private lastClickedNode?: ChildNode;

  constructor() {
    this.rememberLastClickedItem();
  }

  /**
   * Removes the node that was passed to this function if it exists.
   * Otherwise, it will delete the last clicked element.
   * @param node The node to be removed.
   */
  remove(node?: ChildNode) {
    const deleteTarget = node ?? this.lastClickedNode;

    if (deleteTarget) {
      deleteTarget.remove();
      this.lastClickedNode = undefined;
    }
  }

  private rememberLastClickedItem() {
    document.addEventListener("click", (e) => {
      if (this.targetIsElement(e.target)) {
        this.lastClickedNode = e.target;
      }
    }, true);
  }

  private targetIsElement(node: EventTarget | null): node is Element {
    return !!node && (node as Node).nodeType === Node.ELEMENT_NODE;
  }
}