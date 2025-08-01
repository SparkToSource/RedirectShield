import type { Remover } from "./Remover";

export class AggresiveRemover implements Remover {
  private lastClickedNode?: ChildNode;

  constructor() {
    this.rememberLastClickedItem();
  }

  remove(node?: ChildNode) {
    const deleteTarget = node ?? this.lastClickedNode;

    if (deleteTarget) {
      deleteTarget.remove();
      this.lastClickedNode = undefined;
    }
  }

  private rememberLastClickedItem() {
    document.addEventListener("click", (e) => {
      if (e.target instanceof Element) {
        this.lastClickedNode = e.target;
      }
    }, true);
  }
}