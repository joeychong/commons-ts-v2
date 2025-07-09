class Node<T> {
  data: T;
  next: Node<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;
  resolver: ((value: unknown) => void) | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.resolver = null;
  }

  enqueue(data: T) {
    const node = new Node(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.size += 1;
    if (this.resolver !== null) {
      // console.log('Resolve');
      this.resolver('');
      this.resolver = null;
    }
  }

  dequeue() {
    if (this.head === null) {
      return null;
    }
    const node = this.head;
    this.head = this.head.next;
    this.size -= 1;
    return node.data;
  }

  end() {
    if (this.resolver !== null) {
      this.resolver('end');
      this.resolver = null;
    }
  }

  async *stream() : AsyncGenerator<T> {
    while (true) {
      const value = this.dequeue();
      if (value === null) {
        // console.log('-------here1');
        const cmd = await new Promise((res) => this.resolver = res);
        if (cmd === 'end') {
          break;
        }
      } else {
        yield value;
      }
    }
  }
}