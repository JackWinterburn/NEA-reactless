export default class PriorityQueue<T> {
  items: { element: T; priority: number }[];

  constructor() {
    this.items = [];
  }

  enqueue(element: T, priority: number) {
    const queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }

  // typescript really doesnt like this lol
  dequeue(): T | null {
    return this.items.shift()?.element || null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
