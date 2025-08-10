export class Observable<T = never> {
  private callbacks: any[] = [];

  addListener(callback: (data: T) => void) {
    this.callbacks.push(callback);
  }

  removeListener(callback: (data: T) => void) {
    this.callbacks = this.callbacks.filter(c => c !== callback);
  }

  notify(data: T) {
    for (const callback of this.callbacks) {
      callback(data);
    }
  }
}
