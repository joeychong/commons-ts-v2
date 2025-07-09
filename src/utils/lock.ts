export class Lock {
  private name: string;
  private isLocked = false;
  private waiting: Array<() => void> = [];

  constructor(name?: string) {
    this.name = name ?? crypto.randomUUID();
  }

  public async acquire(): Promise<void> {
    if (this.isLocked) {
      await new Promise<void>(resolve => this.waiting.push(resolve));
    }
    this.isLocked = true;
  }

  public release(): void {
    if (this.waiting.length > 0) {
      const next = this.waiting.shift();
      if (next) {
        next();
      }
    } else {
      this.isLocked = false;
    }
  }
}