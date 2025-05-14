class NodeElement<T> {
  value: T;
  next: NodeElement<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * A FIFO Queue implementation
 */
export class Queue<T> {
  private head: NodeElement<T> | null = null;
  private tail: NodeElement<T> | null = null;
  private length: number = 0;

  /**
   * Adds an element to the end of the queue.
   * @param item The item to enqueue.
   */
  offer(item: T): void {
    const newNode = new NodeElement(item);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      // empty queue
      this.head = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  /**
   * Removes and returns the element at the front of the queue.
   * Returns undefined if the queue is empty.
   */
  poll(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      // queue is now empty
      this.tail = null;
    }
    this.length--;
    return value;
  }

  /**
   * Peeks at the element at the front without removing it.
   * Returns undefined if the queue is empty.
   */
  peek(): T | undefined {
    return this.head ? this.head.value : undefined;
  }

  /**
   * Checks whether the queue is empty.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this.length;
  }

  /**
   * Clears all elements from the queue.
   */
  clear(): void {
    this.head = this.tail = null;
    this.length = 0;
  }

  /**
   * Returns true if item is in queue.
   */
  contains(item: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === item) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  /**
   * Allows for-of iteration over the queue (in FIFO order).
   */
  *[Symbol.iterator](): IterableIterator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
