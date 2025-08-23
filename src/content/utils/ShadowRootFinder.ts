export class ShadowRootFinder {
  findAllShadowRoots(root: Element = document.body) {
    const shadowRoots: ShadowRoot[] = [];

    function traverse(node: Element) {
      if (node.shadowRoot) {
        shadowRoots.push(node.shadowRoot);
        traverse(node.shadowRoot as unknown as Element);
      }

      for (const child of node.children) {
        traverse(child);
      }
    }

    traverse(root);
    return shadowRoots;
  }
}